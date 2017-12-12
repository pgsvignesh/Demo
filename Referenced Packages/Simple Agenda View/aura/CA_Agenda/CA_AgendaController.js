({
	doInit: function(component, event, helper) {
		console.log('start');
		helper.init(component);
	},
	goLeft : function(component, event, helper){
		helper.changeDate(component, '-1');
	},
	goRight : function(component, event, helper){
		helper.changeDate(component, '+1');
	},
	goChangeDate : function(component, event, helper){
		var oInput = component.find('curDate');
		helper.changeDate(component, oInput.get('v.value'));
		//console.log('changeDate!' + oInput.val());
	},
	detailEvent : function(component, event, helper){

		var oEvt = $A.get("e.force:navigateToSObject");
		if (oEvt) {
			var sId = event.getSource ? event.getSource().get('v.evt') : event.target.dataset.evt;
			oEvt.setParams({
				"recordId" : sId,
				"slideDevName" : "related"
			});
			oEvt.fire();
		} else {
			//$A.createComponent(''
		}
	},


/*	doRefresh : function(component, event, helper){
		console.log('refresh');
	},*/

	/*today : function(component, event, helper){
		var oInput = component.find('curDate'),
			dNow = new Date(),
			sNow = dNow.toISOString();
		oInput.set('v.value', sNow)
		helper.changeDate(component, sNow);
	},*/

	changeEventDate : function(component, event, helper){
		console.log('-- ' + event.getParam('date'));
		helper.changeDate(component, event.getParam('date'));
	},

	create : function(component, event, helper){
		helper.create(component, event);
	},

	reload : function(component, event, helper){
		helper.reload(component);
	},

	showCalendar : function(component, event, helper){
		var sMode = component.get('v._monthCalendar');
		console.log(sMode);
		component.set('v._monthCalendar', sMode == 'calendar' ? '' : 'calendar');
	},
/*	refreshEvents : function(component, event, helper){
		console.log('refresh', event);
	}*/
	/*changeMode : function(component, event, helper){
		component.set('v.displayMode', 'day');
	},*/



})