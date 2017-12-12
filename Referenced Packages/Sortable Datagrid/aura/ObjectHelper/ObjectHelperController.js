({

    handleevtObjectManager : function(component, event, helper) {
        debugger;
        var action = event.getParam("Action").toLowerCase();
        component.set("v.CoreEvent", event.getParams());
        
        if (action == 'create')
        {
             console.warn('handling create action');
            component.set("v.sObjectType", event.getParam("sObjectType"));
            //Now get data on the record types:
            helper.GetRecordTypes(component, event.getParam("sObjectType"));
            
         
        }
        
        if (action == 'delete')
        {
            console.warn('handling delete action'); 
            $A.util.removeClass( component.find("deletedialog"), "slds-hide");
        }
    },
    
    cancel : function(component, event, helper) {
        
        $A.util.addClass( component.find("createdialog"), "slds-hide");
        $A.util.addClass( component.find("deletedialog"), "slds-hide");
        
    },
    handledelete : function(component, event, helper) {
        var coreevent = component.get("v.CoreEvent");
        debugger;
        helper.doDelete(component, coreevent.sObjectID );
        
        $A.util.addClass( component.find("deletedialog"), "slds-hide");
        
    },
    setRecordTypeID : function(component, event, helper) {
        debugger;
        var label = event.getSource().get("v.text");
        var rts = component.get("v.Options");
        var rtid;
        
 
        
        for (var rtkey in rts)
        {
            var rt = rts[rtkey];
            if (rt.Name == label)
            {
                rtid = rt.Value; 
            }
        }
        component.set("v.rtid", rtid);
    },
    
    create : function(component, event, helper) {
       
        helper.doCreate(component);
        
    }
    
    
})