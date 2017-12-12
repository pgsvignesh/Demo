({
  getExpenses: function(component) {
        var action = component.get("c.getContacts");      	
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                alert('Inside the helper');
                component.set("v.contacts", response.getReturnValue());   
                alert('v.contacts'+response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
  },
    createContact: function(component,contact){
    	var action = component.get("c.saveContact");
        action.setParams({ 
            "currContact": contact
        });
         action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                alert('Inside the helper');
                component.set("v.contacts", response.getReturnValue());   
                alert('v.contacts'+response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        
    }
  })