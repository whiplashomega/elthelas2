var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    //notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del'),
    ngannotate = require('gulp-ng-annotate'),
    sass = require('gulp-sass'),
    fs = require('fs'),
    Server = require('karma').Server;

//precompile
gulp.task('jshint', function() {
    gulp.src('tests/js/**/*.js').pipe(jshint()).pipe(jshint.reporter(stylish));
    return gulp.src('dev/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('copylibraries', function() {
   gulp.src('./bower_components/angular/angular.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/angular-marked/angular-marked.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/angular-marked/dist/angular-marked.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/bootstrap/dist/js/bootstrap.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/bootstrap/dist/css/*.min.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/bootstrap/dist/fonts/*').pipe(gulp.dest("./dev/fonts"));
   gulp.src('./bower_components/datatables/media/js/jquery.dataTables.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/datatables/media/css/*.min.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/datatables/media/css/jquery.dataTables.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/datatables/media/images/*').pipe(gulp.dest("./dev/images"));
   gulp.src('./bower_components/droll/droll.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/jquery/dist/jquery.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/leaflet/dist/leaflet.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/leaflet/dist/leaflet.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/leaflet/dist/images/*').pipe(gulp.dest("./dev/images"));
   gulp.src('./bower_components/Leaflet.label/dist/leaflet.label.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/Leaflet.label/dist/leaflet.label.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/Leaflet.label/dist/images/*').pipe(gulp.dest("./dev/images"));
   gulp.src('./bower_components/marked/lib/marked.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./bower_components/angular-ui-router/release/angular-ui-router.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./node_modules/babel-polyfill/dist/polyfill.min.js').pipe(gulp.dest("./dev/libraries"));
   gulp.src('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css').pipe(gulp.dest("./dev/css"));
   gulp.src('./bower_components/angular-cookies/angular-cookies.min.js').pipe(gulp.dest("./dev/libraries"));
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

gulp.task('usemin',['unittest', 'sass', 'copylibraries'], function () {
  return gulp.src('./dev/**/*.html')
      .pipe(usemin({
        css:[minifycss(),rev()],
        js: [ngannotate(),uglify(),rev()]
      }))
      .pipe(gulp.dest('./web/'));
});

gulp.task('historyjson', function () {
  var files = fs.readdirSync("./data/historicalevents");
  var historyarray = [];
  files.forEach(file => {
    var data = fs.readFileSync("./data/historicalevents/" + file, "utf-8");
    var event = {};
    var filearray = data.split('\n');
    
    event.date = filearray[0];
    event.title = filearray[1];
    event.shortDesc = filearray[2];
    event.description = filearray.slice(3, filearray.length).join("\n");
    historyarray.push(event);
  });
  if(historyarray.length === files.length) {
    fs.writeFile("./dev/json/history.json", JSON.stringify(historyarray), "utf-8");
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
    spell.description = "<p>" + filearray.slice(18, filearray.length-1).join("</p><p>").replace(/\*\*At Higher Levels.\*\*/g, "<strong>At Higher Levels.</strong>") + "</p>";
    spellarray.push(spell);
  });
  if(spellarray.length === files.length) {
    fs.writeFile("./dev/json/spells.json", JSON.stringify(spellarray), "utf-8");
  }
  return true;
});


gulp.task('jsoncompile', function() {
  function compiledir(sourcedir, destination) {
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
    fs.writeFile(destination, JSON.stringify(comparray), "utf-8");
  }
  //gods
  compiledir("./data/gods", "./dev/json/gods.json");
  //races
  compiledir("./data/races", "./dev/json/races.json");
  //organizations
  compiledir("./data/organizations", "./dev/json/organizations.json");
  
  compiledir("./data/divines", "./dev/json/divines.json");
  return true;
});

gulp.task('cleanup', [], function() {
   return del(['web/images']); 
});

gulp.task('copyimages', ['cleanup'], function() {
   return gulp.src('dev/images/**/*').pipe(gulp.dest('web/images'));
});

gulp.task('copyjson', ['spellsjson', 'historyjson', 'jsoncompile'], function() {
    return gulp.src('./dev/json/**/*.json').pipe(gulp.dest('./web/json'));
});

gulp.task('unittest', ['jshint'], function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('conttest', ['jshint'], function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});
//post-compile
gulp.task('default', ['unittest', 'sass', 'spellsjson', 'jsoncompile', 'copylibraries'], function() {});

gulp.task('prod', ['copyimages', 'usemin', 'copyjson'], function() {});

//continuous integration
gulp.task('watch', ['sass:watch', 'conttest'], function() {
    
});