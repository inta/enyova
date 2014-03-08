enyo.kind({
	name: 'my.MainView',

	classes: 'enyo-fit',

	handlers: {
		ontap: 'navigate',
		onNavigateBack: 'navigate'
	},

	components: [
		{name: 'panels', kind: 'my.PanelsView'}
	],

	navigate: function(inSender, inEvent) {
		var targetPanel = inEvent.targetPanel || inEvent.originator.targetPanel;

		if (targetPanel) {
			if (!inEvent.navigateBack) {
				this.app.history.push(this.$.panels.getActive().kind);
			}

			this.$.panels.show(targetPanel);
		}

		return true;
	}
});
