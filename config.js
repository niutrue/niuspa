"use strict";
var config = {
	port:88,
	fileName:'demo'
}
module.exports = {
	'pagePort':config.port,
	'pageLink':'http://localhost:' + config.port + '/dist/' + config.fileName + '.html',
	'esTransBegin':'dev/es6/*.js',
	'esTransEnd':'dev/es5',
	'packBegin':'dev/es5/' + config.fileName + '.js',
	'packEnd':'dist/js',
	'renameBasename':'' + config.fileName + '',
	'renameSuffix':'',
	'watchEs6Src':'dev/es6/**/*.js',
	'watchLessSrc':'dev/less/**/*.less',
	'watchpugSrc':'dev/pug/**/*.pug',
	'distSrc':['dist/js/*.js','dist/css/*.css','dist/*.html'],
	'pugSrc':'dev/pug/' + config.fileName + '.pug',
	'htmlSrc':'dist/',
	'lessSrc':'dev/less/' + config.fileName + '.less',
	'cssSrc':'dist/css/',
	'distAdd':'dist/**/*.*'
}
