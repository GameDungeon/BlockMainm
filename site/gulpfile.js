const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('node-sass'));
 
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const cssnext = require('cssnext');
const stylelint = require("stylelint");
const purgecss = require('@fullhuman/postcss-purgecss')
 
gulp.task('css', function () {
    const processors = [
        stylelint,
        autoprefixer,
        //cssnano,
        cssnext,
        purgecss({
            content: ['**/*.html'],
            css: ['**/*.scss']
          })
    ];
    return gulp.src('./styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist/temp'));
});