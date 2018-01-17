var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SaveGoods = new Schema({
	goods_id : Number,
    goods_name : String,
	goods_sn : String,
	goods_img : String,
	shop_price : Number,
	virtual_sales : Number,
	goods_number : Number,
	is_best : Number,
	is_new : Number,
	is_hot : Number,
    create_date: { type: Date, default: Date.now }
});
// 创建model对象
var SaveGoodsModel = mongoose.model('savegood', SaveGoods);
// 公开对象，暴露接口
module.exports = SaveGoodsModel;