setTimeout(function(){
	$("#list #listDiv table tbody tr:gt(0)").each(function(index,value){
		$(this).children("td").last().children("a").eq(3).click(function(){
			var name = $(this).parent().parent().children("td").eq(1).children("span").html();
			//console.log(name)
			del(name);
			$(this).parent().parent().remove();
		});
		
	})
},1000);

function del(name){
	$.ajax({
		type:"get",
		url:"/api/delet",
		data : {
			goods_name : name
		},
		success : function(res){
			if(res.code == 1){
				alert("删除成功！");
			}else{
				alert("删除失败！");
			}
		}
	});
}

