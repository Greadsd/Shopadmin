var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Student = new Schema({
    username   : String,
    pwd        : String,
});
// 创建model对象
var StudentModel = mongoose.model('student', Student);
// 公开对象，暴露接口
module.exports = StudentModel;