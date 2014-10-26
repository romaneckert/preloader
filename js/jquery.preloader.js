(function ( $ ) { 
 
    $.fn.preloader = function(config) {
    	
    	var elems = [];
    	var tags = this;
    	
    	init();
    	
    	function init() {
    		if(config == undefined) {
    			config = {
    				
    			};
    		}
    		
    		$(tags).each(function(t, tag) {
    		
    			$(tag).addClass('preloader');
    			$('body').on('click', tag, handleTagClick);
    		
    			var elem = {
	    			tag : tag,
	    			content : undefined,
	    			loaded : false,
	    		};
	    		
	    		elems.push(elem);
	    		
	    	});
    		
    		load();
    		
    	};
    	
    	function handleTagClick(e) {
    		e.preventDefault();
    		
    		
    	};
    	
    	function load(elem) {
    		$.each(elems, function(i, elem) {
    			if(!elem.loaded) {
    				console.log('not loaded');
    				$( "#result" ).load( "ajax/test.html" );
    				return false;
    			}
    		});
    	};
    	
    	return tags;
    };
 
}(jQuery));