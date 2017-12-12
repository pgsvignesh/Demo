({
    createLead : function(component,newLead){ 
        alert('method created + '+ newLead);
        var action = component.get("c.saveLead");
        action.setParams({
            "currLead": component.get("v.newLead")
        }); 
        action.setCallback(this, function(a) {
            alert(a.getReturnValue().Company);
            component.set("v.newInsertedLead", a.getReturnValue());
        });
        $A.enqueueAction(action);
    }
})