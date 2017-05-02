"use strict";
const gulp = require('gulp');
const babel = require('gulp-babel');
const es2015Preset = require('babel-preset-es2015-node5');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const prettify = require('gulp-jsbeautifier');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const config = require('./config');
const copy = require('copy');
const serverFactory = require('spa-server');
const combiner = require('stream-combiner2');

gulp.task('default',['webserver','browser-sync','pack','pug','less'],function(){

});

gulp.task('browser-sync',function(){
	browserSync.init({
		proxy:config.pageLink
	})
});

gulp.task('es6to5',function(){
	return gulp.src(config.esTransBegin)
		.pipe(babel({
			presets:[es2015Preset]
		}))
		.pipe(gulp.dest(config.esTransEnd));
});
gulp.task('pack',['es6to5'],function(){//任务a依赖任务长时b
	gulp.src(config.packBegin)
		.pipe(browserify())
		// .pipe(uglify())
		.pipe(rename({
			basename:config.renameBasename,
			suffix:config.renameSuffix
		}))
		.pipe(gulp.dest(config.packEnd))
});

gulp.task('pug',function(){
	var combined = combiner.obj([
		gulp.src(config.pugSrc),
		pug(),
		prettify({
			"indent_size":4
		}),
		gulp.dest(config.htmlSrc)
	]);

	combined.on('error',console.error.bind(console));
	return combined;
})

gulp.task('less',function(){
	var combined = combiner.obj([
		gulp.src(config.lessSrc),
		less(),
		gulp.dest(config.cssSrc)
	]);

	combined.on('error',console.error.bind(console));
	return combined;
})

gulp.task('webserver',function(){
	var server = serverFactory.create({
		path:'./',
		port:config.pagePort
	});

	server.start();
})

gulp.watch(config.watchEs6Src,['pack']);
gulp.watch(config.watchpugSrc,['pug']);
gulp.watch(config.watchLessSrc,['less']);
gulp.watch(config.distSrc,browserSync.reload);
