public class ControlleurEvent {
    
    private ApexPages.StandardController controller;
    public String eventId{get;set;}
    public Event event{get;set;}    
    private String retURL{get;set;}
    public String startDate{get;set;}
    public String startHour{get;set;}
    public String endDate{get;set;}
    public String endHour{get;set;}
        
    public ControlleurEvent(ApexPages.StandardController stdController) {
        this.controller = stdController;
        event = (Event)stdController.getrecord();
        startDate = system.today().format();
        endDate = startDate;
        String hour = '0'+Datetime.now().time().hour();
        String minute = '0'+Datetime.now().time().minute();
        startHour = hour.right(2)+':'+minute.right(2);
        endHour = getEnd();
        retURL = ApexPages.currentPage().getParameters().get('retURL');
       // event.recordTypeId = ApexPages.currentPage().getParameters().get('RecordType');
        event.WhatId = ApexPages.currentPage().getParameters().get('what_Id');
                    
    }
     public String getEnd(){
        String[] hm = startHour.split(':');     
        Time t = Time.newInstance(Integer.valueOf(hm[0]), Integer.valueOf(hm[1]), 0, 0) ;
        Datetime dt = Datetime.newInstance(system.today(), t);
        String hourend = '0'+dt.addHours(1).time().hour().format();
        String minuteend = '0'+dt.addHours(1).time().minute().format();
        return hourend.right(2)+':'+minuteend.right(2);
     }
    
    public PageReference saving(){
        try{
            String[] d = startDate.split('/');
            Date myDate = Date.newInstance(Integer.valueOf(d[2]), Integer.valueOf(d[1]), Integer.valueOf(d[0]));
            String[] hm = startHour.split(':');  
            Time myTime = Time.newInstance(Integer.valueOf(hm[0]), Integer.valueOf(hm[1]), 0, 0);
            event.StartDateTime = DateTime.newInstance(myDate, myTime);
            
            d = endDate.split('/');
            myDate = Date.newInstance(Integer.valueOf(d[2]), Integer.valueOf(d[1]), Integer.valueOf(d[0]));
            hm = endHour.split(':');     
            myTime = Time.newInstance(Integer.valueOf(hm[0]), Integer.valueOf(hm[1]), 0, 0);
            event.EndDateTime = DateTime.newInstance(myDate, myTime);
            
        }
        catch(Exception e)
        {
            
        }
        
        PageReference eventPage = new ApexPages.StandardController(controller.getRecord()).view();
        eventPage.setRedirect(true);
        return eventPage;
    }
    
    public PageReference cancel(){
        return controller.cancel();
    }
}