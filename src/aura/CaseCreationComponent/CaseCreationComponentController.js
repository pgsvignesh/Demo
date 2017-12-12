({
   openModel: function(component, event, helper) {    
         var action = component.get("c.createCase");        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('the response is'+response.getReturnValue());            
                var resposeCase = JSON.parse(response.getReturnValue());                
                console.log("Parse response " + JSON.stringify(resposeCase));
                component.set("v.newCase", resposeCase);
                component.set("v.myRecordId", resposeCase.Id);
                console.log("Parse response " + resposeCase.Id);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        
        // Send action off to be executed
        $A.enqueueAction(action);
       component.set("v.isOpen", true);
   },
    // Load expenses from Salesforce
    
    clickCreate: function(component, event, helper) {       
        var newCase = component.get("v.newCase");
        console.log("Create expense: " + JSON.stringify(newCase));
        helper.createExpense(component, newCase);
 		component.set("v.isOpen", false);        
    },
    clickCancel: function(component, event, helper) {
        var newCase = component.get("v.newCase");
        var action = component.get("c.deleteCase");
         component.set("v.isOpen", false);
        console.log("Delete expense: " + JSON.stringify(newCase));
        
        action.setParams({
            "currCase": JSON.stringify(newCase)
        });
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {                      
                //var resposeCase = JSON.parse(response.getReturnValue());            
                component.set("v.newCase",JSON.parse(response.getReturnValue()) );            
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },
    handleUploadFinished: function (cmp, event) {
        // Get the list of uploaded files
        var uploadedFiles = event.getParam("files");
        //alert("Files uploaded : " + uploadedFiles.length);
    }


})