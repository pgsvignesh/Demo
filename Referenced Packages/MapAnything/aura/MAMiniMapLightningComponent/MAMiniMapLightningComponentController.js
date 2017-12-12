({
  doInit : function(component, event, helper) {
        var miniMapId = component.get('v.miniMapId'),
            recordId = component.get('v.recordId'),
            url = '/apex/sma__MAMiniMapLightning',
            params = [];

        var hostname = window.location.hostname;
// 		var action = component.get("c.fetchURL");
      	
//         action.setParams({});

//         action.setCallback(this, function(response) {
//             console.log(response);
//             var state = response.getState();
//             if (state === "SUCCESS") {
//                 console.log(response.getReturnValue());
//             }
//         });
//       $A.enqueueAction(action);
        var path = component.get('v.domain') == '' || !component.get('v.domain')? '' : component.get('v.domain');
       
        if(path != '' && path.indexOf('/') != 0) {
            path = 'https://' + path;
        }
        url = path + url;
        if (hostname.indexOf('livepreview') > -1) {
            var matches = hostname.match('livepreview.([^.]*)');
            if (matches && matches[1]) {
                var instance = matches[1];
                hostname = hostname.replace('livepreview.' + instance, 'sma.' + instance + '.visual');
                url = 'https://' + hostname + url;
            }
        }

        if (recordId) params.push('rid=' + recordId);
        if (miniMapId) params.push('mmid=' + miniMapId);

        if (params.length) {
            url += '?'

            url += params[0];

            for (var i = 1; i < params.length; i++) {
                url += '&' + params[i];
            }
        }

        component.set("v.url", encodeURI(url));
  }
})