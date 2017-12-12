({
    myAction : function(component, event, helper) {
        alert('Called');
        var action = component.get("c.getContacts");
        action.setCallback(this, function(data) {
            component.set("v.contacts", data.getReturnValue());
        });
        $A.enqueueAction(action);
        
        
    }
})