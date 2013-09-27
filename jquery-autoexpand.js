// Copyright © 2013 DB Medialab AS http://medialaben.no

(function($) {
	'use strict';
	//!Public methods
	var pub = {
		//Init the editor. Takes options.
		init: function(options) {
			return this.each(function(){
				var $this = $(this);
				//If the plugin hasn't been initialized yet save all our settings 
				if(!$this.data('autoexpand')){
					$this.data('autoexpand', $.extend({}, $.fn.autoexpand.defaults, options) );
					//Read options from the data-attr
					if( $this.attr('data-autoexpand-options') !== undefined ){
						options = $this.attr('data-autoexpand-options').split(';');
						$.each(options, function( index, value ){
							var p = value.split(':');
							if (/true/i.test(p[1])) p[1] = true;
							if (/false/i.test(p[1])) p[1] = false;
							if(! isNaN (p[1]-0) && p[1] !== null && p[1] !== "" && p[1] !== false && p[1] !== true){
								p[1] = parseInt(p[1], 10);
							}
							if (p.length === 2 && p[0].length > 0){
								p[0] = $.trim(p[0]);
								p[1] = $.trim(p[1]);
								$this.data('autoexpand')[p[0]] = p[1];
							}
						});
						
						$this.data('autoexpand');
					}
				}
				//Store the original height so this can be applied again if we destroy the plugin
				$this.data('autoexpand').originalHeight = $this.outerHeight();

				if($this.data('autoexpand').resizeOnInit) pub.resize.apply($this);
				
				$this.on('keypress focus,  keyup focus, keydown focus', function(){
					pub.resize.apply($this);
				});
				
				if( $this.data('autoexpand').actAsInput ){
					$this.on('keypress', function(e){
						if((e.keyCode || e.which) == 13) {
							$this.parents('form').submit();
							return false;
						}
					});
				}
			});
		},
		
		resize: function(){
			return this.each(function(){
				var $this = $(this);
				var data = $this.data('autoexpand');
				//The height is set to zero so that we can also handle shrinking of the field.
				$this.css({ height: 0 });
				//Set the height to the scrollHeight + the width of the top and bottom border
				var height = $this[0].scrollHeight + (parseFloat($this.css('border-top-width')) + parseFloat($this.css('border-bottom-width')));
				//Check if we are within our boundaries
				if( data.min !== 0 && height < data.min ){
					height = data.min;
				}
				if( data.max !== 0 && height > data.max ){
					height = data.max;
					$this.css({ overflow: 'auto' });
				}
				$this.css({ height: height });
			});
		},
		
		destroy: function(){
			return this.each(function(){
				var $this = $(this);
				$this.unbind('keypress focus,  keyup focus, keydown focus');
				$this.css({ height: $this.data('autoexpand').originalHeight });
				$this.removeData('autoexpand');
			});
		}
	};
	
	//!Method calling logic
	$.fn.autoexpand = function(method){
		if ( pub[method] ) {
			return pub[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return pub.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.autoexpand' );
		}
	};
	
	// !Default options
	$.fn.autoexpand.defaults = {
		resizeOnInit: false,
		actAsInput: false,
		min: 0,
		max: 0
	};
	
	$('textarea[data-autoexpand]').autoexpand();
	
}(jQuery));
