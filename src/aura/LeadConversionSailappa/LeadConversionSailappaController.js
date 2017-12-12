({

    refreshRecord : function(component, event, helper) {       

        $A.get('e.force:refreshView').fire();

    },

    editRecord : function(component, event, helper) {

        var editRecordEvent = $A.get("e.force:editRecord");

        editRecordEvent.setParams({

             "recordId": component.get("v.recordId")

       });

       editRecordEvent.fire();    

    }

})