public class EventsController_Ac {

    public EventsController_Ac(ApexPages.StandardController controller) {

    }
    
    public List<Event> getEvents() { 
        return [SELECT id, whatID, subject, Description,startdatetime FROM Event];
    }
}