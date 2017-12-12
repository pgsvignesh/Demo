({
    createExpense: function(component, currCase) {
        console.log("IN HELPER:" +JSON.stringify(currCase));
        var action = component.get("c.saveCase");
        action.setParams({
            "currCase": JSON.stringify(currCase)
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                
                var currCases = component.get("v.newCase");
                //expenses.push(response.getReturnValue());
                component.set("v.newCase", currCases);
                var toastEvent = $A.get("e.force:showToast");                
                toastEvent.setParams({                    
                    "title": "Success!",                    
                    "message": "The case has been created Successfully!."                    
                });                
                toastEvent.fire();                
                $A.get('e.force:refreshView').fire();                
            }
            if (state === "FAILURE"){
                console.log('Failure');
            }
        });
        $A.enqueueAction(action);
    }
})