
var mongoose = require ('mongoose'),
    request = require('request'),
    cheerio = require('cheerio'),
    path = require('path'),
    NewsWeb = require('../models/news_model');

module.exports = {
	 '/': main,
	 '/post_title': postNews,
	 '/:con_id': post_con
};

//get news from dbs, input category, suppose to get two var, channel & category
function postNews( req, res, next ){
//temp
	var curCategory = 'hot';
	var curChannel = 'cnn';
	var curDate = new Date();
	var postArr = [];

//find news, send to front-end
	NewsWeb.find({category: curCategory, channel: curChannel}).exec(function(err, doc, next){
		if(err) throw new Error('Searching in DB fails');
		else{
			doc.forEach(function(db_news){
				// console.log(db_news.date.getDate() );
				// console.log('today'+curDate.getDate());

				// console.log('minth'+db_news.date.getMonth() );
				// console.log('today'+curDate.getMonth());
				// console.log('outer'+db_news);
//bug here, can't find array after if loop
//rewrite with where
				if(db_news.date.getDate() == curDate.getDate() && db_news.date.getMonth() == curDate.getMonth()){
					// console.log('ibbbb');
					// console.log('db_news'+db_news);
					// console.log('inner'+db_news.content[0]);
					var news = new Object;
					news.title = db_news.title;
					news.id = db_news.id;
					postArr.push( news );
				}
				// console.log(db_news.content);
			});
			// console.log(postArr.length);
			res.send( postArr );
		}
	});

};

function post_con( req, res, next ){
	var curCategory = 'hot';
	var curChannel = 'cnn';
	var con_id = req.params.con_id;
	console.log( con_id );

	NewsWeb.find({'_id': con_id}).exec(function(err, doc, next){
		if(err){
			console.log(err);
			throw new Error('Searching in DB fails');
		}
		else{
			res.send( doc );
		}
	})
};

function main( req, res, next ){
    // postNews();
    res.render('main_page_2');

};