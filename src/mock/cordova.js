/*

	dummy cordova for browser testing

*/
(function() {

	// create nested objects from string
	function createObj(ns, value, obj) {
		var levels = ns.split('.'),
			first = levels.shift();

		obj = obj || window;

		obj[first] = obj[first] || {};

		if (levels.length) {
			createObj(levels.join('.'), value, obj[first]);
		} else {
			obj[first] = value;
		}

		return obj[first];
	}

	// log messages with cordova mock prefix
	function log(msg) {
		var args = enyo.cloneArray(arguments);
		args.unshift('mock cdv:');
		enyo.log.apply(this, args);
	}

	// deviceReady
	enyo.ready(function() {
		setTimeout(function() {
			enyo.Signals.send('ondeviceready');
		}, 500);
	});

	// device
	createObj('device', {
		cordova: 'mock',
		model: navigator.appCodeName || 'unknown-browser',
		name: 'deprecated',
		platform: navigator.platform || 'unknown-desktop',
		uuid: navigator.userAgent || 'unknown',
		version: navigator.appVersion || 0
	});

	// splashscreen
	createObj('navigator.splashscreen.show', function() {
		log('splashscreen ->', 'show');
	});

	createObj('navigator.splashscreen.hide', function() {
		log('splashscreen ->', 'hide');
	});

	// dialogs
	createObj('navigator.notification.alert', function(message, alertCallback, title, buttonName) {
		log('alert ->', message, alertCallback, title, buttonName);
		alert(message);
	});

	createObj('navigator.notification.confirm', function(message, confirmCallback, title, buttonLabels) {
		log('confirm ->', message, confirmCallback, title, buttonLabels);
		alert(message);
	});

	createObj('navigator.notification.prompt', function(message, promptCallback, title, buttonLabels, defaultText) {
		log('prompt ->', message, promptCallback, title, buttonLabels, defaultText);
		prompt(message, defaultText);
	});

	createObj('navigator.notification.beep', function(times) {
		log('beep ->', times);
	});

	// filesystem
	createObj('LocalFileSystem', {
		PERSISTENT: true,
		TEMPORARY: true
	});

	createObj('FileError.NOT_FOUND_ERR', 1);
	createObj('FileError.SECURITY_ERR', 2);
	createObj('FileError.ABORT_ERR', 3);
	createObj('FileError.NOT_READABLE_ERR', 4);
	createObj('FileError.ENCODING_ERR', 5);
	createObj('FileError.NO_MODIFICATION_ALLOWED_ERR', 6);
	createObj('FileError.INVALID_STATE_ERR', 7);
	createObj('FileError.SYNTAX_ERR', 8);
	createObj('FileError.INVALID_MODIFICATION_ERR', 9);
	createObj('FileError.QUOTA_EXCEEDED_ERR', 10);
	createObj('FileError.TYPE_MISMATCH_ERR', 11);
	createObj('FileError.PATH_EXISTS_ERR', 12);

	createObj('requestFileSystem', function(type, size, successCallback, errorCallback) {
		log('requestFileSystem:', type, size, successCallback, errorCallback);

		function dirEntry(path, options, successCallback, errorCallback) {
			successCallback({
				name: 'dummyDirEntryName',
				getDirectory: dirEntry,
				getFile: function(path, options, successCallback, errorCallback) {
					errorCallback({code: 1});
				}
			});
		}

		successCallback({root: {
			fullPath: 'dummyFsPath',
			getDirectory: dirEntry,
			getFile: function(path, options, successCallback, errorCallback) {
				errorCallback({code: 1});
			}
		}});
	});

	createObj('FileReader', function() {
		return {
			abort: function() {
				log('FileReader ->', 'abort');
			},
			readAsDataURL: function() {
				log('FileReader ->', 'readAsDataURL');
			},
			readAsText: function(file) {
				log('FileReader ->', 'readAsText');
				this.onloadend({target: {result: file}});
			}
		};
	});

	// file transfer
	createObj('FileTransferError.FILE_NOT_FOUND_ERR', 1);
	createObj('FileTransferError.INVALID_URL_ERR', 2);
	createObj('FileTransferError.CONNECTION_ERR', 3);
	createObj('FileTransferError.ABORT_ERR', 4);

	createObj('FileTransfer', function() {
		return {
			upload: function(fileURL, server, successCallback, errorCallback, trustAllHosts, options) {
				log('FileTransfer ->', 'upload', fileURL, server, successCallback, errorCallback, trustAllHosts, options);
			},
			download: function(source, target, successCallback, errorCallback, trustAllHosts, options) {
				log('FileTransfer ->', 'download', source, target, successCallback, errorCallback, trustAllHosts, options);
				var request = new XMLHttpRequest();
				request.open('get', source, true);
				request.onreadystatechange = function() {
					if (request.readyState === 4) {
						log('FileTransfer ->', 'download', '<<< DONE (' + source + ')');
						successCallback(request.responseText);
					}
				};
				request.send();
			},
			abort: function() {
				log('FileTransfer ->', 'abort');
			}
		};
	});

}());
