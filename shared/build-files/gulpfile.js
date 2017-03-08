var gulp = require('gulp');
var pkg = require('./package.json');
var print = require('gulp-print');
var jsMinify = require('gulp-minify');
var cssMinify = require('gulp-css');
var htmlMinify = require('gulp-minify-html');
var chmod = require('gulp-chmod');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var beautify = require('gulp-beautify');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');

var srcdir = '../facebook-service/';
var publishdir = '../../runner/server/public/shared/facebook/';

var src = {
  css: [srcdir + 'assets/css/*.css'],
  scss: [srcdir + 'assets/css/*.scss'],
  img: [srcdir + 'assets/images/*.*'],
  fonts: [srcdir + 'assets/fonts/*.*'],
  js: [srcdir + 'assets/js/*.js'],
  app: [srcdir + '/*.js', srcdir + 'app/**/*.js'],
  template: [srcdir + 'app/**/*.html']
};

var dist = {
  all: [publishdir + '/**/*'],
  css: publishdir + 'css/',
  js: publishdir + 'js/',
  img: publishdir + 'images/'
};

gulp.task('clean-all', function () {
  gulp.src([publishdir + '**/'])
    .pipe(clean({ force: true }));
});

gulp.task('copy-resources', function () {

  /* CSS */
  gulp.src(src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ basename: 'navigation' }))
    .pipe(gulp.dest(dist.css))
    .pipe(chmod(666))
    .pipe(cssMinify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(print())
    .pipe(gulp.dest(dist.css));

  /* IMAGES */
  gulp.src(src.img)
    .pipe(chmod(666))
    .pipe(gulp.dest(dist.img));

  /* JS */
  gulp.src(src.js)
    .pipe(concat("nav.js"))
    .pipe(beautify({ indentSize: 2 }))
    .pipe(gulp.dest(dist.js))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dist.js));
});

gulp.task('build-angular-app', function () {
  gulp.src(src.app)
    .pipe(concat("facebook.js"))
    .pipe(chmod(666))
    .pipe(beautify({
      jslint_happy: true,
      end_with_newline: true,
      keep_array_indentation: true,
      keep_function_indentation: true,
      indentSize: 2,
      indent_with_tabs: true
    }))
    .pipe(gulp.dest(dist.js))
    .pipe(ngAnnotate({ single_quotes: true }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dist.js));
});

gulp.task('copy-templates', function () {
  gulp.src(src.template)
    .pipe(htmlMinify({ empty: true }))
    .pipe(templateCache({
      module: 'portal-shared.navigation-templates',
      standalone: true,
      transformUrl: function (url) {
        return url.replace(/\.tpl\.html$/, '.html');
      }
    }))
    .pipe(chmod(666))
    /*.pipe(rename({ basename: 'templates-' + pkg.version }))*/
    .pipe(print())
    .pipe(gulp.dest(dist.js));
});

gulp.task('clean', ['clean-all']);
gulp.task('build', ['copy-resources', 'build-angular-app', 'copy-templates']) // development

//=====================================================

//related to GA - TODO: do a refactor
var gasrcdir = '../ga/*.js';
var gapublishdir = '../../runner/server/public/shared/ga/';

gulp.task('copy-ga', function () {
  gulp.src(gasrcdir)
    .pipe(concat("ga.js"))
    .pipe(beautify({ indentSize: 2 }))
    .pipe(chmod(666))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(print())
    .pipe(gulp.dest(gapublishdir));
});

//=====================================================

gulp.task('publish', ['build', 'copy-ga']);