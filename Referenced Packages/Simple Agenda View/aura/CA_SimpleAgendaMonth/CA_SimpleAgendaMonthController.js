({
	doInit: function(component, event, helper) {
		helper.init(component);
	},

	recalculateItems : function(component, event, helper){
		var aEvents = component.get('v.events');
		helper.recalculateData(component, aEvents)
//		helper.setScrolling();
	},

	setMonthDate : function(component, event, helper){
		helper.setMonthDate(component, component.get('v.monthDate'));
//		helper.setScrolling();
	},

	doneRendering : function(component, event, helper){
		//helper.setScrolling();	
	},

	selectDate : function(component, event, helper){
		var nDay = event.getSource ? event.getSource().get('v.day') : event.currentTarget.dataset.day; //['day'];
		console.log(nDay);
		helper.selectDate(component, nDay);

	},
})