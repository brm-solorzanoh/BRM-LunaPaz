;(function($){
	$.fn.extend({
		sm_accordion_expand: function(options){
			$context = $(this);
			if ( $context.hasClass(options.active_class) ) return;
			if ( $context.hasClass(options.active_class) ) return;
			
			
			var $content_inner = $(options.content, $context);
			$content_inner.filter(':animated').stop();
			
			$height_to_fit = 0;
			$content_inner.children().each(function(){	
				if ($(this).height()>0){
					$height_to_fit += $(this).height();				
				}
			});
			
			$context.addClass(options.active_class);
			$content_inner.animate({
				height: $height_to_fit			
			}, {
				duration: options.duration
			});
		},
		sm_accordion_close: function(options){
			$context = $(this);
			$context.removeClass(options.active_class);
			var $content_inner = $(options.content, $context);
			
			$content_inner.filter(':animated').stop();
			
			$content_inner.animate({
				height: 0
			}, {
				duration: options.duration
			});
		},
		sm_accordion: function(options){
			var defaults = {};
			var options =  $.extend(defaults, options);
			
			return this.each(function(){
				var panel = $(this);
				var items = $(options.items, this);
				var stack = [];
				var stackProcess = function(){
					if (stack.length>0){
						var item = stack.pop();
						items.not(item).sm_accordion_close(options);
						$(item).sm_accordion_expand(options);
					}
				};
				var stackTimeout = null;
				
				items.each(function(i, item){
					if (options.active && options.active==(i+1)){
						$(item).sm_accordion_expand(options);
					}
					
					if (options.event=='click'){
						$(item).click(function(){
							items.not(item).sm_accordion_close(options);
							if(items.hasClass(options.active_class)){
								$(item).sm_accordion_close(options);
							}else{
								$(item).sm_accordion_expand(options);
							}
						});
					} else {
						var delay = parseInt(options.delay);
						if (!delay) delay = 300;
						$(item).hover(function(){
							// action after 'delay' miliseconds.
							if (stackTimeout){
								clearTimeout(stackTimeout);
							}
							stackTimeout = setTimeout(stackProcess, delay);
							stack.push(item);
						}, function(){
							//if(items.hasClass(options.active_class)){
								//$(item).sm_accordion_close(options);
							//}
							//stack.push(item);
							stack.pop();
						});
					}
				});

			});
		}
	});
})(jQuery)


