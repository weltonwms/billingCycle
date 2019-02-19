const gulp= require('gulp');
const uglify= require('gulp-uglify');
const uglifyCss= require('gulp-uglifycss');
const babel= require('gulp-babel');
const concat = require('gulp-concat');
const htmlMin= require('gulp-htmlmin');

gulp.task('app',['app.html','app.css','app.js','app.assets']);

gulp.task('app.html',()=>{
    return gulp.src([
        './app/**/*.html'
    ]).pipe(htmlMin({collapseWhitespace:true}))
        .pipe(gulp.dest('./public'))
});

gulp.task('app.css',()=>{
    return gulp.src([
        './app/**/*.css'
    ]).pipe(uglifyCss({uglyComments:true}))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./public/assets/css'))
});

gulp.task('app.js',()=>{
    return gulp.src([
        './app/**/*.js'
    ]).pipe(babel({presets:["env"]}))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./public/assets/js'))
});

gulp.task('app.assets',()=>{
    return gulp.src([
        './assets/**/*.*'
    ]).pipe(gulp.dest('./public/assets/'))
})
