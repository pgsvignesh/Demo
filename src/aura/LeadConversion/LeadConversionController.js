({
        doInit  : function(component, event, helper){
       // alert('In Lead Client Side controller');
		helper.getLeadData(component, event);		 
	},
    redirect : function(component, event, helper) {
	//Find the text value of the component with aura:id set to "redirctURL"
    var url = component.get("v.redirect");
    var urlEvent = $A.get("e.force:navigateToURL");
    urlEvent.setParams({ 
      "url": url
    });
    urlEvent.fire();
	},

})