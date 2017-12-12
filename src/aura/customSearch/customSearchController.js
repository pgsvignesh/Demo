({
    handleClick : function(component, event, helper) {
      var searchText = component.get('v.searchText');
      var action = component.get('c.searchForIds');
      action.setParams({searchText: searchText});
      action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === 'SUCCESS') {
          var ids = response.getReturnValue();
          console.log(ids);
        }
      });

      $A.enqueueAction(action);
    }
})