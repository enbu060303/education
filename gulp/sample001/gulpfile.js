const gulp         = require('gulp');
const ejs          = require('gulp-ejs');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const www_path = './www';
const src_path = './src';
const ejs_path = '/ejs';
const sass_path = '/sass'

gulp.task('default', ['watch', 'compile']);

gulp.task('watch', ['ejs:watch', 'sass:watch']);

gulp.task('ejs:watch', function () {
  var watcher = gulp.watch(`${src_path}${ejs_path}/**/*.ejs`, ['ejs:compile']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('sass:watch', function () {
  var watcher = gulp.watch(`${src_path}${sass_path}/**/*.scss`, ['sass:compile']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('compile', ['ejs:compile', 'sass:compile']);

gulp.task('ejs:compile', function () {
	gulp.src(`${src_path}${ejs_path}/**/*.ejs`)
		.pipe(sourcemaps.init())
		.pipe(ejs({}, {}, {ext: '.html'}))
		.pipe(gulp.dest(`${www_path}/`));
});

gulp.task('sass:compile', function () {
	gulp.src(`${src_path}${sass_path}/**/*.scss`)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer(['last 3 versions', 'ie >= 9', 'Android >= 4', 'iOS >= 8']))
		.pipe(sourcemaps.write('maps/'))
		.pipe(gulp.dest(`${www_path}/css/`));
});
