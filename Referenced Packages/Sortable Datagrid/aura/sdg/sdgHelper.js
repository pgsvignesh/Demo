({
    
    getSDG: function(component) {
        var d1 = new Date();
        this.Waiting(component);
        var action = component.get("c.GetSDGInitialLoad");
        action.setStorable();
        action.setParams({
            "ParentRecordID": component.get("v.recordId"),
            "RelationshipName": component.get("v.RelationshipName"),
            "FieldSetName": component.get("v.FieldSetName"),
            "SDGTag": component.get("v.SDGTag"), 
        });
        action.setAbortable();
        //set up the paging:
        component.set("v.isPaging", false);
        
        //Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) {
            
            if (actionResult.getState() =='SUCCESS')
            {
                console.log('retrieved data - success');
                var results = JSON.parse(actionResult.getReturnValue());
                console.log(actionResult.getReturnValue());
                if (results!=null)
                {
                    if (results.isError)
                    {
                        component.set("v.ShowSDGError", true);
                        component.set("v.ErrorMessage", results.ErrorMessage);
                        console.error(results.ErrorMessage);
                    }
                    else
                    {
                        
                        component.set("v.SDG", results.SDGObject);
                        
                        if (results.SDGObject.SDGActions!=null)
                        {
                            var listsize = results.SDGObject.SDGActions.length;
                            var listactions = [];
                            var rowactions=[];
                            
                            for (var i = 0; i < listsize; i++) {
                                if (results.SDGObject.SDGActions[i].Type=='List')
                                {
                                    listactions.push(results.SDGObject.SDGActions[i]);
                                }
                                else
                                {
                                    rowactions.push(results.SDGObject.SDGActions[i]);
                                }
                            }
                            
                            component.set("v.SDGListActions", listactions);
                            component.set("v.SDGRowActions", rowactions);
                        }
                        
                        component.set("v.isLoaded", true);
                        this.handleResults(component, results.Results);
                        
                    }
                }
                else
                {
                    component.set("v.ShowSDGError", true);
                    console.warn('Cannot load configuration data:  Please reconfigure the component in the designer.');
                }
            }
            else
            {
                console.log('retrieved data - error');
                this.handleError(actionResult);
                
            }
        });
        
        console.warn('about to enqueue initial load' + d1.getTime());
        
        
        $A.enqueueAction(action);
        
    },
    Waiting: function(component)
    {
        var table = component.find("resulttable");
        $A.util.addClass(table, "slds-no-row-hover");
        $A.util.addClass(table, "working");
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
    },
    showtoast: function( title, message)
    {
        var navtoast = $A.get("e.force:showToast");
        navtoast.setParams({
            "title": title,
            "message": message
        });
        
        navtoast.fire();
    },
    DoneWaiting: function(component)
    {
        var table = component.find("resulttable");
        $A.util.removeClass(table, "slds-no-row-hover");
        $A.util.removeClass(table, "working"); 
        
        var spinner = component.find("spinner");
        $A.util.addClass(spinner, "slds-hide");
    },
    GetCaseInsensitiveAttr: function(obj, propname)
    {
        var propvalue;
        propname = (propname + "").toLowerCase();
        for(var p in obj){
            if(obj.hasOwnProperty(p) && propname == (p+ "").toLowerCase()){
                propvalue= obj[p];
                break;
            }
        }
        return propvalue;
    },
    handleResults: function(component, resultsobj)
    {
        console.log(resultsobj.query);
        if (resultsobj.isError)
        {
            
            component.set("v.ShowSDGError", true);
            component.set("v.ErrorMessage", resultsobj.ErrorMessage);
            console.error(resultsobj.ErrorMessage);
            
            this.DoneWaiting(component);
            this.showtoast('', resultsobj.ErrorMessage);
        }
        else
        {
            var sdgAgo = component.get("v.sdgAgo");
            var sdgIn = component.get("v.sdgIn");
            var d1 = new Date();
            
            //Now process the data into a list of data:
            var fields = component.get("v.SDG.SDGFields");
            var fieldlistlength = fields.length;
            var dateNow = Date.now();
            
            
            
            var rows = [];
            var dataurl;
            
            var payload= resultsobj.data;
            console.log('Payload: ');
            console.log(payload);
            for (var key in payload)
            {
                var datarow = payload[key];
                console.log('processing datarow:')
                console.log(datarow);
                
                var row=[];
                dataurl = '';
                for (var i = 0; i < fieldlistlength; i++) {
                    var field = fields[i];
                    var fieldparts = field.ColumnName.split(".");
                    
                    //Walk the delimited bit
                    var datavalue = datarow; 
                    var dataid = null;
                    for (var z = 0; z < fieldparts.length; z++) {
                        
                        //Check for the id first so I don't need to walk back up tree
                        if ((fieldparts[z]).toLowerCase()=='name')
                        {
                            dataid = this.GetCaseInsensitiveAttr(datavalue, 'Id');
                            field.FieldType='HYPERLINK';
                        }
                        else
                        {
                            dataid='';
                        }
                        
                        //Set the datavalue
                        datavalue =this.GetCaseInsensitiveAttr(datavalue, fieldparts[z]);
                        //datavalue =datavalue[fieldparts[z]]; 
                        if (typeof(datavalue)=='undefined')
                        {
                            console.log('Data value undefined for: ' + fieldparts[z]);
                            datavalue='';
                        }
                    }
                    
                    if (field.FieldType=='DATETIME')
                    {
                        var dateRecord = Date.parse(datavalue);
                        datavalue=$A.localizationService.formatDateTime(dateRecord);
                        //field.FieldType='STRING';
                    }
                    if (field.FieldType=='DATE')
                    {
                        var dateRecord = Date.parse(datavalue);
                        datavalue=$A.localizationService.formatDate(dateRecord);    
                        //field.FieldType='STRING';
                    }
                    if (field.FieldType=='PHONE')
                    {
                        dataurl = "tel:" + datavalue;   
                    }
                    if (field.FieldType=='EMAIL')
                    {
                        dataurl = "mailto:" + datavalue;   
                    }
                    if (field.FieldType=='URL')
                    {
                        dataurl =  datavalue;   
                    }
                    //Custom rendering
                    if (field.FieldStyle=='Hyperlink')
                    {
                        dataid = datavalue;
                        datavalue='View';
                        //Required to make it into a hyperlink
                        field.FieldType='HYPERLINK';
                    }
                    //Custom rendering
                    if (field.FieldStyle=='RawHTML')
                    {
                        //Required to make it into a hyperlink
                        field.FieldType='RawHTML';
                        field.FieldType='RawHTML';
                    }
                    //Custom rendering
                    if (field.FieldStyle=='Age')
                    {
                        
                        
                        var dateRecord = Date.parse(datavalue);
                        var dur = $A.localizationService.duration((dateNow-dateRecord)/(1000*60*60*24), 'd');
                        datavalue = $A.localizationService.displayDuration(dur);
                        if ((dateNow-dateRecord)>0)
                        {
                            datavalue=sdgAgo.replace('{0}', datavalue);
                        }
                        else
                        {
                            datavalue=sdgIn.replace('{0}', datavalue);
                        }
                        
                        field.FieldType='STRING';
                    }
                    
                    row.push(
                        {"Path" : field.ColumnName,
                         "ObjId" :   dataid ,
                         "label" :  datavalue,
                         "FieldType" : field.FieldType,
                         "FieldLabel" : field.Label + ': ',
                         "url" : dataurl
                        });
                    
                }
                
                //add to array
                rows.push({"rowID": datarow["Id"],
                           "data": row});
                
                
            }
            
            component.set("v.FilteredCount", resultsobj.filteredrowcount);
            
            if (component.get("v.UnfilteredCount")==null)
            {
                component.set("v.UnfilteredCount", resultsobj.fullrowcount);    
            }
            
            console.info("Query returns: " + resultsobj.filteredrowcount + " rows");
            
            //current page: 
            if(component.get("v.isPaging")==false)
            {
                var opts = [];
                for (i = 0; i < resultsobj.pagecount; i++) { 
                    opts.push({label: i+1, value: i+1});
                }
                //Bind to the component
                //component.find("PagerPage").set("v.options", opts);
                component.set("v.Pages",opts);
                component.find("PagerPage").set("v.value", "1");
            }
            component.set("v.isPaging", false);
            component.set("v.processeddata", rows);
            
            //Now set title:
            var newTitle = component.get('v.Title');
            var FilteredCount = component.get('v.FilteredCount');
            var UnfilteredCount = component.get('v.UnfilteredCount');
            var RelationshipName = component.get('v.RelationshipName');
            if (FilteredCount!=UnfilteredCount)
            {
                newTitle = newTitle + ' ' + component.get("v.sdgFiltered") + ': ' + component.get("v.FilteredCount") + ' ' + component.get("v.sdgFilteredOf") + ' ' + component.get("v.UnfilteredCount");
                
            }
            else
            {
                newTitle = newTitle + ' (' + component.get("v.UnfilteredCount") + ')' ;
            }
            component.set("v.TitleName", newTitle);
            
            this.DoneWaiting(component);
            
            
        }
    },
    /* getLabels: function(component)
    {
        debugger;
        //component.set("v.sdgView_All",$A.get("$Label.c.sdgView_All"));
        this.getLabel(component,"sdgView_All");
        this.getLabel(component,"sdgAgo");
        this.getLabel(component,"sdgIn");
        this.getLabel(component,"sdgFiltered");
        this.getLabel(component,"sdgFilteredOf");
        this.getLabel(component,"sdgNoData");
        this.getLabel(component,"sdgPage");
        this.getLabel(component,"sdgPage_Size");
    
    },
    getLabel: function(component,labelname)
    {
        var namespace = "sortablegrid";
        var ret = $A.get("$Label." + namespace + "." + labelname);
        //if (ret == "[" + namespace + "." + labelname + "]")
        //{
        //    //try it with no namespace
        //    ret = $A.get("$Label.c." + labelname)
        }
        component.set("v." + labelname,ret);
    },*/
    handleError: function(ajaxresult)
    {
        var errors = ajaxresult.getError();
        
        if (errors) {
            
            if (errors[0] && errors[0].message) {
                this.showtoast('Error', 'An unhandled error occurred in the AJAX call: ' + errors[0].message);
                
            }
        }
    },
    getResponseData: function(component) {
        this.Waiting(component);
        var action = component.get("c.getSDGResult");
        action.setStorable();
        debugger;
        var request = {
            "RelationshipName": component.get("v.RelationshipName"),
            "FieldSetName": component.get("v.FieldSetName"),
            "SDGTag": component.get("v.SDGTag"), 
            "ParentRecordID": component.get("v.recordId"),
            "PageID" : parseInt(component.find('PagerPage').get("v.value")),
            "Filters" : component.get("v.SDGFilters"),
            "PageSize":parseInt(component.find('PagerSize').get("v.value")),
            "SortOrder": component.get("v.SortOrder"),
            "SortColumn": component.get("v.SortColumn"),
            "reloadseed": component.get("v.reloadseed")
        }
        
        action.setParams({
            "jsonrequest": JSON.stringify(request)
        });
        
        //console.warn(JSON.stringify(request));
        
        //Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) {
            if (actionResult.getState()=="SUCCESS")
            {
                var resultobj = JSON.parse(actionResult.getReturnValue());
                //test
                this.handleResults(component, resultobj);
                
            }
            else
            {
                this.handleError(actionResult); 
            }
        });
        
        $A.enqueueAction(action);
    },
    
    
})