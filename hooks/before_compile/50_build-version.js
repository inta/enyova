#!/usr/bin/env node

require('shelljs/global');
var cdvUtil = require('cordova/src/util');

var i, platform, mergeDir, platformDir;
var platforms = process.env.CORDOVA_PLATFORMS.replace(', ', ',').split(',');
var appDir = process.argv[2];
var platformsDir = appDir + '/platforms';
var projectXml = cdvUtil.projectConfig(appDir);
var projectConfig = new cdvUtil.config_parser(projectXml);
var projectName = projectConfig.name();

// Current date (i.e. 19700101) is used as build version.
// Change it to your needs, but ensure it is an integer.
var build = exec('date -u "+%Y%m%d"').output.replace(/[^0-9]/, '');

for (i = 0; i < platforms.length; i++) {
	platform = platforms[i];
	platformDir = platformsDir + '/' + platform;

	switch (platform) {
		case 'android':
			sed('-i', /android:versionCode="[0-9]*"/, 'android:versionCode="' + build + '"', platformDir + '/AndroidManifest.xml');
			break;
		case 'ios':
			// CAUTION: multi line replacement will not work that way with native sed
			sed('-i', /CFBundleVersion<\/key>[\s\t\n]*<string>.*<\/string>/, 'CFBundleVersion</key><string>' + build + '</string>', platformDir + '/' + projectName + '-Info.plist');
			break;
	}
}
