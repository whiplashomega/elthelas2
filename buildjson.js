const fs = require('fs');
var console = {};
console.log = require('fancy-log');

function historyjson () {
  var files = fs.readdirSync("./data/historicalevents");
  var historyarray = [];
  files.forEach(function(file) {
    var data = fs.readFileSync("./data/historicalevents/" + file, "utf-8");

    var filearray = data.split('\n');
    if(filearray.length >= 9 && !isNaN(Number(filearray[0]))) {
      var event = {
        start_date: {
          year: filearray[0],
          month: filearray[1],
          day: filearray[2]
        },
        media: {
          url: filearray[6],
          caption: '',
          credit: ''
        },
        text: {
          headline: filearray[7],
          text: filearray.slice(8, filearray.length).join("\n")
        }
      }
      if(filearray[3] !== "") {
        event.end_date = {
          year: filearray[3],
          month: filearray[4],
          day: filearray[5]
        }
      }
      historyarray.push(event);
    } else {
      throw new Error("improperly formatted event: " + file);
    }
  });
  if(historyarray.length === files.length) {
    fs.writeFile("./elthelasapp/public/json/history.json", JSON.stringify({ "model": "History", "documents": historyarray}), "utf-8", function() {
      console.log("writing /elthelasapp/public/json/history.json");
    });
  }
}

function personalhistoryjson () {
  var files = fs.readdirSync("./data/personalevents");
  var historyarray = [];
  files.forEach(function(file) {
    var data = fs.readFileSync("./data/personalevents/" + file, "utf-8");

    var filearray = data.split('\n');
    if(filearray.length >= 9 && !isNaN(Number(filearray[0]))) {
      var event = {
        start_date: {
          year: filearray[0],
          month: filearray[1],
          day: filearray[2]
        },
        media: {
          url: filearray[6],
          caption: '',
          credit: ''
        },
        text: {
          headline: filearray[7],
          text: filearray.slice(8, filearray.length).join("\n")
        }
      }
      if(filearray[3] !== "") {
        event.end_date = {
          year: filearray[3],
          month: filearray[4],
          day: filearray[5]
        }
      }
      historyarray.push(event);
    } else {
      throw new Error("improperly formatted event: " + file);
    }
  });
  if(historyarray.length === files.length) {
    fs.writeFile("./elthelasapp/public/json/personalhistory.json", JSON.stringify({ "model": "History", "documents": historyarray}), "utf-8", function() {
      console.log("writing /elthelasapp/public/json/personalhistory.json");
    });
  }
}

