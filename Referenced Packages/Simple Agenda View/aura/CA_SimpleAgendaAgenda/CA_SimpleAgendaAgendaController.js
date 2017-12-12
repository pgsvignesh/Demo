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
//		console.log('rendeting');
		//helper.setScrolling(component);
	},

	goLeft : function(component, event, helper){
		helper.beforeAfter(component, -1);
	},

	goRight : function(component, event, helper){
		helper.beforeAfter(component, 1);
	},
	doScroll : function(component, event, helper){
        if (helper.checkNoScroll(component)) {
            return;
        }
		helper.startScrolling(component, event);
	},
	evtOpenDetails : function(component, event, helper){
		helper.openDetails(component, event);
		/*setTimeout(function(){
			
		}, 50);*/
		
	},


})