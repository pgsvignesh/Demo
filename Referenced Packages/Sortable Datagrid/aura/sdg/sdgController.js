({
    doInit : function(component, event, helper) {    
        //Fetch the config and data from SFDC
        helper.getSDG(component);
        component.set("v.SVGName", component.get("v.NewSVGName"));
        $A.util.removeClass(component.find("mainwrapper"), "SDGhidden"); 
    } ,
    setTitle :function(component, event, helper){
        var newTitle = component.get('v.Title');
        var FilteredCount = component.get('v.FilteredCount');
        var UnfilteredCount = component.get('v.UnfilteredCount');
        var RelationshipName = component.get('v.RelationshipName');
        if (FilteredCount!=UnFilteredCount)
        {
            newTitle = newTitle + ' ' + component.get("v.sdgFiltered") + ': ' + component.get("v.FilteredCount") + '&nbsp;' + component.get("v.sdgFilteredOf") + component.get("v.UnfilteredCount");
            
        }
        else
        {
            newTitle = newTitle + ' (' + component.get("v.UnfilteredCount") + ')' ;
        }
        component.set("v.TitleName", newTitle);
        
    },   
    
    paging: function(component, event, helper)
    {
        component.set("v.isPaging", true);
        helper.getResponseData(component);
    },
    CollapseView : function(component, event, helper)
    {
        component.set("v.isCollapsed", true);
        component.set("v.ShowFilters", false);
        var datapanel = component.find("datapanel");
        $A.util.addClass(datapanel, 'slds-hide');
        var footerpanel = component.find("footerpanel");
        $A.util.addClass(footerpanel, 'slds-hide');
    },
    ExpandView : function(component, event, helper)
    {
        component.set("v.isCollapsed", false);
        var datapanel = component.find("datapanel");
        $A.util.removeClass(datapanel, 'slds-hide');
        var footerpanel = component.find("footerpanel");
        $A.util.removeClass(footerpanel, 'slds-hide');
    },
    CreateNew: function(component, event, helper)
    {
        var navEvt = $A.get("e.force:createRecord");
        
        var objname = component.get("v.SDG").sObjectName;
        navEvt.setParams({
            "entityApiName": objname,
            "recordTypeId" : null
        });
        
        navEvt.fire();
    },
    reload: function(component, event, helper)
    {
        debugger;
        component.set('v.reloadseed', Date.now());
        helper.getResponseData(component);
        
    },  
    filterUpdated: function(component, event, helper)
    {
        component.set("v.ShowSDGError", false);
        var filters = component.get("v.SDGFilters");
        var filterlistlength = filters.length;
        var newfilters = [];
        var newSDGFieldID = event.getParam("SDGFieldID");
        
        // create a map to deduplicate here...
        for (var i = 0; i < filterlistlength; i++) {
            if (filters[i].SDGFieldID!=newSDGFieldID)
            {
                newfilters.push(filters[i]);
            }
        }
        
        //Add the new value:
        var newfilter = {
            "FilterValue" : event.getParam("FilterValue"),
            "FilterOperator" : event.getParam("FilterOperator"),
            "SDGFieldID": event.getParam("SDGFieldID")
        }
        newfilters.push(newfilter);
        component.set("v.SDGFilters",newfilters);
        console.warn('filters updated'); 
        helper.getResponseData(component);
    },
    sort: function(component, event, helper)
    {
        component.set("v.SortColumn", event.getParam("SDGFieldID"));
        component.set("v.SortOrder", event.getParam("SortOrder"));
        helper.getResponseData(component);
        
    },
    ShowSDG: function(component, event, helper)
    {
        
    },
    ShowAll: function(component, event, helper)
    {
        if (component.get("v.RelationshipName")!='')
        {
            var navEvt = $A.get("e.force:navigateToRelatedList");
            navEvt.setParams({
                "relatedListId": component.get("v.RelationshipName"),
                "parentRecordId": component.get("v.recordId")
            });
            
            navEvt.fire();
        }
        else
        {
            
            
            helper.showtoast( 'Show All', 'Cannot \'Show All\' for custom relationships - try changing page size to view more data');
        }
        
    },
    ToggleFilters: function(component, event, helper)
    {
        
        //Determine whether to show the filters:
        debugger;
        var FiltersSet = component.get("v.SDGFiltersDefinition");
        if(FiltersSet.length==0)
        {
            var SDGObject = component.get("v.SDG"); 
            component.set("v.SDGFiltersDefinition", SDGObject.SDGFields); 
        }  
        
        var newvalue = !component.get("v.ShowFilters");
        var cmpTarget = component.find('FilterToggle');
        
        if (newvalue)
        {
            $A.util.addClass(cmpTarget, 'slds-is-selected');
            $A.util.removeClass(cmpTarget, 'slds-not-selected');
        }
        else
        {
            $A.util.removeClass(cmpTarget, 'slds-is-selected');
            $A.util.addClass(cmpTarget, 'slds-not-selected');
        }
        component.set("v.ShowFilters", newvalue);
    },
    
    NavigateToObj : function(component, event, helper) {    
        debugger;
        var objID = event.currentTarget.getAttribute("data-objid")
        
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": objID
        });
        navEvt.fire();
    },
    RaiseListEvent : function(component, event, helper) {    
        debugger;
        var menuItem = event.detail.menuItem;
        var actionid = menuItem.get("v.value");
        //var label = event.currentTarget.getAttribute("data-eventlabel");
        //var source = event.getSource();
        //var label = source.get("v.label");
        var event;
        //Get data from array
        var actions = component.get("v.SDG.SDGActions");
        var opts = [];
        for (var i = 0; i < actions.length; i++) {
            if (actions[i].Id==actionid)
            {
                event = actions[i]; 
            }   
            
        }
        
        if (event!=null)
        {
            var navEvt = $A.get(event.Event);
            if (navEvt==null)
            {
                helper.showtoast( 'Error', 'Invalid event name - cannot identify event');
            }
            else
            {
                var payload = event.Payload;
                payload = payload.replace("#parentrecordId#", component.get('v.recordId'));
                var payloadobj = JSON.parse(payload);
                
                navEvt.setParams(payloadobj);
                console.warn('About to fire list event: ' + JSON.stringify(navEvt));
                navEvt.fire();
            }
        }
    },
    
    RaiseRowEvent : function(component, event, helper) {    
        
        var menuItem = event.detail.menuItem;
        var valuesString = menuItem.get("v.value");
        var values = valuesString.split(',');
        //var label = event.currentTarget.getAttribute("data-eventlabel");
        var actionid = values[0];
        var rowID = values[1];
        //var rowID = event.currentTarget.getAttribute("data-rowID");
        var event;
        //Get event data from array
        var actions = component.get("v.SDGRowActions");
        
        for (var actionkey in actions) {
            var action = actions[actionkey];
            if  (action.Id== actionid)
            {
                event = action; 
            }      
        }
        
        if (event!=null)
        {
            //get the data row:
            var allrows = component.get("v.processeddata"); 
            var selectedrow;
            for (var key in allrows)
            {
                var datarow = allrows[key];
                if (datarow.rowID == rowID) 
                {
                    selectedrow = datarow;
                }
            }
            if (event.Event=='')
            {
                //This is an internal event
                
            }
            debugger;
            var navEvt = $A.get(event.Event);
            if (navEvt==null)
            {
                helper.showtoast( 'Error', 'Invalid event name - cannot identify event');
            }
            else
            {
                var payload = event.Payload;
                
                
                //now do find replace on everything
                
                for (var fieldkey in selectedrow.data) {
                    var field = selectedrow.data[fieldkey];
                    payload = payload.replace("#" + field.Path + "#", field.label);
                } 
                
                //And finally for the plain id
                payload = payload.replace("#Id#", rowID);
                
                var payloadobj = JSON.parse(payload);
                
                navEvt.setParams(payloadobj);
                console.warn('About to fire row event: ' + JSON.stringify(navEvt));
                navEvt.fire();
            }
        }
        //return false; //to prevent other behaviours on redirects...
    }, 
})