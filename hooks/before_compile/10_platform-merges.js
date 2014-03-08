#!/usr/bin/env node

require('shelljs/global');

var i, platform, mergeDir, platformDir;
var platforms = process.env.CORDOVA_PLATFORMS.replace(', ', ',').split(',');
var appDir = process.argv[2];
var mergesDir = appDir + '/merges';
var platformsDir = appDir + '/platforms';

for (i = 0; i < platforms.length; i++) {
	platform = platforms[i];

	mergeDir = mergesDir + '/' + platform + '-platform';
	platformDir = platformsDir + '/' + platform;

	if (test('-d', mergeDir)) {
		cp('-R', mergeDir + '/*', platformDir);
	}
}
