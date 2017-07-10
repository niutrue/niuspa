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
const rm = require('gulp-rm');
const replace = require('replace-in-file');

gulp.task('default',['webserver','browser-sync','pack','pug','less','watch'],function(){

});

gulp.task('browser-sync',function(){
	browserSync.init({
		proxy:config.pageLink
	})
});

gulp.task('es6to5',function(){
	var combined = combiner.obj([
		gulp.src(config.esTransBegin),
		babel({
			presets:[es2015Preset]
		}),
		gulp.dest(config.esTransEnd)
	]);

	combined.on('error',console.error.bind(console));
	return combined;
});

gulp.task('pack',['es6to5'],function(){//任务a依赖任务长时b
	var combined = combiner.obj([
		gulp.src(config.packBegin),
		browserify(),
		// uglify(),
		rename({
			basename:config.renameBasename,
			suffix:config.renameSuffix
		}),
		gulp.dest(config.packEnd)
	]);

	combined.on('error',console.error.bind(console));
	return combined;
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

gulp.task('replace',function(){
	replace(config.initReplaceOption, (error, changedFiles) => {
		if (error) {
	    	return console.error('Error occurred:', error);
		}
		console.log('Modified files:', changedFiles.join(', '));
	});
})

gulp.task('rename',['replace'],function(){//还不如自己用node写呢
	for(var i = 0;i < config.initRename.length;i++){
		+function(i){
			var combined = combiner.obj([
				gulp.src(config.initRename[i]),
				rename({
					basename:config.fileName,
				}),
				gulp.dest(config.initRename[i].substring(0,config.initRename[i].indexOf('demo')))
			])
		}(i)
	}
})

gulp.task('init',['rename'],function(){
	var combined = combiner.obj([
		gulp.src('**/demo.*'),
		rm()
	])
})

gulp.task('watch',function(){//之前这些没有写在这个作用域，而是写在全局作用徐，执行其他的人去，gulp也不退出
	gulp.watch(config.watchEs6Src,['pack']);
	gulp.watch(config.watchpugSrc,['pug']);
	gulp.watch(config.watchLessSrc,['less']);
	gulp.watch(config.distSrc,browserSync.reload);
})
