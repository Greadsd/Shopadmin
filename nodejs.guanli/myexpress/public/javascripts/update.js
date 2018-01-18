var arr ;
function up(){
	setTimeout(function(){
		$("#list #listDiv table tbody tr:gt(0)").each(function(index,value){
			$(this).children("td").last().children("a").eq(1).click(function(){
				var name = $(this).parent().parent().children("td").eq(1).children("span").html();
				
				var url = "./update?goods_name"+ name;
				location.href = url;
				console.log(name);
//				$.ajax({
//					type:"get",
//					url:"/api/update",
//					data : {
//						goods_name : name
//					},
//					success : function(res){
//						
//						console.log("./update?goods_name="+res[0].goods_name+"")
//						console.log(res[0]);
////						arr = res;
////						tian(res);
//					}
//				});
			});
			
		})
	},1000);
}
up();


