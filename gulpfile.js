var gulp = require('gulp'),
    minifycss = require('gulp-clean-css'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    del = require('del'),
    ngannotate = require('gulp-ng-annotate'),
    sass = require('gulp-sass'),
    fs = require('fs');
var jsonlint = require("gulp-jsonlint");
var gutil = require('gulp-util');
//precompile
gulp.task('jshint', function() {
  
    var jshint = require('gulp-jshint'),
      stylish = require('jshint-stylish');
    gulp.src('tests/js/**/*.js').pipe(jshint()).pipe(jshint.reporter(stylish));
    return gulp.src('dev/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('copylibraries', function() {
   gulp.src('./bower_components/angular/angular.min.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/angular-marked/angular-marked.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/angular-marked/dist/angular-marked.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/bootstrap/dist/js/bootstrap.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/bootstrap/dist/css/*.min.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/bootstrap/dist/fonts/*').pipe(gulp.dest("./dev/fonts"));
   gulp.src('./bower_components/datatables/media/js/jquery.dataTables.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/datatables/media/css/*.min.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/datatables/media/css/jquery.dataTables.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/datatables/media/images/*').pipe(gulp.dest("./dev/images"));
   gulp.src('./bower_components/datatables.net-responsive/js/dataTables.responsive.min.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/datatables.net-responsive-dt/css/responsive.dataTables.min.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/droll/droll.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/jquery/dist/jquery.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/leaflet/dist/leaflet.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/leaflet/dist/leaflet.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/leaflet-measure/dist/leaflet-measure.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/leaflet-measure/dist/leaflet-measure.min.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/leaflet/dist/images/*').pipe(gulp.dest("./dev/css/images"));
   gulp.src('./bower_components/marked/lib/marked.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/angular-ui-router/release/angular-ui-router.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./node_modules/babel-polyfill/dist/polyfill.min.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/angular-cookies/angular-cookies.min.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/TimelineJS3/compiled/css/**/*').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/TimelineJS3/compiled/js/timeline.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/angular-timelinejs3/dist/js/ng-timeline.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/seedrandom/seedrandom.min.js').pipe(gulp.dest('./dev/libraries'));
   return true;
});

//compile
gulp.task('sass', function() {
    return gulp.src('./dev/sass/**/*.scss').pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dev/css'));
});

gulp.task('sass:watch', function() {
   gulp.watch('./dev/sass/**/*.scss',['sass']); 
});

gulp.task('usemin',['sass', 'copylibraries', 'copyjson', 'copyimages'], function () {
  return gulp.src('./dev/index.html')
      .pipe(usemin({
        css:[minifycss()],
        js: []
      }))
      .pipe(gulp.dest('./web/'));
});

/*gulp.task('fixfilenames', function() {
  var files = fs.readdirSync("./data/creatures2/bestiary");
  files.forEach(file => {
    var data = fs.readFileSync("./data/creatures2/bestiary/" + file, "utf-8");
    var filename = file.replace(/[\d]+-[\d]+-[\d]+-/,"");
    console.log(filename);
    fs.writeFile("./data/creatures/" + filename, data, "utf-8");
  });
});*/

gulp.task('historyjson', function () {
  var files = fs.readdirSync("./data/historicalevents");
  var historyarray = [];
  files.forEach(file => {
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
    fs.writeFile("./dev/json/history.json", JSON.stringify({ "model": "History", "documents": historyarray}), "utf-8");
  }
  return true;
});

gulp.task('creaturesjson', function() {
  function intersect(arrays) {
    return arrays.shift().filter(function(v) {
      return arrays.every(function(a) {
        return a.indexOf(v) !== -1;
      });
    });
  }
  var files = fs.readdirSync("./data/creatures");
  var creaturearray = [];
  files.forEach(file => {
    var data = fs.readFileSync("./data/creatures/" + file, "utf-8");
    var creature = {};
    var filearray = data.split('\n');
    
    creature.name = filearray[2].replace(/\"/g, "").replace(/title\:[ \t]+/g, "");
    creature.tags = filearray[4].replace(/tags:[ \t]+\[/g, "").replace(/\]/, "").split(", ");
    var sizes = ["tiny", "small", "medium", "large", "huge", "gargantuan", "colossal"];
    var types = ["humanoid", "plant", "beast", "dragon", "giant", "ooze", "swarm", "undead", "fiend", "celestial", "monstrosity", "aberration", "elemental", "construct", "fey"];
    var alignments = [
      "chaotic evil", 
      "neutral evil", 
      "lawful evil", 
      "chaotic neutral", "unaligned", "lawful neutral", "chaotic good", "neutral good", "lawful good", "neutral", "any alignment", "any non-good alignment", "any non-lawful alignment", "any chaotic alignment", "any evil"];
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
    
    //challenge rating has already been pulled so we just need to identify and remove the row.
    var challengerow = filearray.filter(function(a) {
      return /\*\*Challenge/.test(a);
    });
    filearray.splice(filearray.indexOf(challengerow[0]), 2);
    
    creature.description = filearray.slice(19, filearray.length).join('\n');
    creaturearray.push(creature);
  });
  if(creaturearray.length === files.length) {
    fs.writeFile("./dev/json/creatures.json", JSON.stringify({ "model": "Creature", "documents": creaturearray }), "utf-8");
  }
  return true;  
});
gulp.task('spellsjson', function() {
  function intersect(arrays) {
    return arrays.shift().filter(function(v) {
        return arrays.every(function(a) {
            return a.indexOf(v) !== -1;
        });
    });
  }
  var files = fs.readdirSync("./data/spells");
  var spellarray = [];
  files.forEach(file => {
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
    fs.writeFile("./dev/json/spells.json", JSON.stringify({ "model": "Spell", "documents": spellarray }), "utf-8");
  }
  return true;
});

gulp.task('jsonlint', function() {
  gulp.src("./data/**/*.json")
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});

gulp.task('jsoncompile', ['jsonlint'], function() {
  function compiledir(sourcedir, destination, modelName) {
    var files = fs.readdirSync(sourcedir);
    var comparray = [];
    files.forEach(file => {
      try {
        var item = JSON.parse(fs.readFileSync(sourcedir + "/" + file, "utf-8"));
        comparray.push(item);
      } catch(e) {
        console.log(file);
        console.log(e.name + ": " + e.message);
      }
    });
    fs.writeFile(destination, JSON.stringify({ "model": modelName, "documents": comparray }), "utf-8");
  }
  //gods
  compiledir("./data/gods", "./dev/json/gods.json", "God");
  //races
  compiledir("./data/races", "./dev/json/races.json", "Race");
  //organizations
  compiledir("./data/organizations", "./dev/json/organizations.json", "Organization");
  
  compiledir("./data/divines", "./dev/json/divines.json", "Divine");
  
  compiledir("./data/cities", "./dev/json/cities.json", "City");
  
  compiledir("./data/continents", "./dev/json/continents.json", "Continent");
  
  compiledir("./data/features", "./dev/json/features.json", "Feature");
  
  compiledir("./data/landmarks", "./dev/json/landmarks.json", "Landmark");
  
  compiledir("./data/nations", "./dev/json/nations.json", "Nation");
  
  compiledir("./data/backgrounds", "./dev/json/backgrounds.json", "Background");
  
  compiledir("./data/classes", "./dev/json/classes.json", "CharClass");
  return true;
});

gulp.task('cleanup', [], function() {
   return del(['web/**/*']); 
});

gulp.task('copyimages', ['cleanup'], function() {
   gulp.src('dev/images/**/*').pipe(gulp.dest('web/images'));
   gulp.src('dev/fonts/**/*').pipe(gulp.dest('web/fonts'));
   gulp.src('dev/html/**/*').pipe(gulp.dest('web/html'));
   gulp.src('dev/libraries/locale/**/*').pipe(gulp.dest('web/js/locale'));
   return gulp.src('dev/css/images/**/*').pipe(gulp.dest('web/css/images'));
});

gulp.task('copyjson', ['spellsjson', 'historyjson', 'creaturesjson', 'jsoncompile', 'cleanup'], function() {
    return gulp.src('./dev/json/**/*.json').pipe(gulp.dest('./web/json'));
});

gulp.task('unittest', ['jshint'], function(done) {
  var Server = require('karma').Server
  new Server({
    configFile: __dirname + "/karma.conf.js",
    singleRun: true
  }, done).start();
});

gulp.task('integrationtest', ['unittest'], function() {
  
  var jasmine = require('gulp-jasmine');
  var reporters = require('jasmine-reporters');
  var server = require('./server.conf');
  server.start();
  gulp.src('tests/js/integration/test.spec.js').pipe(jasmine(
    {
      reporter: new reporters.TerminalReporter(),
      jasmineDone: function() {
        server.stop();
      }
    }));
});

//post-compile
gulp.task('prodcleanup', ['copyimages', 'usemin', 'copyjson'], function() {

});

//task groups
gulp.task('default', ['integrationtest', 'sass', 'spellsjson', 'historyjson', 'creaturesjson', 'jsoncompile', 'copylibraries'], function() {});

//does not include testing
gulp.task('prod', ['prodcleanup'], function() {
  
});