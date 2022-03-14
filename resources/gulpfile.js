const path = require('path');

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
  sass: {
    src: ['./scss/*.scss', './scss/**/*.scss'],
    dest: '../docs/',
  },
  pug: {
    src: ['./pug/*.pug', './pug/**/*.pug', '!./pug/_*.pug', '!./pug/**/_*.pug', '!./pug/components/**/*.pug', '!./pug/components/*.pug'],
    dest: '../docs/',
  },
};

/**
 * sass
 */
function taskSass() {
  const { src, dest } = paths.sass;

  const sassOption = {
    outputStyle: 'compressed',
  };

  return gulp
    .src(src)
    .pipe(sass(sassOption).on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest(dest));
}

/**
 * pug
 */
function taskPug() {
  const { src, dest } = paths.pug;

  const pugOption = {
    pretty: false,
    basedir: path.resolve(__dirname, './pug/'),
  };

  return gulp.src(src).pipe(pug(pugOption)).pipe(gulp.dest(dest));
}

/**
 * watch
 */
function taskWatch() {
  gulp.watch(paths.sass.src, taskSass);
  gulp.watch(paths.pug.src, taskPug);
}

exports.pug = taskPug;
exports.sass = taskSass;
exports.watch = taskWatch;
exports.default = gulp.parallel(taskPug, taskSass, taskWatch);
