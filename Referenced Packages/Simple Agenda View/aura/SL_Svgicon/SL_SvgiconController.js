({
	doInit: function(component, event, helper) {
		var sHTML = '<svg aria-hidden="true" class="' + component.get('v.class') + '">'
                + '<use xlink:href="' 
                	+ component.get('v.static') 
                	+ component.get('v.path') 
            		+ '#'
                	+ component.get('v.icon') 
                	+ '">'
            	+ '</use>'
        	+ '</svg>';
    	component.set('v._html', sHTML);

	},
	reDraw: function(component, event, helper) {
		var oEl = component.getElement();
		oEl = oEl.tagName == 'use' ? oEl : oEl.getElementsByTagName('use');
		oEl = oEl != null && oEl.length > 0 ? oEl[0] : oEl;
		if (oEl == null || !oEl.hasAttribute('xlink:href')) {
			return;
		}
		var aParts = oEl.getAttribute('xlink:href').split('#');

		aParts[1] = component.get('v.icon');
		oEl.setAttribute('xlink:href', aParts.join('#'));
	}
})