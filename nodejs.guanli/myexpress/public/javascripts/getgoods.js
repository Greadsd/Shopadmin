var num = 1;
var pageSize = $("#pageSize").val();

//		鼠标点击第一页
$(".zore").click(function(){
	num = 1;
	$("#list #listDiv table tbody tr:gt(0)").each(function(index,value){
		$(this).remove();
	})
	$("#pageCurrent").html(num +1);
	getgood(num,pageSize);
	up();
})

//		鼠标点击上一页
$(".jian").click(function(){
	num --;
	if(num <= 1){
		num = 1;
	}
	$("#list #listDiv table tbody tr:gt(0)").each(function(index,value){
		$(this).remove();
	})
	$("#pageCurrent").html(num);
	getgood(num,pageSize);
	up();
})

//		鼠标点击下一页
$(".jia").click(function(){
	num ++;
	var ye = parseInt($("#totalPages").html());
	if(num >= ye){
		num = ye;
	}
	$("#list #listDiv table tbody tr:gt(0)").each(function(index,value){
		$(this).remove();
	})
	$("#pageCurrent").html(num);
	getgood(num,pageSize);
	up();
})

//点击最末页
$(".last").click(function(){
	var yenum = $("#totalPages").html();
	$("#list #listDiv table tbody tr:gt(0)").each(function(index,value){
		$(this).remove();
	})
	$("#pageCurrent").html(yenum);
	getgood(yenum,pageSize);
	up();
})

//最末页后的下拉菜单
function list(){
	$("#gotoPage option").each(function(index,value){
		$(this).remove();
	})
	var con = $("#totalPages").html();
	for(var i =1 ; i <= con; i++){
		var op = $('<option value="'+ i +'">'+ i +'</option>');
		$("#gotoPage").append(op);
	}
}
//鼠标失焦 	设置每页多少信息
$("#pageSize").blur(function(){
	$("#list #listDiv table tbody tr:gt(0)").each(function(index,value){
		$(this).remove();
	})
	pageSize = $("#pageSize").val();
	getgood(num,pageSize);
	sum(pageSize);
	up();
})
//console.log(num);

//获取数据，并且在页面动态生成信息
function getgood(num,pageSize){
	$.ajax({
		type:"get",
		url:"/api/getgood",
		data : {
			cont : num,
			pageSize : pageSize
		},
		success : function(res){
			var len = res.length;
			
			$(res).each(function(index,value){
				//console.log(value);
				var data = value;
				var tr = $("<tr></tr>");
				var td1 = $('<td><input name="checkboxes" value="150" type="checkbox">'+parseInt(index + 1)+'</td><td class="first-cell"><span onclick="" title="点击修改内容" style="">'+data.goods_name+'</span></td>');
				tr.append(td1);
				var td2 = $('<td align="center"><span onclick="" title="点击修改内容" style="">'+data.goods_sn+'</span></td><td align="center"><span onclick="">'+data.shop_price+'</span></td>');
				tr.append(td2);
				var td3 = $('<td align="center"><img src="/images/yes.gif"></td><td align="center"><img src="/images/no.gif"></td><td align="center"><img src="/images/no.gif"></td><td align="center"><img src="/images/no.gif"></td>');
				tr.append(td3);
				var td4 = $('<td align="center"><span onclick="">'+Math.floor(Math.random()*200 +1)+'</span></td><td align="center"><span onclick="">'+ data.goods_number +'</span></td><td align="center"><span onclick="">'+ data.virtual_sales +'</span></td>');
				tr.append(td4);
				var td5 = $('<td align="center"><a href="javascript:;" target="_blank" title="查看"><img src="/images/icon_view.gif" width="21" border="0" height="21"></a><a href="javascript:;" title="编辑"><img src="/images/icon_edit.gif" width="21" border="0" height="21"></a><a href="javascript;" title="复制"><img src="/images/icon_copy.gif" width="21" border="0" height="21"></a><a href="javascript:;" title="回收站"><img src="/images/icon_trash.gif" width="21" border="0" height="21"></a><img src="/images/empty.gif" width="21" border="0" height="21"></td>');
				tr.append(td5);
				$("#list #listDiv table tbody").append(tr);
			})

		}
	});
}
getgood(num,pageSize);

//获取信息总条数，并向DOM中添加相应的的值
function sum(pageSize){
	$.ajax({
		type:"get",
		url:"/api/sum",
		data : {
			
		},
		success : function(res){
//			console.log(res.length);
//			console.log(pageSize);
			var len = res.length;
			$("#totalRecords").html(len);
			$("#totalPages").html((Math.ceil(len / parseInt

(pageSize))));
			list();
		}
	});
}
sum(pageSize);


//虚假删除信息
setTimeout(function(){
	$("#list #listDiv table tbody tr:gt(0)").each(function(index,value){
		$(this).children("td").last().children("a").eq(3).click

(function(){
			var name = $(this).parent().parent().children
("td").eq(1).children("span").html();
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
//依据商品名或货号查询信息

function cha(){
	$("#search").click(function(){
		var name = $("#keyword").val()
		console.log(name);
		
		$("#list #listDiv table tbody tr:gt(0)").each(function

(index,value){
			$(this).remove();
		})
		$.ajax({
			type:"get",
			url:"/api/keyword",
			data : {
				keyword : name
			},
			success : function(res){
				var len = res.length;
				
				$(res).each(function(index,value){
					//console.log(value);
					var data = value;
					var tr = $("<tr></tr>");
					var td1 = $('<td><input name="checkboxes" value="150" type="checkbox">'+index+'</td><td class="first-cell"><span onclick="" title="点击修改内容" style="">'+data.goods_name+'</span></td>');
					tr.append(td1);
					var td2 = $('<td align="center"><span onclick="" title="点击修改内容" style="">'+data.goods_sn+'</span></td><td align="center"><span onclick="">'+data.shop_price+'</span></td>');
					tr.append(td2);
					var td3 = $('<td align="center"><img src="/images/yes.gif"></td><td align="center"><img src="/images/no.gif"></td><td align="center"><img src="/images/no.gif"></td><td align="center"><img src="/images/no.gif"></td>');
					tr.append(td3);
					var td4 = $('<td align="center"><span onclick="">'+Math.floor(Math.random()*200 +1)+'</span></td><td align="center"><span onclick="">'+ data.goods_number +'</span></td><td align="center"><span onclick="">'+ data.virtual_sales +'</span></td>');
					tr.append(td4);
					var td5 = $('<td align="center"><a href="javascript:;" target="_blank" title="查看"><img src="/images/icon_view.gif" width="21" border="0" height="21"></a><ahref="javascript:;" title="编辑"><img src="/images/icon_edit.gif" width="21" border="0" height="21"></a><a href="javascript;" title="复制"><img src="/images/icon_copy.gif" width="21" border="0" height="21"></a><a href="javascript:;" title="回收站"><img src="/images/icon_trash.gif" width="21" border="0" height="21"></a><img src="/images/empty.gif" width="21" border="0" height="21"></td>');
					tr.append(td5);
					$("#list #listDiv table tbody").append(tr);
				})
			}
		});
	})
}
cha();
