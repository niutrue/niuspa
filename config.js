"use strict";
var config = {
	port:3500,
	fileName:'demo'
}
module.exports = {
	//服务器端口
	'pagePort':config.port,
	//单页面在浏览器中的连接
	'pageLink':'http://localhost:' + config.port + '/dist/' + config.fileName + '.html',
	//es6转es5的起始位置
	'esTransBegin':'dev/es6/*.js',
	'esTransEnd':'dev/es5',
	//将js打包的起始位置
	'packBegin':'dev/es5/' + config.fileName + '.js',
	'packEnd':'dist/js',
	//打包后js的文件名字和后缀名字
	'renameBasename':'' + config.fileName + '',
	'renameSuffix':'',
	//监测的文件路径
	'watchEs6Src':'dev/es6/**/*.js',
	'watchLessSrc':'dev/less/**/*.less',
	'watchpugSrc':'dev/pug/**/*.pug',
	'distSrc':['dist/js/*.js','dist/css/*.css','dist/*.html'],
	//pug转html的起始位置
	'pugSrc':'dev/pug/' + config.fileName + '.pug',
	'htmlSrc':'dist/',
	//less转css的起始位置
	'lessSrc':'dev/less/' + config.fileName + '.less',
	'cssSrc':'dist/css/',
	//需要重命名的文件路径
	'initRename':['dev/es6/demo.js','dev/less/demo.less','dev/pug/demo.pug'],
	//任务‘replace’需要的参数
	'initReplaceOption':{
		files:[
			'dev/pug/demo.pug',
			'dev/pug/js.pug',
			'dev/pug/css.pug'
		],
		from:'demo',
		to:config.fileName
	},
	//单页应用的主文件名
	'fileName':config.fileName
}
