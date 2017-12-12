@isTest(seeAllData=false)
private class testEventsController_Ac{

@isTest static void eventFieldData(){ 
            Event evt = new Event();
            evt.Subject = 'Meeting';
            evt.Description = 'Issue des';
            evt.startdatetime = system.now();
            evt.EndDateTime  = system.now();
            evt.OwnerId = userinfo.getuserid();
             insert evt;
       
        
Test.startTest();
EventsController_Ac eventCpntroller = new EventsController_Ac(new ApexPages.StandardController(evt));
eventCpntroller.getEvents();
Test.stopTest();


}
}