#!/usr/bin/env node

require('shelljs/global');
var i;
var fs = require('fs');
var project = JSON.parse(fs.readFileSync(__dirname + '/project.json', 'utf8'));

echo('-> STARTING PROJECT SETUP');
echo('');

echo('-- setting up platforms, plugins and www folders');
cd(__dirname);
if (test('-d', 'platforms')) {
	rm('-rf', 'platforms');
}
if (test('-d', 'plugins')) {
	rm('-rf', 'plugins');
}
if (test('-d', 'www')) {
	rm('-rf', 'www');
}

if (!test('-d', 'platforms')) {
	mkdir('platforms');
}
if (!test('-d', 'plugins')) {
	mkdir('plugins');
}
if (!test('-d', 'www')) {
	mkdir('www');
}
echo('');

echo('-- adding platforms');
for (i = 0; i < project.platforms.length; i++) {
	exec('cordova platform add ' + project.platforms[i]);
	echo('');
}

echo('-- adding plugins');
for (i = 0; i < project.plugins.length; i++) {
	exec('cordova plugin add ' + project.plugins[i]);
	echo('');
}

echo('<- DONE');
