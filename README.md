### 插件效果

![](http://ozetawl9z.bkt.clouddn.com/201805311907_585.gif)



###使用插件

	$.initPreLoad(imgs , {
		order: "ordered",
		startProgress : function(count ){
			/*console.log(count );
			console.log(len );*/
			$(".loader" ).html(Math.round((count / len ) * 100 ) + "%" );
		},
		endProgress : function(){
			$("#loading" ).fadeOut();
		}
	});
- initPreLoad插件名称
- imgs图片数组
- startProgress表示启动进度条动画
- endProgress表示结束进度条动画
- ordered表示有序加载 unordered表示无序加载