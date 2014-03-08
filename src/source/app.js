enyo.kind({
	name: 'my.Application',

	kind: 'enyo.Application',
	view: 'my.MainView',
	// autoStart: false,
	renderOnStart: false,

	events: {
		onNavigateBack: ''
	},

	// observers: {
	// 	appViewReady: ['viewReady']
	// },

	history: [],

	components: [
		{
			kind: 'Signals',
			ondeviceready: 'deviceReady',
			// onpause: 'pause',
			// onresume: 'resume',
			onbackbutton: 'backbutton'
		}
	],

	// start: function() {
	// 	this.inherited(arguments);
	// },

	// appViewReady: function() {},

	deviceReady: function() {
		this.render();
		enyo.job('hideSplashScreen', navigator.splashscreen.hide, 500);
	},

	// pause: function() {},

	// resume: function() {},

	backbutton: function() {
		if (this.history.length > 0) {
			this.waterfallDown('onNavigateBack', {
				navigateBack: true,
				targetPanel: this.history.pop()
			});
		}
	}
});

enyo.ready(function() {
	// enyo.setLogLevel(0);
	new my.Application({name: 'app'});
});
