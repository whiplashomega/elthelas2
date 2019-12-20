export default {
  resArmor (resist, armor, items) {
    items.push({
      ...armor,
      Item: armor.Armor + " of " + resist + " Resistance " + "(" + armor.Material + ")",
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "Yes",
      Effect: "You have resistance to " + resist + " damage while you wear this armor. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: "Rare",
      "Cost (gp)": Number(armor.Price) + 8000
    });
  },
  armorBuilder (items, armor) {
    var resistArray = ["fire", "cold", "acid", "poison", "bludgeoning", "piercing", "slashing", "force", "lightning", "thunder", "radiant", "necrotic"];
    items.push({
      ...armor,
      Item: armor.Armor + " of Gleaming (" + armor.Material + ")",
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "This armor never  gets dirty. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: "Common",
      "Cost (gp)": Number(armor.Price) + 200
    });
    items.push({
      ...armor,
      Item: "Cast-Off " + armor.Armor + " (" + armor.Material + ")",
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "You can doff this armor as an action. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: "Common",
      "Cost (gp)": Number(armor.Price) + 400
    });
    items.push({
      ...armor,
      Item: "Smoldering " + armor.Armor + " (" + armor.Material + ")",
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "Wisps of harmless, odorless smoke rise from this armor while it is worn. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: "Common",
      "Cost (gp)": Number(armor.Price) + 200
    });
    items.push({
      ...armor,
      AC: armor.AC + 1,
      Item: "+1 " + armor.Armor + " (" + armor.Material + ")",
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "You have a +1 bonus to AC while wearing this armor. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: "Rare",
      "Cost (gp)": Number(armor.Price) + 4000
    });
    items.push({
      ...armor,
      AC: armor.AC + 2,
      Item: "+2 " + armor.Armor + " (" + armor.Material + ")",
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "You have a +2 bonus to AC while wearing this armor. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: "Very Rare",
      "Cost (gp)": Number(armor.Price) + 16000
    });
    items.push({
      ...armor,
      AC: armor.AC + 3,
      Item: "+3 " + armor.Armor + " (" + armor.Material + ")",
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "You have a +3 bonus to AC while wearing this armor. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: "Legendary",
      "Cost (gp)": Number(armor.Price) + 1000000
    });
    for (var k = 0; k < resistArray.length; k++) {
      this.resArmor(resistArray[k], armor, items);
    }
    items.push({
      ...armor,
      Item: "Mariner's " + armor.Armor + " (" + armor.Material + ")",
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: "Uncommon",
      "Cost (gp)": Number(armor.Price) + 2000
    });
  },
  scrollBuilder (spell, items) {
    var levelnum = 0;
    if (spell.level === "cantrip") {
      levelnum = 0;
    } else {
      if (typeof spell.level === "undefined") {
        console.log("bad level in spell: " + spell);
      } else {
        spell.level = spell.level.replace("level", "");
        levelnum = Number(spell.level);
      }
    }
    var item = {
      Item: "Scroll of " + spell.title,
      Type: "Single Use (scroll)",
      Attunement: "No",
      Effect: "This scroll bears the spell " + spell.title + ", written in a mystical cipher. If it is on your class's spell list you can use an action to read the scroll and cast it without having to provide any of the spell's components. If the spell is on your class's spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC of the check is " + (10 + levelnum) + ". On a failed check, the spell disappears from the scroll with no other effect, otherwise you are able to cast the spell as if you were casting it yourself without using a spell slot. Once the spell is cast the scroll crumbles to dust. The spell does not use your own save DC or attack bonus, rather it uses one based on the level of the spell. The attack bonus for this scroll is " + (Math.floor(Math.abs(levelnum - 1) / 2) * 2 + 5) + " and the save DC is " + (Math.floor(Math.abs(levelnum - 1) / 2) * 2 + 13) + "."
    };
    if (["cantrip", "1"].indexOf(spell.level) !== -1) {
      item.Rarity = "Common";
    } else if (["2", "3"].indexOf(spell.level) !== -1) {
      item.Rarity = "Uncommon";
    } else if (["4", "5"].indexOf(spell.level) !== -1) {
      item.Rarity = "Rare";
    } else {
      item.Rarity = "Very Rare";
    }
    if (spell.level === "cantrip") {
      item["Cost (gp)"] = 25;
    } else {
      item["Cost (gp)"] = 50 * Math.pow(2, (Number(spell.level) - 1));
    }
    if (spell.level !== "9") {
      items.push(item);
    }
  },
  wandBuilder (spell, items) {
    var wand = {
      Item: "Wand of " + spell.title,
      Type: "Wand",
      Attunement: "No",
      "Cost (gp)": 1000,
      Rarity: "Uncommon",
      Effect: "This wand has 7 charges and regains 1d6+1 charges daily at dawn. If you expend the wands last charge roll a d20. On a 1, the wand crumbles into ashes and is destroyed. Each wand of this type has one 1st level spell associated with it. The wielder can expend 1 charge of the wand to cast the spell as a 1st level spell. If the spell can be cast at higher levels, the wielder can expend additional charges to cast it at a higher level. For each charge expended the level of the spell increases by 1. The save DC and attack roll for spells cast from this wand depend on the spell list the spell is from and the wielders ability scores. If it was chosen from the druid, cleric, or ranger spell lists, use wisdom. If it was chosen from the sorcerer, bard, warlock, or paladin spell lists use charisma. If it was chosen from the wizard spell list use intelligence."
    };
    if (spell.level === 'cantrip') {
      wand.Effect = "While holding this wand you can cast the cantrip " + spell.title + " at will. The save DC and attack roll for spells cast from this wand depend on the spell list the spell is from and the wielders ability scores. If it was chosen from the druid, cleric, or ranger spell lists, use wisdom. If it was chosen from the sorcerer, bard, warlock, or paladin spell lists use charisma. If it was chosen from the wizard spell list use intelligence.";
      items.push(wand);
    } else if (spell.level === '1') {
      wand["Cost (gp)"] = 3000;
      items.push(wand);
    } else if (spell.level === '2') {
      wand.Attunement = "Yes (spellcaster)";
      wand["Cost (gp)"] = 6000;
      wand.Rarity = "Rare";
      items.push(wand);
    } else if (spell.level === '3') {
      wand.Attunement = "Yes (spellcaster)";
      wand["Cost (gp)"] = 12000;
      wand.Rarity = "Rare";
      items.push(wand);
    } else if (spell.level === '4') {
      wand.Attunement = "Yes (spellcaster)";
      wand["Cost (gp)"] = 24000;
      wand.Rarity = "Very Rare";
      items.push(wand);
    }
  },
  inStock (rand, item, state) {
    var threshold = 1;
    if (item.Item.includes("Mithril")) {
      threshold = 0.25;
    } else if (item.Item.includes("Parakas Steel") || item.Item.includes("Orichalcum")) {
      threshold = 0.45;
    } else if (item.Item.includes("Adamantine")) {
      threshold = 0.1;
    } else if (item.Item.includes("Dragon")) {
      threshold = 0.05;
    }
    if (item.Rarity === "Uncommon") {
      threshold *= (3 / 20);
      state.alluncommons.push(item);
    } else if (item.Rarity === "Rare") {
      threshold *= (1 / 20);
      state.allrares.push(item);
    } else if (item.Rarity === "Very Rare") {
      threshold *= (1 / 100);
      state.allveryrares.push(item);
    } else if (item.Rarity === "Legendary") {
      threshold *= 0;
      state.alllegendaries.push(item);
    } else {
      state.allcommons.push(item);
    }
    if (rand < threshold) {
      return "In Stock";
    }
    return "Out of Stock";
  }
};
