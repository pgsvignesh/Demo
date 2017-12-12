({
    searchKeyChange: function(component, event, helper) {
        console.log("Event Firing");
        var myEvent = $A.get("e.c:SearchKeyChange"); 
        myEvent.setParams({"searchKey": event.target.value});
        myEvent.fire();
    }
})