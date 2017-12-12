({ 
    doInit : function(component, event, helper){
     var dt    = new Date();       // current date        
     var month = dt.getMonth();    // current month
     var day   = dt.getDate();     // current day
     var year  = dt.getFullYear(); // current year
                
     component.set("v.current_date", new Date(year, month, day));
     component.set("v.loadedScript", true);
     
     helper.loadCalendar(component, helper);   
    },
 
    /*Only for triangles*/
    showNextMonth: function(component, event, helper){
        component.set('v.isSpinnerGeneric', true);
        component.set('v.nextMonth', true);
        helper.getNextMonth(component); 
    },
    showPrevMonth: function(component, event, helper){
        component.set('v.isSpinnerGeneric', true);
        component.set('v.prevMonth', true);
        helper.getPrevMonth(component); 
    }  
})