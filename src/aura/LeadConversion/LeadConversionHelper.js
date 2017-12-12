({   
    getLeadData : function(component, event){
        var action = component.get("c.getLeadData");
        action.setParams({
            "recordId": component.get("v.recordId")
        });
        // Register the callback function
        action.setCallback(this, function(response) {
            var lead = response.getReturnValue();
            //console.log('data: '+response));
            this.validate(component, event, lead); 
        });
        // Invoke the service
        $A.enqueueAction(action); 
    },
    validate : function(component, event, lead){       
                this.leadConvert(component, event);
         
    },
    leadConvert : function(component, event){  
        //alert('Inside lead convert');
        console.debug('Inside lead convert');
        var action = component.get("c.autoAccountOrOpportunityCreation");
        action.setParams({ 
            "leadId": component.get("v.recordId")
        });
        // Register the callback function
        action.setCallback(this, function(response) { 
            var result = "/"+ response.getReturnValue();
            console.log('result: '+result);            
            component.set("v.redirect",result);
            
        });
        // Invoke the service
        $A.enqueueAction(action); 
    }            
})