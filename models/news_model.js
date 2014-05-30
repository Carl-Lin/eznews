var mongoose = require('mongoose');

// var db = mongoose.createConnection('localhost','news');

// media_url for sometimes, there would be picture or video

var pageSchema = new mongoose.Schema({
	channel: {type: String, required: true}
	,category: {type: String, require: true}
	, date: {type: Date, require: true}
	, title: {type: String , required: true}
	, web_url :{type: String, required: true}
	, img_url: {type: String}
	, description: {type: String, required: false}
	, content : [{type: String, required: true}]
});

var WebPage = mongoose.model('WebPage',pageSchema);
module.exports = WebPage;
var x = new WebPage();