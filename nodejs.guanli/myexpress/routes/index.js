var express = require('express');
var router = express.Router();
var StudentModel = require("../model/Student");
var SaveGoodsModel = require("../model/Goods")
var md5 = require("md5");
var fs = require("fs");
var multiparty = require("multiparty");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', {title: '登录页面' });
});
router.get('/shoplist', function(req, res, next) {
  res.render('shoplist', {title: '商品列表' });
});
router.get('/tonyong', function(req, res, next) {
  res.render('tonyong', {title: '添加页面' });
});

router.get('/update', function(req, res, next) {
	res.render('update', {title: '修改信息' });
});
router.get('/loginAction', function(req, res, next) {
  res.render('loginAction', {title: '管理中心' });
});
router.get("/api/login",function(req,res,next){
	var username = req.query.username;
	var pwd = req.query.pwd;
	var result = {
		code : 1,
		message: "登录成功"
	}
	StudentModel.find({username : username,pwd : pwd},function(err,data){
		if(data.length < 1){
			result.code = -109;
			result.message = "账号或密码错误";
		}
		res.json(result);
	//	console.log(data)
	})
})
router.post('/api/saveGood', function(req, res, next) {
  var form = new multiparty.Form({
		uploadDir : "public/img"
	});
	var result = {
		code : 1,
		message : "商品信息保存成功"
	}
	form.parse(req,function(err,body,files){
		if(err){
			console.log(err);
		}
//		console.log(body);
//		console.log(files);
		var goods_id = body.goods_id[0];
		var goods_name = body.goods_name[0];
		var goods_sn = body.goods_sn[0];
		var goods_img = files["goods_img"][0].path.replace("public\\","");
		var shop_price = body.shop_price[0];
		var virtual_sales = body.virtual_sales[0];
		var goods_number = body.goods_number[0];
		var is_best = body.is_best[0];
		var is_new = body.is_new[0];
		var is_hot = body.is_hot[0];
		
		var sg = new SaveGoodsModel();
		sg.goods_id = goods_id;
		sg.goods_name = goods_name;
		sg.goods_sn = goods_sn;
		sg.goods_img = goods_img;
		sg.shop_price = shop_price;
		sg.virtual_sales = virtual_sales;
		sg.goods_number = goods_number;
		sg.is_best = is_best;
		sg.is_new = is_new;
		sg.is_hot = is_hot;
		sg.save(function(err){
			if(err){
				result.code = -109;
				result.message = "商品信息保存失败";
			}
			res.json(result);
		})
	})
});

router.get('/api/getgood', function(req, res, next) {
	var cont = parseInt(req.query.cont) - 1;
	var pageSize = parseInt(req.query.pageSize);
	SaveGoodsModel.find({goods_id : 1},function(err,docs){
		//console.log(docs);
		res.send(docs);
	}).limit(pageSize).skip(cont * pageSize);
});

router.get('/api/sum', function(req, res, next) {
	SaveGoodsModel.find({goods_id : 1},function(err,docs){
		//console.log(docs.length);
		res.send(docs);
	})
})

router.get('/api/delet', function(req, res, next) {
	var goods_name = req.query.goods_name;
	var result = {
		code : 1
	}
	SaveGoodsModel.update({goods_name : goods_name,goods_id : 1},{goods_id : 2},function(err){
		if(err) {
				result.code = -109;
        console.log(err);
    }
    res.json(result);
	})
})

router.get('/api/update', function(req, res, next) {
	var goods_name = req.query.goods_name;
	SaveGoodsModel.find({goods_name : goods_name,goods_id : 1},function(err,docs){
		//console.log(docs);
		res.send(docs);
	})
})
router.get('/api/find', function(req, res, next) {
	var goods_name = req.query.goods_name;
	SaveGoodsModel.find({goods_name : goods_name,goods_id : 1},function(err,docs){
		res.send(docs);
//		console.log(docs)
	})
})

router.post('/api/updateGood', function(req, res, next) {
  var form = new multiparty.Form({
		uploadDir : "public/img"
	});
	var result = {
		code : 1,
		message : "商品信息保存成功"
	}
	form.parse(req,function(err,body,files){
		if(err){
			console.log(err);
		}
		var goods_name = body.goods_name[0];
		var goods_sn = body.goods_sn[0];
		var goods_img = files["goods_img"][0].path.replace("public\\","");
		var shop_price = body.shop_price[0];
		var virtual_sales = body.virtual_sales[0];
		var goods_number = body.goods_number[0];
		var is_best = body.is_best[0];
		var is_new = body.is_new[0];
		var is_hot = body.is_hot[0];
		
		SaveGoodsModel.update({goods_name : goods_name,goods_id : 1},{goods_sn : goods_sn,goods_img:goods_img,shop_price:shop_price,virtual_sales:virtual_sales,goods_number:goods_number,is_best:is_best,is_new:is_new,is_hot:is_hot},function(err){
			if(err) {
					result.code = -109;
	        console.log(err);
	    }
	    res.json(result);
		})
	})
});

module.exports = router;
