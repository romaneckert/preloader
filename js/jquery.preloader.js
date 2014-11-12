(function ( $ ) {  

    $.fn.preloader = function(config) {
    	
    	var objects = [];
    	var elems = this;
    	
    	init();
    	
    	function init() {
    		
    		if(!support) {
    			return false;
    		} else {
    			$('html').addClass('preloader');
    		}
    		
    		if(config == undefined) {
    			config = {
    				
    			};
    		}

    		$(elems).each(function(t, elem) {
    		
    			$(elem).addClass('preloader preloader-' + t);

    			var object = {
	    			elem : elem,
	    			url : $(elem).attr('href'),
	    			loaded : false,
	    		};
	    		
	    		objects.push(object);
	    		
	    	});
    		
    		preload();
    		
    		$(elems).on('click', handleClick);
    		
    	};
    	
    	function support() {
    		
    		if (!(typeof (history.pushState) == "function")) {
				return false;
			}
			
			return true;
    		
    	};
    	
    	function handleClick(e) {
    		e.preventDefault();
    		e.stopPropagation();
    		
    		var elem = this;
    		
    		$.each(objects, function(o, object) {
    			if(object.elem == elem) {
    				load(this);
    			}
    		});

    	};
    	
    	function load(object) {
    		
    		$('body').replaceWith(object.doc.body);
    		$('title').text(object.doc.title);

			var state = {
				url : object.url
			};
			history.pushState(state, object.doc.title, object.url);

    	};
    	
    	function preload() {
    		$.each(objects, function(i, object) {
    			if(!object.loaded) {

    				$.ajax({
						type : 'GET',
						url : object.url,
						dataType : 'html',
					}).success(function(data) {
			
						object.doc = document.implementation.createHTMLDocument("html");
						object.doc.documentElement.innerHTML = data;
						
						object.loaded = true;
						
					});
    			}
    		});
    	};
    	
    	return elems;
    };
 
}(jQuery));