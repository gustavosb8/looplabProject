const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const htmlReplace = require('gulp-html-replace');
const cssmin = require('gulp-cssmin');
//const htmlbeautify = require('gulp-html-beautify');

/*GULP-SASS*/

const sass = require('gulp-sass');
const rename = require("gulp-rename");

/*sprite*/

//const spritesmith = require('gulp.spritesmith');

/*INLINE*/

//const inlinesource = require('gulp-inline-source');

/*Cache*/

//const rev = require("gulp-rev");
//const revReplace = require("gulp-rev-replace");


gulp.task('default', ['copy'], function() {
    gulp.start('imagemin', 'html-replace', 'cssmin', 'sassprod', 'merge-css');
});

/*
gulp.task('default', ['copy'], function() {
    gulp.start('imagemin', 'html-replace', 'cssmin', 'sassprod', 'merge-css');
})
*/

gulp.task('clean', function() {
    return gulp.src('dist')
               . pipe(clean());
});

gulp.task('copy', ['clean'],  function() {
    return gulp.src('src/**/*')
              .pipe(gulp.dest('dist') );
});


gulp.task('imagemin',  function() {
    return gulp.src('src/img/*')
        .pipe(imagemin() )
        .pipe(gulp.dest('dist/img') );
});

gulp.task('html-replace', function () {
    return gulp.src('src/**/*.html')
        .pipe(htmlReplace({css: '../dist/css/site.css'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('cssmin', function () {
     return gulp.src('dist/css/*.css')
                .pipe(cssmin())
                .pipe(gulp.dest('dist/css'));
});

gulp.task('cleanscss', function() {
    return gulp.src('dist/scss')
        . pipe(clean());
});

gulp.task('sassprod', ['cleanscss'], function() {
    
    var sassProdOptions = {
        outputStyle: 'compressed'
    }
    
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass(sassProdOptions).on('error', sass.logError))
        
        .pipe(rename({
            suffix: ".min",
        }))
        
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('merge-css', function() {
     return gulp.src('dist/css/*.css')
        .pipe(concat('site.css') )
        .pipe(cleanCSS() )
        .pipe(gulp.dest('dist/css/') );
 });

/*
gulp.task('htmlbeautify', function() {
  var options = {
      indentSize: 2
  };
   gulp.src('./src/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('inlinesource', function () {
    var options = {
        compress: false
    };
    return gulp.src('./dist/index.html')
        .pipe(inlinesource(options))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compress-js', function (cb) {
         gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('dist/img/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm: 'binary-tree'
  }));
  return spriteData.pipe(gulp.dest('dist/sprite/'));
});

gulp.task('revision', function(){
  return gulp.src(['dist/**//*.css', 'dist/**//*.js', 'dist/**//*.png'])
    .pipe(rev())
    .pipe(gulp.dest('cache/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('cache/'))
})

 
gulp.task('revreplace', ['revision'], function(){
  var manifest = gulp.src('./cache/rev-manifest.json');
 
  return gulp.src('dist/index.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest('cache/'));
});


*/