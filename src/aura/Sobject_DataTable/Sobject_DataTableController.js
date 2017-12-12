({
 init : function(component, event, helper) {
        var action = component.get("c.fetchRecords");
        action.setParams({SobjectAPIName:component.get("v.SobjectName")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
 component.set("v.lstSobjectData", result.lstSobjectData);
                component.set("v.lstFieldApiNames", result.lstFieldApiNames);
                component.set("v.lstFieldLabels", result.lstFieldLabels);
                
                setTimeout(function(){ $('#example').DataTable(); }, 500);
            }
            else if (state === "ERROR") {
                $A.log("Errors", a.getError());
            }
        });
        $A.enqueueAction(action);
 },
     showSpinner : function (component, event, helper) {
        var spinner = component.find('spinner');
        var evt = spinner.get("e.toggle");
        evt.setParams({ isVisible : true });
        evt.fire();    
    },
    hideSpinner : function (component, event, helper) {
       var spinner = component.find('spinner');
       var evt = spinner.get("e.toggle");
       evt.setParams({ isVisible : false });
       evt.fire();    
    }
})