({
    doInit : function(component, event, helper) {
       //Update expense counters
       alert('Called do int');      
       helper.getExpenses(component);
        
    },
    createContact : function(component, event, helper) {
        alert('inside create Contact');
    var lastNameComponent = component.find("name");
   var lastName = lastNameComponent.get("v.value");
     alert('the last name value is '+lastName); 
   if (lastName == ''){
       lastNameComponent.set("v.errors", [{message:"Please enter the Last Name"}]);
    }
    else {
        lastNameComponent.set("v.errors", null);
        var newContact = component.get("v.newContact");
        helper.createContact(component, newContact);
    }
	}
})