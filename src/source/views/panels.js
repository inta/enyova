enyo.kind({
	name: 'my.PanelsView',

	kind: 'Panels',
	classes: 'enyo-fit panels',
	draggable: false,

	components: [
		{
			name: 'panel1',
			components: [
				{content: 'Panel 1'},
				{kind: 'Button', content: 'Go to panel 2', targetPanel: 'panel2'}
			]
		},
		{
			name: 'panel2',
			components: [
				{content: 'Panel 2'},
				{kind: 'Button', content: 'Go to panel 1', targetPanel: 'panel1'}
			]
		}
	],

	panelExists: function(name) {
		var panels = this.getPanels();

		for (var i = 0, panel; i < panels.length, panel = panels[i]; i++) {
			if (panel.name === name) {
				return true;
			}
		}

		return false;
	},

	show: function(kindName) {
		var name = kindName.split('.').pop().toLowerCase();

		if (this.getActive().kind === kindName) {
			return;
		}

		if (!this.panelExists(name)) {
			var newPanel = this.createComponent({kind: kindName});
			name = newPanel.name;
			this.render();
		}

		this.selectPanelByName(name);
	}
});
