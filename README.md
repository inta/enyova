Enyo Cordova Bootplate
======================

Supported platforms
-------------------
 * android
 * ios

At least the ressources and build version hooks are not aware of other platforms and thus will not set the build version or copy icons and splashscreen images. You are welcome to add support for more platforms.

Prerequisites
-------------
You need the following software:
 * [node.js](http://nodejs.org/download/)
 * [Cordova](http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-line%20Interface)
 * [ShellJS](https://github.com/arturadib/shelljs) for the hook scripts (`npm install [-g] shelljs`)
 * [SDKs](http://cordova.apache.org/docs/en/edge/guide_platforms_index.md.html#Platform%20Guides) (Android SDK, Xcode and Command Line Tools)
 * [PhoneGap](http://docs.phonegap.com/en/edge/guide_platforms_index.md.html) (you can use [PhoneGap's build service](http://docs.phonegap.com/en/edge/guide_phonegap-build_index.md.html#PhoneGap%20Build) instead of local SDKs)

Setup
-----
Use `node setup.js` to initialize your project (or `./setup.js` if file is executable). *platforms*, *plugins* and *www* folders will be created and **platforms** and **plugins** listed in *project.json* will be added to your project.

You can manually add platforms and plugins later using cordova-cli:

`cordova platform add <platformname>`

`cordova plugin add <pluginname>`

Do not forget to add them to your *project.json* file if you want those platforms/plugins to be added during initial setup.

Structure
---------
	└┬ ProjectRoot
	 ├── hooks                      (Cordova hooks, including Enyo deployment, build version, platform merges and icons/splash)
	 ├─┬ merges
	 │ ├── <platformname>           (Cordova's merges to "www" folder for given platform)
	 │ └── <platformname>-platform  (merges to platform specific code inside "platforms" folder)
	 ├── platforms                  (Cordova platforms)
	 ├── plugins                    (Cordova plugins)
	 ├─┬ src                        (home of Enyo and all your code)
	 │ ├── …
	 │ ├─┬ mock                     (place for some mock data)
	 │ │ └── cordova.js             (this is an incomplete dummy version for desktop browser testing - for debug.html)
	 │ ├── …
	 │ └── deploy.json              (add your folders and files for the www folder here)
	 ├── www                        (do not use this directly, the minified code is placed here during build prepare)
	 ├── config.xml                 (Cordova's config)
	 └── project.json               (setup data, platforms and plugins)

*platforms*, *plugins* and *www* folders should not be under version control. The *merges* folder contains default Cordova/PhoneGap merges affecting the *www* folder and merges for the platform code (for example *android-platform*) which must reproduce the structure of *`platforms/<platformname>`* and will be copied during the prepare process.

The *src* folder contains the main project files (besides *merges*), it is derived from [Enyo Bootplate](https://github.com/enyojs/enyo/wiki/Bootplate).

### project.json
	{
		"platforms": [
			"android",
			"ios"
		],
		"plugins": [
			"org.apache.cordova.battery-status",
			"org.apache.cordova.camera",
			"org.apache.cordova.console",
			"org.apache.cordova.contacts",
			"org.apache.cordova.device",
			"org.apache.cordova.device-motion",
			"org.apache.cordova.device-orientation",
			"org.apache.cordova.dialogs",
			"org.apache.cordova.file",
			"org.apache.cordova.file-transfer",
			"org.apache.cordova.geolocation",
			"org.apache.cordova.globalization",
			"org.apache.cordova.inappbrowser",
			"org.apache.cordova.keyboard",
			"org.apache.cordova.media",
			"org.apache.cordova.media-capture",
			"org.apache.cordova.network-information",
			"org.apache.cordova.splashscreen"
		]
	}

Deployment / build process
--------------------------
Simply use Cordova's or PhoneGap's `build`, `run`, etc. commands. The Enyo deploy script is triggered by a hook.