function spellsjson (dir) {
  const source = "./data/" + dir;
  function intersect(arrays) {
    return arrays.shift().filter(function(v) {
        return arrays.every(function(a) {
            return a.indexOf(v) !== -1;
        });
    });
  }
  var files = fs.readdirSync(source);
  var spellarray = [];
  files.forEach(function(file) {
    var data = fs.readFileSync(source + "/" + file, "utf-8");
    var spell = {};
    var filearray = data.split('\n');

    spell.title = filearray[2].replace(/\"/g,"").replace(/title\:[ \t]+/g, "");
    spell.source = filearray[4].replace(/source\:[ \t]+/g, "");
    spell.tags = filearray[5].replace(/tags:[ \t]+\[/g, "").replace(/\]/, "").split(", ");
    var schoolarrays = [ spell.tags, ["abjuration", "conjuration", "divination", "enchantment", "evocation", "illusion", "necromancy", "transmutation"]];
    spell.school = intersect(schoolarrays)[0];
    var levelarrays = [ spell.tags, ["cantrip", "level1", "level2", "level3", "level4", "level5", "level6", "level7", "level8", "level9"]];
    spell.level = intersect(levelarrays)[0];
    spell.ritual = false;
    if(intersect([spell.tags, ["ritual"]]).length > 0) {
      spell.ritual = true;
    }
    spell.castingTime = filearray[10].replace(/\*\*Casting Time\*\*\:[ \t]+/g,"");
    spell.range = filearray[12].replace(/\*\*Range\*\*\:[ \t]+/g, "");
    spell.components = filearray[14].replace(/\*\*Components\*\*\:[ \t]+/g, "");
    spell.duration = filearray[16].replace(/\*\*Duration\*\*\:[ \t]+/g, "");
    spell.savestat = filearray[18].replace(/\*\*Saving Throw\*\*\:[ \t]+/g, "");
    spell.savefor = filearray[20].replace(/\*\*Save For\*\*\:[ \t]+/g, "");
    try {
      spell.damage = JSON.parse(filearray[22].replace(/\*\*Damage\*\*\:[ \t]+/g, "").replace(/label\:/g, "\"label\":"));
    } catch (e) {
      console.log(e);
      console.log(filearray[22].replace(/\*\*Damage\*\*\:[ \t]+/g, ""));
      console.log(spell.title);
    }
    spell.description = "<p>" + filearray.slice(24, filearray.length).join("</p><p>").replace(/\*\*At Higher Levels.\*\*/g, "<strong>At Higher Levels.</strong>") + "</p>";
    spellarray.push(spell);
  });
  if(spellarray.length === files.length) {
    fs.writeFile("./elthelasapp/public/json/" + dir + ".json", JSON.stringify({ "model": "Spell", "documents": spellarray }), "utf-8", function() {
      console.log("writing " + dir + ".json");
    });
  }
}

function rulesjson(dir) {
  const source = "./data/" + dir;
  var files = fs.readdirSync(source);
  var rulesarray = [];
  var rules = [];
  files.forEach((file) => {
    var data = fs.readFileSync(source + "/" + file, "utf-8");
    var rule = {};
    var filearray = data.split('\n');
    rule.category = filearray[0];
    rule.subcategory = filearray[1];
    rule.title = filearray[2];
    rule.description = filearray.slice(3,filearray.length).join("\n");
    rulesarray.push(rule);
    var cats = rules.find((a) => {
      if (rule.category === a.title) {
        return true;
      }
    });
    if (cats === undefined) {
      rules.push({ title: rule.category, subcategories: [{ title: rule.subcategory, rules: [ rule ] }] });
    } else {
      var subcats = cats.subcategories.find((a) => {
        if (rule.subcategory === a.title) {
          return true;
        }
      });
      if (subcats === undefined) {
        cats.subcategories.push({ title: rule.subcategory, rules: [ rule ]});
      } else {
        subcats.rules.push(rule);
      }
    }
  });
  if (rulesarray.length === files.length) {
    fs.writeFile("./elthelasapp/public/json/" + dir + ".json", JSON.stringify({ "model": "Rule", "documents": rulesarray, "heirarchical": rules }), "utf-8", function () {
      console.log("writing " + dir + ".json");
    });
  }
}

function compiledir(sourcedir, destination, modelName) {
  return new Promise(function(resolve) {
    var files = fs.readdirSync(sourcedir);
    var comparray = [];
    files.forEach(function(file) {
      try {
        var item = JSON.parse(fs.readFileSync(sourcedir + "/" + file, "utf-8"));
        comparray.push(item);
      } catch(e) {
        console.log(file);
        console.log(e.name + ": " + e.message);
      }
    });
    fs.writeFile(destination, JSON.stringify({ "model": modelName, "documents": comparray }), "utf-8", function() {
      console.log("writing " + destination);
      resolve();
    });
  });
}

function jsonmin(sourcefile, destination) {
  console.log("starting " + destination);
  return new Promise(function(resolve) {
    var jsfile = JSON.parse(fs.readFileSync(sourcefile, 'utf-8'));
    fs.writeFile(destination, JSON.stringify(jsfile), 'utf-8', function() {
      console.log("writing " + destination);
      resolve();
    });
  })
}

function jsoncompile () {
  console.log("starting");
  Promise.all([
    jsonmin('./data/joeweapons.json', './elthelasapp/public/json/weaponsv2.json'),
    jsonmin('./data/joearmor.json', './elthelasapp/public/json/armorv2.json'),
    jsonmin('./data/feats.json', './elthelasapp/public/json/feats.json'), //weapons
    jsonmin('./data/featsv2.json', './elthelasapp/public/json/featsv2.json'), //weapons
    jsonmin('./data/weapons.json', './elthelasapp/public/json/weapons.json'), //armor
    jsonmin('./data/armor.json', './elthelasapp/public/json/armor.json'), //equipment
    jsonmin('./data/equipment.json', './elthelasapp/public/json/equipment.json'), //magic items
    jsonmin('./data/valuables.json', './elthelasapp/public/json/valuables.json'), //valuables
    jsonmin('./data/magicitems.json', './elthelasapp/public/json/magicitems.json'), //magicitems
    jsonmin('./data/magicitemsv2.json', './elthelasapp/public/json/magicitemsv2.json'), //magicitems
    compiledir("./data/gods", "./elthelasapp/public/json/gods.json", "God"), //gods
    compiledir("./data/stronghold-improvements", "./elthelasapp/public/json/improvements.json", "Improvements"), //stronghold improvements
    compiledir("./data/ancestries", "./elthelasapp/public/json/ancestries.json", "Ancestries"), //races
    compiledir("./data/races", "./elthelasapp/public/json/races.json", "Race"), //races
    compiledir("./data/organizations", "./elthelasapp/public/json/organizations.json", "Organization"), //organizations
    compiledir("./data/organizationsv2", "./elthelasapp/public/json/organizationsv2.json", "Organization"), //organizations
    compiledir("./data/divines", "./elthelasapp/public/json/divines.json", "Divine"), //divines
    compiledir("./data/cities", "./elthelasapp/public/json/cities.json", "City"), //cities
    compiledir("./data/continents", "./elthelasapp/public/json/continents.json", "Continent"), //continents
    compiledir("./data/features", "./elthelasapp/public/json/features.json", "Feature"), //features
    compiledir("./data/landmarks", "./elthelasapp/public/json/landmarks.json", "Landmark"), //landmarks
    compiledir("./data/nations", "./elthelasapp/public/json/nations.json", "Nation"), //nations
    compiledir("./data/backgrounds", "./elthelasapp/public/json/backgrounds.json", "Background"), //backgrounds
    compiledir("./data/backgroundsv2", "./elthelasapp/public/json/backgroundsv2.json", "BackgroundV2"), //backgrounds
    compiledir("./data/classes", "./elthelasapp/public/json/classes.json", "CharClass"), //classes
    compiledir("./data/classesv2", "./elthelasapp/public/json/classesv2.json", "CharClass"), //classes
    compiledir("./data/territories", "./elthelasapp/public/json/territories.json", "Territories")]).then(function() {
      console.log("all finished");
    });
}

spellsjson("spells");
spellsjson("spellsv2");
rulesjson("rules");
historyjson();
personalhistoryjson();
jsoncompile();
