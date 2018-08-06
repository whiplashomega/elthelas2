var gulp = require('gulp'),
    fs = require('fs');
var console = {};
console.log = require('fancy-log');
var jsonlint = require("gulp-jsonlint");
var build = require('./elthelasapp/build/build.js');

gulp.task('historyjson', function (done) {
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
    fs.writeFile("./elthelasapp/static/json/history.json", JSON.stringify({ "model": "History", "documents": historyarray}), "utf-8", function() {
      console.log("writing history.json");
      done();
    });
  }
});

gulp.task('creaturesjson', function(done) {
  function intersect(arrays) {
    return arrays.shift().filter(function(v) {
      return arrays.every(function(a) {
        return a.indexOf(v) !== -1;
      });
    });
  }
  var files = fs.readdirSync("./data/creatures");
  var creaturearray = [];
  files.forEach(function(file) {
    var data = fs.readFileSync("./data/creatures/" + file, "utf-8");
    var creature = {};
    var filearray = data.split('\n');
    
    creature.name = filearray[2].replace(/\"/g, "").replace(/title\:[ \t]+/g, "");
    creature.tags = filearray[4].replace(/tags:[ \t]+\[/g, "").replace(/\]/, "").split(", ");
    var sizes = ["tiny", "small", "medium", "large", "huge", "gargantuan", "colossal"];
    var types = ["humanoid", "plant", "beast", "dragon", "giant", "ooze", "swarm", "undead", "fiend", "celestial", "monstrosity", "aberration", "elemental", "construct", "fey"];
    var alignments = [
      "chaotic evil", "neutral evil", 
      "lawful evil", "chaotic neutral", 
      "unaligned", "lawful neutral", 
      "chaotic good", "neutral good", 
      "lawful good", "neutral", 
      "any alignment", "any non-good alignment", 
      "any non-lawful alignment", "any chaotic alignment", 
      "any evil"];
    creature.size = intersect([creature.tags, sizes])[0];
    creature.type = intersect([creature.tags, types])[0];
    if(filearray[7].indexOf('(') !== -1) {
      creature.subtype = filearray[7].slice(filearray[7].indexOf('(')+1,filearray[7].indexOf(')'));
    } else {
      creature.subtype = false;
    }
    //console.log(creature.name);
    creature.cr = eval(creature.tags.filter(function(a) {
      return /cr/.test(a);
    })[0].replace(/cr/, ""));
    creature.alignment = alignments.filter(function(a) {
      return filearray[7].match(a) !== null;
    })[0];
    creature.ac = Number(filearray[9].match(/[\d]+/)[0]);
    creature.acdesc = filearray[9].replace(/\*\*Armor Class\*\*/, "");
    creature.hp = Number(filearray[11].match(/[\d]+/)[0]);
    creature.hpdesc = filearray[11].replace(/\*\*Hit Points\*\*/, "");
    creature.speed = filearray[13].replace(/\*\*Speed\*\*/, "");
    var statsrow = filearray[17].split(" ");
    creature.str = Number(statsrow[1]);
    creature.dex = Number(statsrow[4]);
    creature.con = Number(statsrow[7]);
    creature.int = Number(statsrow[10]);
    creature.wis = Number(statsrow[13]);
    creature.cha = Number(statsrow[16]);
    
    //pull the skills if they exist
    var skillsrow = filearray.filter(function(a) {
      return /\*\*Skills/.test(a);
    });
    if(skillsrow.length > 0) {
      creature.skills = skillsrow[0].replace(/\*\*Skills\*\*/, "").split(', ');
      filearray.splice(filearray.indexOf(skillsrow[0]), 2);
    } else {
      creature.skills = [];
    }
    
    //function to pull an arbitrary row and save its data as a property.
    var pullrow = function(filtercond, propname) {
      var row = filearray.filter(function(a) {
        return filtercond.test(a);
      });
      if(row.length > 0) {
        creature[propname] = row[0].replace(filtercond, "");
        filearray.splice(filearray.indexOf(row[0]), 2);
      } else {
        creature[propname] = false;
      }
    }
    
    pullrow(/\*\*Saving Throws\*\*/, "saves");
    pullrow(/\*\*Senses\*\*/, "senses");
    pullrow(/\*\*Damage Immunities\*\*/, "damageimmunities");
    pullrow(/\*\*Condition Immunities\*\*/, "conditionimmunities");
    pullrow(/\*\*Languages\*\*/, "languages");
    pullrow(/\*\*Damage Resistances\*\*/, "damageresistances");
    pullrow(/\*\*Locations\*\*/, "locations");
    pullrow(/\*\*LatLong\*\*/, "latlong");
    
    if(creature.latlong) {
      creature.latlong = creature.latlong.split(';');
      creature.latlong = creature.latlong.map(function(item) {
        var temp = item.split(',');
        return temp.map(function(num) {
          return Number(num);
        });
      });
    }
    if(creature.languages) {
      creature.languages = creature.languages.replace("Common", "First language of home country");
    }
    //challenge rating has already been pulled so we just need to identify and remove the row.
    var challengerow = filearray.filter(function(a) {
      return /\*\*Challenge/.test(a);
    });
    filearray.splice(filearray.indexOf(challengerow[0]), 2);
    
    creature.description = filearray.slice(19, filearray.length).join('\n');
    creaturearray.push(creature);
  });
  if(creaturearray.length === files.length) {
    fs.writeFile("./elthelasapp/static/json/creatures.json", JSON.stringify({ "model": "Creature", "documents": creaturearray }), "utf-8", function() {
      console.log("writing creatures.json");
      done(); 
    });
  }
});

gulp.task('spellsjson', function(done) {
  function intersect(arrays) {
    return arrays.shift().filter(function(v) {
        return arrays.every(function(a) {
            return a.indexOf(v) !== -1;
        });
    });
  }
  var files = fs.readdirSync("./data/spells");
  var spellarray = [];
  files.forEach(function(file) {
    var data = fs.readFileSync("./data/spells/" + file, "utf-8");
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
    spell.description = "<p>" + filearray.slice(18, filearray.length).join("</p><p>").replace(/\*\*At Higher Levels.\*\*/g, "<strong>At Higher Levels.</strong>") + "</p>";
    spellarray.push(spell);
  });
  if(spellarray.length === files.length) {
    fs.writeFile("./elthelasapp/static/json/spells.json", JSON.stringify({ "model": "Spell", "documents": spellarray }), "utf-8", function() {
      console.log("writing spells.json");
      done();
    });
  }
});

gulp.task('jsonlint', function(done) {
  gulp.src("./data/**/*.json")
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
  done();
});

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
  
gulp.task('jsoncompile', function(done) {
  console.log("starting");
  Promise.all([
    jsonmin('./data/feats.json', './elthelasapp/static/json/feats.json'), //weapons
    jsonmin('./data/weapons.json', './elthelasapp/static/json/weapons.json'), //armor
    jsonmin('./data/armor.json', './elthelasapp/static/json/armor.json'), //equipment
    jsonmin('./data/equipment.json', './elthelasapp/static/json/equipment.json'), //magic items
    jsonmin('./data/magicitems.json', './elthelasapp/static/json/magicitems.json'), //gods
    compiledir("./data/gods", "./elthelasapp/static/json/gods.json", "God"), //races
    compiledir("./data/races", "./elthelasapp/static/json/races.json", "Race"), //organizations
    compiledir("./data/organizations", "./elthelasapp/static/json/organizations.json", "Organization"), //divines
    compiledir("./data/divines", "./elthelasapp/static/json/divines.json", "Divine"), //cities
    compiledir("./data/cities", "./elthelasapp/static/json/cities.json", "City"), //continents
    compiledir("./data/continents", "./elthelasapp/static/json/continents.json", "Continent"), //features
    compiledir("./data/features", "./elthelasapp/static/json/features.json", "Feature"), //landmarks
    compiledir("./data/landmarks", "./elthelasapp/static/json/landmarks.json", "Landmark"), //nations
    compiledir("./data/nations", "./elthelasapp/static/json/nations.json", "Nation"), //backgrounds
    compiledir("./data/backgrounds", "./elthelasapp/static/json/backgrounds.json", "Background"), //classes
    compiledir("./data/classes", "./elthelasapp/static/json/classes.json", "CharClass")]).then(function() {
      console.log("all finished");
      done();
    });
});

gulp.task('build', function(done) {
  console.log("starting build task");
  build().then(function() {
    console.log("supposedly done");
    done();
  });  
});
//task groups
gulp.task('default', gulp.series('jsonlint', gulp.parallel('spellsjson', 'historyjson', 'creaturesjson', 'jsoncompile'), 'build'));