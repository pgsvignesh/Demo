({
	doInit : function(component, event, helper) {
        var rid = component.get("v.recordId");
        //console.log('rid ' + rid);
		var d = new Date();
        var n = d.getTime();   
        //console.log('t ' + n);
		component.set("v.ifmsrc", '/apex/IATSPayment__IATSPaymentsRefund?id=' + rid);
	}
})