({
    doInit : function(component, event, helper) {    
        debugger;
        var FilterType = component.get("v.SDGField").FilterType;
  
        helper.getLabels(component);
        var pref = component.get("v.SDGField").Preferences;
        //suppress any exceptions during preference setting:
        try
        {
            debugger;
            if (pref!=null)
            {
                component.set("v.FilterOperatorPreference", pref.FilterOperator);
                component.set("v.FilterValuePreference", pref.FilterValue);
                if (FilterType=='DATE' || FilterType=='DATETIME')
                {
                    debugger;
                    if (pref.FilterValue!="")
                        component.set("v.DateValue", pref.FilterValue);
                }
            }
            else
            {
                component.set("v.FilterValuePreference", null);
            }
            
        }
        catch(err)
        {
            //Suppress errors in setting preferences
        }
        
        if (FilterType=='DATE' || FilterType=='DATETIME')
        {
            component.set("v.isDate", true);   
        } 
        if (FilterType=='INTEGER' || FilterType=='DOUBLE' || FilterType=='CURRENCY')
        {
            component.set("v.isNumber", true);   
        } 
        if (FilterType=='ID' || FilterType=='STRING' || FilterType=='EMAIL' ||  FilterType=='URL' || FilterType=='PHONE')
        {
            component.set("v.isString", true);   
        }        
        
    },
    
    updateString : function(component, event, helper)
    {
        
        var value = component.find("StringField").get("v.value");
        
        var operator =     component.find("StringOperatorField").get("v.value");
        
        helper.fireUpdate(component, value, operator);
    },
    updateCheckbox: function(component, event, helper)
    {
        var value = component.find("CheckboxField").get("v.value");
        
        helper.fireUpdate(component, value, '');
    },
    updateDate: function(component, event, helper)
    {
        var value = component.find("DateField").get("v.value");
        if (value ==null)
            value = '';
        var operator =  component.find("DateOperatorField").get("v.value");
        
        helper.fireUpdate(component, value, operator);
    },
    updateNumber: function(component, event, helper)
    {
        var value = component.find("NumberField").get("v.value");
        var operator =     component.find("NumberOperatorField").get("v.value");
        
        helper.fireUpdate(component, value, operator);
    },
    updatePicklist: function(component, event, helper)
    {
        var value = component.find("PicklistField").get("v.value");
        
        helper.fireUpdate(component, value, '');
    }
    
    
})