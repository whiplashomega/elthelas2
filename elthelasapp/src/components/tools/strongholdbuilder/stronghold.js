import { mapGetters, mapActions } from 'vuex';
import improvement from './improvement';

export default {
  components: {
    improvement: improvement
  },
  computed: {
    ...mapGetters({
      improvements: "allImprovements",
      staffTypes: "staffTypes",
      stronghold: "stronghold",
      allStrongholds: "strongholds"
    }),
    reverseTransactions () {
      return this.stronghold.transactionrecord.slice().reverse();
    },
    getPop () {
      let pop = this.stronghold.improvements.reduce((a, b) => {
        return a + b.pop;
      }, 0) + this.stronghold.staff.length;
      return pop;
    },
    availableImprovements () {
      if (this.showAvailable) {
        let stronghold = this.stronghold;
        return this.improvements.filter((imp) => {
          let allmet = true;
          let donematch = stronghold.improvements.filter((a) => {
            return a.id === imp.id;
          })[0];
          let conmatch = stronghold.construction.filter((a) => {
            return a.id === imp.id;
          });
          if ((donematch && donematch.count + conmatch.length >= imp.max) || conmatch.length >= imp.max) {
            allmet = false;
          }
          console.log(imp);
          imp.prerequisites.forEach((req) => {
            let met = false;
            stronghold.improvements.forEach((strimp) => {
              if (strimp.id === req) {
                met = true;
              }
            });
            if (met === false) {
              allmet = false;
            }
          });
          if (imp.cost > this.stronghold.treasury) {
            allmet = false;
          }
          if ((imp.id === "food-farm" || imp.id === "cash-crop-farm") && this.availableClearedLand < 1) {
            allmet = false;
          } else if ((imp.id === "town" || imp.id === "additional-district") && this.forestedLand < 1.25) {
            allmet = false;
          } else if ((imp.id === "village") && this.forestedLand < 0.25) {
            allmet = false;
          }
          return allmet;
        });
      } else {
        return this.improvements;
      }
    },
    castleImprovements () {
      return this.stronghold.improvements.filter((a) => {
        return a.type === "castle";
      });
    },
    countrysideImprovements () {
      return this.stronghold.improvements.filter((a) => {
        return a.type === "countryside";
      });
    },
    townImprovements () {
      return this.stronghold.improvements.filter((a) => {
        return a.type === "town";
      });
    },
    neededStaff () {
      return this.stronghold.improvements.reduce((a, b) => {
        b.staff.forEach((st) => {
          let match = a.filter((stm) => {
            return stm.name === st.name;
          })[0];
          if (match) {
            match.num += st.num * b.count;
          } else {
            a.push({ ...st, id: Date.now(), num: st.num * b.count });
          }
        });
        return a;
      }, []);
    },
    unmetStaffNeed () {
      let needed = [];
      this.neededStaff.forEach((a) => {
        needed.push({ ...a });
      });
      this.stronghold.staff.forEach((st) => {
        let index = -1;
        needed.forEach((stn) => {
          if (st.job.name === stn.name) {
            index = needed.indexOf(stn);
            stn.num--;
          } else if (st.job.subtype && stn.name === st.job.name + " (" + st.job.subtype + ")") {
            index = needed.indexOf(stn);
            stn.num--;
          }
        });
        if (index !== -1 && needed[index].num <= 0) {
          needed.splice(index, 1);
        }
      });
      return needed;
    },
    staffSummary () {
      return this.stronghold.staff.reduce((a, b) => {
        let needmatch = this.neededStaff.filter((st) => {
          if (!st.name.includes("(")) {
            return b.job.name === st.name;
          } else {
            return b.job.name + " (" + b.job.subtype + ")" === st.name;
          }
        })[0];
        let match = a.filter((st) => {
          if (!b.job.subtype) {
            return b.job.name === st.job.name;
          } else {
            return b.job.name === st.job.name && b.job.subtype === st.job.subtype;
          }
        })[0];
        if (!needmatch) {
          needmatch = { num: 0 };
        } else if (needmatch.num === 0) {
          needmatch.num = 1;
        }
        if (match) {
          match.count++;
        } else {
          a.push({ job: b.job, count: 1, needed: needmatch.num });
        }
        return a;
      }, []);
    },
    totalSalary () {
      return this.stronghold.staff.reduce((a, b) => {
        return a + Number(b.salary);
      }, 0);
    },
    totalLand () {
      let land = this.stronghold.improvements.filter((a) => {
        return a.id === "new-land";
      })[0];
      if (land) return land.count;
      return 0;
    },
    availableClearedLand () {
      let land = this.stronghold.improvements.filter((a) => {
        return a.id === "clear-land";
      })[0];
      if (land) return land.count - this.farmLand;
      return 0;
    },
    urbanLand () {
      let land = 0;
      let village = this.stronghold.improvements.filter((a) => {
        return a.id === "village";
      })[0];
      if (village) land += (village.count * 0.25);
      let town = this.stronghold.improvements.filter((a) => {
        return a.id === "town";
      })[0];
      if (town) land += (town.count * 1.25);
      let districts = this.stronghold.improvements.filter((a) => {
        return a.id === "additional-district";
      })[0];
      if (districts) land += (districts.count * 1.25);
      return land;
    },
    farmLand () {
      let land = 0;
      let foodfarms = this.stronghold.improvements.filter((a) => {
        return a.id === "food-farm";
      })[0];
      let cashfarms = this.stronghold.improvements.filter((a) => {
        return a.id === "cash-crop-farm";
      })[0];
      if (foodfarms) land += foodfarms.count;
      if (cashfarms) land += cashfarms.count;
      return land;
    },
    forestedLand () {
      return this.totalLand - (this.availableClearedLand + this.farmLand + this.urbanLand);
    },
    taxRevenue () {
      let steward = this.staffSummary.filter((a) => {
        return a.job.name === "Steward";
      })[0];
      let constablecount = 0;
      let constables = this.staffSummary.filter((a) => {
        return a.job.name === "Constable";
      })[0];
      if (constables) constablecount = constables.count;
      let guardcount = 0;
      let guards = this.staffSummary.filter((a) => {
        return a.job.name === "Guard";
      })[0];
      if (guards) guardcount = guards.count;
      let taxRevenue = 0;
      if (steward) {
        taxRevenue = Math.min(0.15 * this.getPop, 0.15 * (guardcount * 100 + constablecount * 500));
      }
      return taxRevenue;
    },
    bankRevenue () {
      let bank = this.stronghold.improvements.filter((a) => {
        return a.id === "merchant-bank";
      })[0];
      let banker = this.stronghold.staff.filter((a) => {
        return a.job.name === "Banker";
      })[0];
      if (bank && banker) {
        return this.stronghold.treasury * 0.002 + this.taxRevenue * 0.1;
      }
      return 0;
    },
    lumberRevenue () {
      let lumbercamp = this.stronghold.improvements.filter((a) => {
        return a.id === "lumber-camp";
      })[0];
      let foreman = this.stronghold.staff.filter((a) => {
        return a.job.name === "Lumberjack Foreman";
      })[0];
      if (lumbercamp && foreman) return 10 * this.forestedLand;
      return 0;
    },
    grossRevenue () {
      let staffSumCopy = [];
      this.staffSummary.forEach((st) => {
        staffSumCopy.push({ ...st });
      });
      let improvementRevenue = this.stronghold.improvements.reduce((a, b) => {
        let rev = b.revenue * b.count;
        let naturecleric = this.stronghold.staff.filter((a) => {
          return (a.job.name === "Cleric" || a.job.name === "High Priest") && a.job.subtype === "Nature";
        })[0];
        let earthcleric = this.stronghold.staff.filter((a) => {
          return (a.job.name === "Cleric" || a.job.name === "High Priest") && a.job.subtype === "Earth";
        })[0];
        b.staff.forEach((st) => {
          let reqstaff = staffSumCopy.filter((a) => {
            let success = a.job.name === st.name && a.count >= st.num * b.count;
            let partialsuccess = a.job.name === st.name && a.count >= st.num;
            if (success) {
              a.count -= st.num * b.count;
            } else if (partialsuccess) {
              rev = 0;
              while (a.count >= st.num) {
                rev += b.revenue;
                a.count -= st.num;
              }
              return partialsuccess;
            }
            return success;
          })[0];
          if (!reqstaff) {
            rev = 0;
          }
          if ((b.id === 'food-farm' || b.id === 'cash-crop-farm') && naturecleric) {
            rev = rev * 2;
          }
          if ((b.id === 'iron-mine' || b.id === 'quarry') && earthcleric) {
            rev = rev * 1.5;
          }
        });
        return a + rev;
      }, 0);
      return improvementRevenue + this.taxRevenue + this.bankRevenue + this.lumberRevenue;
    },
    expenses () {
      return this.totalSalary + this.buildingMaintenance;
    },
    netRevenue () {
      return this.grossRevenue - this.expenses;
    },
    totalEmployees () {
      let improvementEmployees = this.stronghold.improvements.reduce((a, b) => {
        return a + b.employs * b.count;
      }, 0);
      return improvementEmployees + this.stronghold.staff.length;
    },
    staffBeds () {
      return this.stronghold.improvements.reduce((a, b) => {
        return a + b.staffpop;
      }, 0);
    },
    availableStaffBeds () {
      return this.staffBeds - this.stronghold.staff.length;
    },
    gameDate () {
      return this.stronghold.gameMonth + "/" + this.stronghold.gameDay + "/" + this.stronghold.gameYear;
    },
    buildingMaintenance () {
      return this.stronghold.improvements.reduce((a, b) => {
        let maintenanceFree = [ "new-land", "clear-land", "teleportation-circle" ];
        if (maintenanceFree.includes(b.id)) {
          return a;
        }
        return a + b.cost * 0.0005;
      }, 0);
    }
  },
  data () {
    return {
      changeby: 0,
      record: "",
      showAvailable: true,
      showTransactionRecord: false,
      addImprovementModal: false,
      newstaff: {
        name: "",
        job: { name: "", typicalSalary: 0, bonus: "", subtype: "" },
        salary: 0
      },
      newmodal: true
    };
  },
  methods: {
    ...mapActions({
      getImprovements: 'getAllImprovements',
      newStronghold: 'newStronghold',
      getStrongholds: 'getAllStrongholds',
      loadStronghold: 'loadStronghold',
      loadStrongholdById: 'loadStrongholdById',
      saveStronghold: 'saveStronghold',
      saveNewStronghold: 'saveNewStronghold',
      deleteStronghold: 'deleteStronghold'
    }),
    addStaff () {
      this.stronghold.staff.push({ id: Date.now(), ...this.newstaff, job: { ...this.newstaff.job } });
      this.newstaff = { name: "", job: { name: "", typicalSalary: 0, bonus: "" }, salary: 0 };
    },
    newDay () {
      this.addToTreasury(this.netRevenue, "daily net revenue");
      this.stronghold.gameDay += 1;
      if (this.stronghold.gameDay > 30) {
        this.stronghold.gameDay = 1;
        this.stronghold.gameMonth += 1;
      }
      if (this.stronghold.gameMonth > 12) {
        this.stronghold.gameMonth = 1;
        this.stronghold.gameYear += 1;
      }
      let finished = [];
      this.stronghold.construction.forEach((imp) => {
        imp.buildtime -= 1;
        if (imp.buildtime <= 0) {
          finished.push(imp);
          this.addImprovement(imp);
        }
      });
      finished.forEach((a) => {
        this.stronghold.construction.splice(this.stronghold.construction.indexOf(a), 1);
      });
    },
    addToConstruction (improvement) {
      if (improvement.buildtime > 0) {
        this.stronghold.construction.push({ ...improvement });
      } else {
        this.addImprovement(improvement);
      }
      this.addToTreasury(-improvement.cost, "Begin construction on " + improvement.name);
      this.addImprovementModal = false;
    },
    addImprovement (improvement) {
      var match = this.stronghold.improvements.filter((a) => {
        return a.id === improvement.id;
      })[0];
      if (match) {
        match.count++;
      } else {
        improvement.count++;
        this.stronghold.improvements.push(improvement);
      }
    },
    fireStaff (staff) {
      this.stronghold.staff.splice(this.stronghold.staff.indexOf(staff), 1);
    },
    addToTreasury (changeby, record) {
      this.stronghold.treasury += Number(changeby);
      this.stronghold.transactionrecord.push({ id: Date.now(), amount: changeby, description: record, balance: this.stronghold.treasury, date: this.gameDate });
      this.changeby = 0;
      this.record = "";
    }
  },
  created () {
    this.getImprovements();
    this.getStrongholds();
  }
};
