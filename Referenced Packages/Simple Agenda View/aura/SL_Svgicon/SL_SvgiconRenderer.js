({
	afterRender: function(component, helper) {
        console.log('draw ' );
		/*var oSvg = component.find('svg_content').getElement(),
        	sResult = '<svg aria-hidden="true" class="' + component.get('v.class') + '">'
                + '<use xlink:href="' 
                	+ component.get('v.static') 
                	+ component.get('v.path') 
            		+ '#'
                	+ component.get('v.icon') 
                	+ '">'
            	+ '</use>'
        	+ '</svg>';

        oSvg.innerHTML = sResult;*/
        this.superAfterRender(); 
	}
})