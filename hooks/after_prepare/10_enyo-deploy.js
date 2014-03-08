#!/usr/bin/env node

require('shelljs/global');

var appDir = process.argv[2];
var srcDir = appDir + '/src';
var wwwDir = appDir + '/www';
var deployDir = srcDir + '/deploy';

cd(srcDir);

echo('Deploying Enyo …');
exec('./enyo/tools/deploy.js');

echo('Moving files to www folder and cleaning up …');
rm('-rf', wwwDir + '/*');
cp('-R', deployDir + '/src/*', wwwDir);
rm('-rf', deployDir);
