import { useCharacterStore, useUserStore, useStaticsStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
import modal from '@/components/global/modal.vue';

export default {
  setup () {
    const characters = useCharacterStore();
    const userinfo = useUserStore();
    const statics = useStaticsStore();
    
    const { character, carryWeight, carryMax, totalGold, equipmentContainers } = storeToRefs(characters);
    const { equipment, weapons, magicweapons, magicarmor, magicother, magicscrolls: scrolls, magicwands: wands, armor, homebrewweapons, magichomebrewweapons } = statics;
    
    const removeEquipment = characters.removeEquipment;
    const removeContainer = characters.removeContainer;
    
    return {
      userinfo,
      character,
      equipment,
      weapons,
      magicweapons,
      magicarmor,
      magicother,
      scrolls,
      wands,
      carryWeight,
      carryMax,
      totalGold,
      equipmentContainers,
      armor,
      removeEquipment,
      removeContainer
    };
  },
  computed: {
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
      return allgear.filter((item) => {
        if (this.searchEquip) {
          return item.Item.toLowerCase().includes(this.searchEquip.toLowerCase());
        }
        return true;
      });
    }
  },
  components: {
    modal
  },
  data () {
    return {
      ctypes: [
        { name: "", capacity: 0, weightCounts: true, weight: 0 },
        { name: "Carried/Worn", capacity: 9999, weightCounts: true, weight: 0 },
        { name: "Chest", capacity: 300, weightCounts: true, weight: 25 },
        { name: "Backpack", capacity: 30, weightCounts: true, weight: 5 },
        { name: "Barrel", capacity: 350, weightCounts: true, weight: 5 },
        { name: "Basket", capacity: 40, weightCounts: true, weight: 5 },
        { name: "Case, crossbow bolt", capacity: 1.5, weightCounts: true, weight: 5 },
        { name: "Case, map or scroll", capacity: 1, weightCounts: true, weight: 5 },
        { name: "Flask", capacity: 1, weightCounts: true, weight: 5 },
        { name: "Pouch", capacity: 6, weightCounts: true, weight: 1 },
        { name: "Quiver", capacity: 1, weightCounts: true, weight: 1 },
        { name: "Sack", capacity: 30, weightCounts: true, weight: 0.5 },
        { name: "Waterskin", capacity: 4, weightCounts: true, weight: 5 },
        { name: "Bag of Holding", capacity: 500, weightCounts: false, weight: 15 },
        { name: "Heward's Handy Haversack", capacity: 120, weightCounts: false, weight: 5 }
      ],
      containModal: false,
      newcontain: { name: "Backpack", capacity: 0, weightCounts: true, weight: 0 },
      newequip: { name: "", weight: 0, quantity: 1, cost: 0, description: "", attunement: false, edit: false, container: 0 },
      ctypeselected: {},
      searchEquip: "",
      newEquipModal: { isActive: false, title: "New Equipment" }
    };
  },
  methods: {
    newContainerType (ctype) {
      this.newcontain = { ...ctype };
    },
    addEquipment() {
      if (this.newequip.container !== 0) {
        var id = Date.now();
        this.character.equipment.push({ ...this.newequip, id: id });
        this.newequip = { name: "", weight: 0, quantity: 1, attunement: false, edit: false, container: this.character.containers[0].id };
        this.newEquipModal.isActive = false;
      } else {
        alert("Please select a container");
      }
    },
    findAndAddItem(name, quantity, containerId, bypass) {
      let newitem = this.equipment.filter((a) => {
        return a.Item === name;
      })[0];
      return this.addExistingEquipment(newitem, quantity, containerId, bypass);
    },
    addExistingEquipment(item, quantity, containerId, bypass = false) {
      var id = Date.now();
      if (item.Container && (bypass || confirm("Would you like to add " + item.Item + " as a container that can hold other items?"))) {
        this.character.containers.push({ id: id, name: item.Item, capacity: item.Capacity, weightCounts: item.weightCounts, weight: Number(item.Weight) });
        this.newEquipModal.isActive = false;
        return id;
      } else if (item.Pack) {
        let cid = this.findAndAddItem(item.PackContainer.name, 1, containerId, true);
        item.Contents.forEach((a) => {
          this.findAndAddItem(a.Item, a.quantity, cid);
        });
      } else if (containerId) {
        this.character.equipment.push({
          id: id,
          name: item.Item,
          weight: Number(item.Weight),
          quantity: quantity,
          cost: item['Cost (gp)'] ? item['Cost (gp)'] : Number(item.Cost),
          description: item.Effect ? item.Effect : item.Description,
          attunement: item.Attunement ? item.Attunement.includes('Yes') : false,
          edit: { isActive: false, title: item.Item },
          container: containerId
        });
        this.newEquipModal.isActive = false;
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
          weight: typeof item.Weight === "string" ? Number(item.Weight.substring(0, item.Weight.length - 2)) : item.Weight,
          quantity: quantity,
          cost: item['Cost (gp)'] ? item['Cost (gp)'] : Number(item.Cost),
          description: item.Type + " weapon, " + item.Damage + " damage, " + item.Properties + ". " + (item.Effect ? item.Effect : ""),
          attunement: item.Attunement ? item.Attunement.includes('Yes') : false,
          edit: { isActive: false, title: item.Item },
          container: containerId
        });
        this.newEquipModal.isActive = false;
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
          edit: { isActive: false, title: item.Item },
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
        this.newEquipModal.isActive = false;
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
