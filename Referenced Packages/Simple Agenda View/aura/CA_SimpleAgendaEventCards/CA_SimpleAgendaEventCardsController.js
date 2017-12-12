({
	detailEvent : function(component, event, helper){
		var oEvt = $A.get("e.force:navigateToSObject");
		if (oEvt) {
			var sId = event.getSource ? event.getSource().get('v.data-evt') : event.target.dataset.evt;
			oEvt.setParams({
				"recordId" : sId,
				"slideDevName" : "related"
			});
			oEvt.fire();
		} else {
			//$A.createComponent(''
		}
	},

	openClose : function(component, event, helper){
		var oEl = event.getSource ? event.getSource().getElement() : event.target,
			oParent = oEl.parentNode.parentNode.parentNode.parentNode,
			bOpen = !oParent.classList.contains('_open');
		$A.util.toggleClass(oParent, '_open');
		
		if (bOpen) {
			var oEvent = component.getEvent("evtOpenDetails");
			oEvent.setParam('element', oParent);
			oEvent.fire();
		}
	},

})