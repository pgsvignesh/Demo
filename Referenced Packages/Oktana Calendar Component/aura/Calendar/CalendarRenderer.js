({  rerender: function(cmp, helper) {
    
    	this.superRerender();
   
    	var load = cmp.get('v.loadedScript');
    	var nextMonth = cmp.get('v.nextMonth');
    	var prevMonth = cmp.get('v.prevMonth');
        if (load) {
            helper.loadCalendar(cmp, helper);          
        }
        if (nextMonth) {
           helper.getNextMonthRender(cmp); 
		   cmp.set('v.nextMonth',false);
           
        }
        if (prevMonth) {
            helper.getPrevMonthRender(cmp); 
            cmp.set('v.prevMonth', false);
        }
        
	}
 
})