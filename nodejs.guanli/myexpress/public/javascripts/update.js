
var arr ;
function up(){
	setTimeout(function(){
		$("#list #listDiv table tbody tr:gt(0)").each(function(index,value){
			$(this).children("td").last().children("a").eq(1).click(function(){
				var name = $(this).parent().parent().children("td").eq(1).children("span").html();

				console.log(name);
				$.ajax({
					type:"get",
					url:"/api/update",
					data : {
						goods_name : name
					},
					success : function(res){
						location.href = "./update";
						
//						console.log(res);
//						arr = res;
//						tian(res);
					}
				});
			});
			
		})
	},1000);
}
up();


function tian(res){
	location.href = "./update";
	console.log(res)
	console.log(arr);

}



