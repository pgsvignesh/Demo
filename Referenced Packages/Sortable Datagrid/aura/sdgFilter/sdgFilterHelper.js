({
    
    getERLPicklist: function(component) {
        var action = component.get("c.getPicklistOptions");
        action.setParams({
            "SDGFieldID": component.get("v.SDGField.Id")
        });
        
        //Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) {
            results = JSON.parse(actionResult.getReturnValue());
            component.set("v.picklistvalues", results);     
        });
        $A.enqueueAction(action);
    },
    getLabels: function(component)
    {
        debugger;
        this.getLabel(component,"sdgEquals");
        this.getLabel(component,"sdgNotEquals");
        this.getLabel(component,"sdgStarts");
        
        this.getLabel(component,"sdgEnds");
        this.getLabel(component,"sdgContains");
        this.getLabel(component,"sdgNotContains");
        
        this.getLabel(component,"sdgAfter");
        this.getLabel(component,"sdgBefore");
        this.getLabel(component,"sdgTomorrow");
        
        this.getLabel(component,"sdgToday");
        this.getLabel(component,"sdgYesterday");
        this.getLabel(component,"sdgNextWeek");
        
        this.getLabel(component,"sdgThisWeek");
        this.getLabel(component,"sdgLastWeek");
        this.getLabel(component,"sdgNextMonth");
        this.getLabel(component,"sdgLastMonth");
        
        this.getLabel(component,"sdgThisMonth");
        this.getLabel(component,"sdgNextQuarter");
        this.getLabel(component,"sdgThisQuarter");
        this.getLabel(component,"sdgLastQuarter");
        this.getLabel(component,"sdgNextYear");
        this.getLabel(component,"sdgThisYear");
        this.getLabel(component,"sdgLastYear");
        this.getLabel(component,"sdgTrue");
        this.getLabel(component,"sdgFalse");
        
        this.getLabel(component,"sdgGreaterThan");
        this.getLabel(component,"sdgLessThan");
    },
    getLabel: function(component,labelname)
    {
        debugger;
        var namespace = "sortablegrid";
        var ret = $A.get("$Label." + namespace + "." + labelname);
        if (ret == "[" + namespace + "." + labelname + "]")
        {
            //try it with no namespace
            ret = $A.get("$Label.c." + labelname)
        }
        component.set("v." + labelname,ret);
    },
    fireUpdate: function(component, paramvalue, paramoperator)
    {
        
        if (paramvalue!=null)
        {
            var compEvent = component.getEvent("SDGFilterUpdate");
            compEvent.setParams({"SDGFieldID" : component.get("v.SDGField").ID,
                                 "FilterOperator": paramoperator,
                                 "FilterValue": paramvalue
                                });
            compEvent.fire(); 
        }
    }
})