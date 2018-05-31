(function($){
	/**
	 * 初始化用户调用预先加载传递的参数
	 * @param  {[type]} images     [description]
	 * @param  {[type]} properties [description]
	 * @return {[type]}            [description]
	 */
	function initPreLoad(images , properties ){
		this.images = (typeof images === "string" ) ? [images ] : images;
		this.props = $.extend({}, initPreLoad.defaultProperties , properties );
		
		/**
		 * 启动函数
		 */
		this.__start();

	};
	initPreLoad.defaultProperties = {
		order : "unordered" , //无序预先加载 ordered是有序预先加载
		startProgress:null,
		endProgress:null
	};

	initPreLoad.prototype.__start = function(){
		var images = this.images;
		var props = this.props;
		if('unordered' === props.order   ){
			this.__unordered(images , props );
		}else{
			this.__ordered(images , props );
		}

	};

	/**
	 * 无序预加载
	 */
	initPreLoad.prototype.__unordered = function(imgs , props ){
		var len = imgs.length , 
			count = 0;
		$.each(imgs , function(i , src){
			var imgObj = new Image();
			$(imgObj ).on("load error" , function(){
				//1.执行进度条效果
				props.startProgress && props.startProgress(count );
				if(count >= len - 1 ){
					props.endProgress && props.endProgress();
				}
				count++;
			} );
			imgObj.src = src;
		});
	};
	
	/**
	 * 有序预加载 
	 */
	initPreLoad.prototype.__ordered = function(imgs , props ){
		if(null == count ){
			var len = imgs.length,
				count = 1;
		}
		
		function __load(){			
			var imgObj = new Image();
			$(imgObj ).on("load error" , function(){
				//1.执行进度条效果
				props.startProgress && props.startProgress(count );	


				if(count >= len ){
					//2.回收进行度效果
					props.endProgress && props.endProgress();
					return;
				}
				count++;
				__load();
			});
			imgObj.src = imgs[count-1 ];
		}
		__load();


	};


	/**
	 * 将我们自己的方法绑定到JQuery中
	 */
	$.extend({
		initPreLoad : function(images , properties ){
			new initPreLoad(images , properties );
		}
	});
	

})(jQuery );