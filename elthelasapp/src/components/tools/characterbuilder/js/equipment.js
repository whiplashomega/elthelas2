import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      character: "getCharacter",
      equipment: 'allEquipment',
      weapons: 'allWeapons',
      magicweapons: 'allMagicWeapons',
      magicarmor: 'allMagicArmor',
      magicother: 'allMagicOther',
      scrolls: 'allMagicScrolls',
      wands: 'allMagicWands',
      carryWeight: "carryWeight",
      carryMax: "carryMax",
      totalGold: "totalGold",
      equipmentContainers: "equipmentContainers",
      armor: 'allArmor'
    }),
    allWeapons () {
      var allweapons = [ ...this.weapons, ...this.magicweapons ];
      allweapons.forEach((weap) => {
        if (!weap.Name) {
          weap.Name = weap.Item;
        }
      });
      allweapons = allweapons.filter((weap) => {
        if (this.searchEquip) {
          return weap.Name.toLowerCase().includes(this.searchEquip.toLowerCase());
        }
        return true;
      });
      return allweapons;
    },
    allArmor () {
      var allArmor = [ ...this.armor, ...this.magicarmor ];
      var newArmor = [];
      allArmor.forEach((armor) => {
        let newarmor = { ...armor };
        if (armor.Item) {
          newarmor.Armor = armor.Item;
        } else {
          newarmor.Armor = armor.Armor + " (" + armor.Material + ")";
        }
        newArmor.push(newarmor);
      });
      allArmor = newArmor.filter((armor) => {
        if (this.searchEquip) {
          return armor.Armor.toLowerCase().includes(this.searchEquip.toLowerCase());
        }
        return true;
      });
      return allArmor;
    },
    allGear () {
      var allgear = [ ...this.equipment, ...this.scrolls, ...this.wands, ...this.magicother ];
      allgear.forEach((item) => {
        if (typeof item.Weight === "undefined") {
          item.Weight = 1;
        }
      });
      var instance = this;
      return allgear.filter((item) => {
        if (instance.searchEquip) {
          return item.Item.toLowerCase().includes(instance.searchEquip.toLowerCase());
        }
        return true;
      });
    }
  },
  data () {
    return {
      ctypes: [
        { name: "", capacity: 0, weightCounts: true, weight: 0 },
        { name: "Carried/Worn", capacity: 9999, weightCounts: true, weight: 0 },
        { name: "Backpack", capacity: 30, weightCounts: true, weight: 5 },
        { name: "Pouch", capacity: 6, weightCounts: true, weight: 1 },
        { name: "Sack", capacity: 30, weightCounts: true, weight: 0.5 },
        { name: "Chest", capacity: 300, weightCounts: true, weight: 25 },
        { name: "Bag of Holding", capacity: 500, weightCounts: false, weight: 15 },
        { name: "Heward's Handy Haversack", capacity: 120, weightCounts: false, weight: 5 }
      ],
      containModal: false,
      newcontain: { name: "Backpack", capacity: 0, weightCounts: true, weight: 0 },
      equipModal: false,
      newequip: { name: "", weight: 0, quantity: 1, cost: 0, description: "", attunement: false, edit: false, container: 0 },
      ctypeselected: {},
      searchEquip: ""
    };
  },
  methods: {
    ...mapActions({
      removeEquipment: "removeEquipment",
      removeContainer: "removeContainer"
    }),
    newContainerType (ctype) {
      this.newcontain = { ...ctype };
    },
    addEquipment() {
      if (this.newequip.container !== 0) {
        var id = Date.now();
        this.character.equipment.push({ ...this.newequip, id: id });
        this.newequip = { name: "", weight: 0, quantity: 1, attunement: false, edit: false, container: this.character.containers[0].id };
        this.equipModal = false;
      } else {
        alert("Please select a container");
      }
    },
    addExistingEquipment(item, quantity, containerId) {
      if (containerId) {
        var id = Date.now();
        this.character.equipment.push({
          id: id,
          name: item.Item,
          weight: Number(item.Weight),
          quantity: quantity,
          cost: item['Cost (gp)'] ? item['Cost (gp)'] : Number(item.Cost),
          description: item.Effect ? item.Effect : item.Description,
          attunement: item.Attunement ? item.Attunement.includes('Yes') : false,
          edit: false,
          container: containerId
        });
        this.equipModal = false;
      } else {
        alert("Please select a container");
      }
    },
    addExistingWeapon(item, quantity, containerId) {
      if (containerId) {
        var id = Date.now();
        this.character.equipment.push({
          id: id,
          name: item.Name,
          weight: Number(item.Weight.substring(0, item.Weight.length - 2)),
          quantity: quantity,
          cost: item['Cost (gp)'] ? item['Cost (gp)'] : Number(item.Cost),
          description: item.Type + " weapon, " + item.Damage + " damage, " + item.Properties + ". " + (item.Effect ? item.Effect : ""),
          attunement: item.Attunement ? item.Attunement.includes('Yes') : false,
          edit: false,
          container: containerId
        });
        this.equipModal = false;
      } else {
        alert("Please select a container");
      }
    },
    addExistingArmor(item, quantity, containerId) {
      if (containerId) {
        var id = Date.now();
        this.character.equipment.push({
          id: id,
          name: item.Armor,
          weight: Number(item.Weight),
          quantity: quantity,
          cost: item['Cost (gp)'] ? item['Cost (gp)'] : Number(item.Price),
          description: "AC " + item.AC,
          attunement: item.Attunement ? item.Attunement.includes('Yes') : false,
          edit: false,
          container: containerId
        });
        var armortype = "Light Armor";
        if (item.Armor.toLowerCase().includes("breast") ||
            item.Armor.toLowerCase().includes("shirt") ||
            item.Armor.toLowerCase().includes("hide") ||
            item.Armor.toLowerCase().includes("half") ||
            item.Armor.toLowerCase().includes("scale mail")) {
          armortype = "Medium Armor";
        } else if (item.Armor.toLowerCase().includes("plate") || item.Armor.toLowerCase().includes("mail")) {
          armortype = "Heavy Armor";
        } else if (item.Armor.toLowerCase().includes("shield")) {
          armortype = "Shield";
        }
        this.character.armors.push({
          name: item.Armor,
          ac: item.AC,
          type: armortype,
          edit: false
        });
        this.equipModal = false;
      } else {
        alert("Please select a container");
      }
    },
    addContainer() {
      var id = Date.now();
      this.character.containers.push({ ...this.newcontain, id: id });
      this.newcontain = { name: "", capacity: 0, weightCounts: true, weight: 0 };
      this.containModal = false;
      this.ctypeselected = this.ctypes[0];
    }
  },
  mounted () {
    this.newequip.container = this.character.containers[0];
  }
};
