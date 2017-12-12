({
    init: function(component, event, helper) {
        var idsJson = sessionStorage.getItem('customSearch--recordIds'); 
        if (!$A.util.isUndefinedOrNull(idsJson)) {
            var ids = JSON.parse(idsJson);
            component.set('v.recordIds', ids);
            sessionStorage.removeItem('customSearch--recordIds'); 
            sessionStorage.setItem('customSearch--recordIds', JSON.stringify(ids));
            var navEvt = $A.get('e.force:navigateToURL');
            navEvt.setParams({url: '/custom-search-results'});
            navEvt.fire();
        }
        
    }
})