import magicweapons from './magicweapons.js';

export default {
  getWeaponVariants (weapon) {
    return magicweapons.reduce((newArr, mag) => {
      let newobj = { ...weapon, WeaponType: weapon.Type };
      let flag = false;
      for (var i in mag) {
        if (typeof mag[i] === "string") {
          newobj[i] = mag[i].replace(/\$Name/g, weapon.Weapon);
        } else {
          newobj[i] = mag[i];
        }
        if (mag.test) {
          if (mag.test.test(mag[i])) {
            flag = true;
          }
        } else {
          flag = true;
        }
      }
      newobj.Weapon = newobj.Item;
      if (flag) {
        newArr.push(newobj);
      }
      return newArr;
    }, []);
  },
  resArmor (resist, armor, items) {
    items.push({
      ...armor,
      Item: armor.Armor + " of " + resist + " Resistance",
      ArmorType: armor.Type,
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "Yes",
      Effect: "You have resistance to " + resist + " damage while you wear this armor. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: "Rare",
      "Cost (gp)": Number(armor.Cost) + 8000,
      Cost: Number(armor.Cost) + 8000
    });
  },
  armorBuilder (items, armor) {
    var resistArray = ["Fire", "Cold", "Acid", "Poison", "Force", "Lightning", "Thunder", "Radiant", "Necrotic"];
    items.push({
      ...armor,
      Item: armor.Armor + " of Gleaming",
      ArmorType: armor.Type,
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "This armor never  gets dirty. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: armor.Rarity === "Common" ? "Common" : "Uncommon",
      "Cost (gp)": Number(armor.Cost) + 200,
      Cost: Number(armor.Cost) + 200
    });
    items.push({
      ...armor,
      Item: "Cast-Off " + armor.Armor,
      ArmorType: armor.Type,
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "You can doff this armor as an action. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: armor.Rarity === "Common" ? "Common" : "Uncommon",
      "Cost (gp)": Number(armor.Cost) + 400,
      Cost: Number(armor.Cost) + 400
    });
    items.push({
      ...armor,
      Item: "Glamoured " + armor.Armor,
      ArmorType: armor.Type,
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "While wearing this armor, you gain a +1 bonus to AC. You can also use a bonus action to speak the armor's command word and cause the armor to assume the appearance of a normal set of clothing or some other kind of armor. You decide what it looks like, including color, style, and accessories, but the armor retains its normal bulk and weight. The illusory appearance lasts until you use this property again or remove the armor.. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: armor.Rarity === "Common" ? "Rare" : "Very Rare",
      "Cost (gp)": Number(armor.Cost) + 7000,
      Cost: Number(armor.Cost) + 7000
    });
    items.push({
      ...armor,
      Item: "Smoldering " + armor.Armor,
      ArmorType: armor.Type,
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "Wisps of harmless, odorless smoke rise from this armor while it is worn. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: armor.Rarity === "Common" ? "Common" : "Uncommon",
      "Cost (gp)": Number(armor.Cost) + 200,
      Cost: Number(armor.Cost) + 200
    });
    items.push({
      ...armor,
      AC: armor.AC + 1,
      Item: "+1 " + armor.Armor,
      ArmorType: armor.Type,
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "You have a +1 bonus to AC while wearing this armor. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: armor.Rarity === "Common" ? "Rare" : "Very Rare",
      "Cost (gp)": Number(armor.Cost) + 4000,
      Cost: Number(armor.Cost) + 4000
    });
    items.push({
      ...armor,
      AC: armor.AC + 2,
      Item: "+2 " + armor.Armor,
      ArmorType: armor.Type,
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "You have a +2 bonus to AC while wearing this armor. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: armor.Rarity === "Common" ? "Very Rare" : "Legendary",
      "Cost (gp)": Number(armor.Cost) + 16000,
      Cost: Number(armor.Cost) + 16000
    });
    items.push({
      ...armor,
      AC: armor.AC + 3,
      Item: "+3 " + armor.Armor,
      ArmorType: armor.Type,
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "You have a +3 bonus to AC while wearing this armor. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: "Legendary",
      "Cost (gp)": Number(armor.Cost) + 1000000,
      Cost: Number(armor.Cost) + 1000000
    });
    for (var k = 0; k < resistArray.length; k++) {
      this.resArmor(resistArray[k], armor, items);
    }
    items.push({
      ...armor,
      Item: "Mariner's " + armor.Armor,
      ArmorType: armor.Type,
      Type: "Armor (" + armor.Armor + ")",
      Attunement: "No",
      Effect: "While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: armor.Rarity === "Common" ? "Uncommon" : "Rare",
      "Cost (gp)": Number(armor.Cost) + 2000,
      Price: Number(armor.Cost) + 2000
    });
    if (armor.Type !== "Shield") {
      items.push({
        ...armor,
        PC: armor.PC + 2,
        Item: "Absorbing " + armor.Armor,
        ArmorType: armor.Type,
        Type: "Armor (" + armor.Armor + ")",
        Attunement: "No",
        Effect: "While wearing this armor you have a +2 bonus to PC. It also grants the following resistances based on its material: " + armor.Resistance,
      Rarity: armor.Rarity === "Common" ? "Very Rare" : "Legendary",
        "Cost (gp)": Number(armor.Cost) + 16000,
        Price: Number(armor.Cost) + 16000
      });
      items.push({
        ...armor,
        PC: armor.PC + 1,
        Item: "Protective " + armor.Armor,
        ArmorType: armor.Type,
        Type: "Armor (" + armor.Armor + ")",
        Attunement: "No",
        Effect: "While wearing this armor you have a +1 bonus to PC. It also grants the following resistances based on its material: " + armor.Resistance,
        Rarity: armor.Rarity === "Common" ? "Rare" : "Very Rare",
        "Cost (gp)": Number(armor.Cost) + 4000,
        Price: Number(armor.Cost) + 4000
      });
    }
    if (armor.Type === "Shield") {
      items.push({
        ...armor,
        Item: "Animated " + armor.Armor,
        ArmorType: armor.Type,
        Type: "Armor (" + armor.Armor + ")",
        Attunement: "Yes",
        Effect: "While holding this shield, you can speak its command word as a bonus action to cause it to animate. The shield leaps into the air and hovers in your space to protect you as if you were wielding it, leaving your hands free. The shield remains animated for 1 minute, until you use a bonus action to end this effect, or until you are incapacitated or die, at which point the shield falls to the ground or into your hand if you have one free.",
        Rarity: armor.Rarity === "Common" ? "Very Rare" : "Legendary",
        "Cost (gp)": Number(armor.Cost) + 15000,
        Price: Number(armor.Cost) + 15000
      });
      items.push({
        ...armor,
        Item: "Arrow-Catching " + armor.Armor,
        ArmorType: armor.Type,
        Type: "Armor (" + armor.Armor + ")",
        Attunement: "Yes",
        Effect: "You gain a +2 bonus to AC against ranged attacks while you wield this shield. This bonus is in addition to the shield's normal bonus to AC. In addition, whenever an attacker makes a ranged attack against a target within 5 feet of you, you can use your reaction to become the target of the attack instead.",
        Rarity: armor.Rarity === "Common" ? "Rare" : "Very Rare",
        "Cost (gp)": Number(armor.Cost) + 4000,
        Price: Number(armor.Cost) + 4000
      });
      items.push({
        ...armor,
        Item: armor.Armor + " of Expression",
        ArmorType: armor.Type,
        Type: "Armor (" + armor.Armor + ")",
        Attunement: "No",
        Effect: "The front of this shield is shaped in the likeness of a face. While bearing the shield, you can use a bonus action to alter the faces expression.",
        Rarity: armor.Rarity === "Common" ? "Common" : "Uncommon",
        "Cost (gp)": Number(armor.Cost) + 100,
        Price: Number(armor.Cost) + 100
      });
    }
    if (armor.Type === "Light") {
      items.push({
        ...armor,
        AC: armor.AC + 1,
        Item: armor.Armor + " of Magic Shadows",
        ArmorType: armor.Type,
        Type: "Armor (" + armor.Armor + ")",
        Attunement: "Yes (spellcaster)",
        Effect: "This armor grants a +1 bonus to AC. While attuned to and wearing this armor, you can expend a spell slot as a bonus action to become invisible for a number of rounds equal to the level of the slot expended. It also grants the following resistances based on its material: " + armor.Resistance,
        Rarity: armor.Rarity === "Common" ? "Rare" : "Very Rare",
        "Cost (gp)": Number(armor.Cost) + 4000,
        Price: Number(armor.Cost) + 4000
      });
    }
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
  }
};
