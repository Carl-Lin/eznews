
var mongoose = require ('mongoose'),
    request = require('request'),
    cheerio = require('cheerio'),
    xml2js = require('xml2js'),
    path = require('path'),
    fs = require('fs'),
    im = require('imagemagick'),
    NewsWeb = require('../models/news_model');

var reqCNN = {
		'hot': 'http://rss.cnn.com/rss/edition.rss',
		'tec': 'http://rss.cnn.com/rss/edition_technology.rss',
		'business': 'http://rss.cnn.com/rss/edition_business.rss'
	};

module.exports = {
    '/cnn': cnn
};

// 解析 & get RSS, dnoe
function downloadCon(){
	// 解析CNN的RSS
	request(reqCNN.hot, function (error, response, body){
		if(!error && response.statusCode == 200){
			var parser = new xml2js.Parser();
			parser.parseString( body, function (err, result){
                console.log(result);
				result.rss.channel.forEach( function($this){
					$this.item.forEach(function($this){
						// console.log($this.link[0]);
                        // getCon( $this.link[0] );
                    });
				});

			});
 		};
 	});

};

// function getImg( img_url ){
//     var img_name = path.basename(img_url);
//     var img_path = path.join( 'public', 'images', 'hot', img_name);
//     console.log( img_name );
//     console.log( img_path );

// //path for littile picture
//     var min_img_path = img_path.replace('.jpg', '_min.jpg');
//     console.log( img_path );
//     console.log( min_img_path );
// //pipe the picture, resize after piping finished
//     var ws = fs.createWriteStream( img_path );
//     ws.on('error', function(err) { console.log(err); });
//     request( img_url ).pipe( ws );
//     ws.on( 'end', function(){
// //picture resize after piping
//         // im.resize({
//         //       srcPath: img_path,
//         //       dstPath: min_img_path,
//         //       width:   150,
//         //       height: 120
//         //     }, function(err, stdout, stderr){
//         //       if (err) throw err;
//         //       console.log('resized success');
//         //     }
//         // );
//     });
// }


//get content into db, also get pic url.
function getCon( uri ){
    //temp, set as cnn;
    var curChannel = 'cnn';
    var curCategory = 'hot';

    request(uri, function (error, response, body){
        if (!error && response.statusCode == 200){
            $ = cheerio.load(body);
            // console.log('innnn');
            var curDate = new Date();

        // get content title. Done
            var content_title = $('h1').text();
            // console.log( content_title );

        //get meta descrtiption. done
            var news_descript;
            $('meta').each(function(){
                if( this[0].attribs.name == 'description' ){
                    news_descript = this[0].attribs.content;
                }
            });
            // console.log( news_descript );

        // get img url. Done
            var img_div = $('.cnn_stryimg640captioned');
            var img_url = img_div.find('img').attr('src');
            console.log( img_url );

        // Failed to get the img url of video
            // var video_picture_div = $('script');
            // var temp = "";
            // $('script').each( function(){
            //     console.log( this[0].children[0] );
            //     // temp = this[0].children.data + temp;
            // });
            // console.log(temp);
            // console.log( typeof(temp));
            // var video_picture_url = video_picture_div.find('img').attr('src');
            // console.log( video_picture_url );

        // check which exist, and download it!
            // if( img_url != null ){
            //     console.log('pictire');
            //     getImg( picture_url );
            // }

        // into database, not test finish, 從這裡開始接續寫
            var news_data = new NewsWeb({
                channel: curChannel
                ,category: curCategory
                ,date: curDate
                ,title: content_title
                ,web_url : uri
                ,img_url: img_url
            });

        // get content, 分區抓到。
        // console.log('-------------------------------');
            $('.cnn_strycntntlft p').each( function(){
                console.log("stry"+this.text());
                news_data.content.push(this.text());
                // console.log(this.text());
            });
                // $('.cnn_strycntntlft p').each( function(){
                //         news_data.content.push(this.text());
                //     console.log(this.text());
                // });
            // $('.story-body p').each( function(){
            //     console.log("story"+this.text());
            //     //     news_data.content.push(this.text());
            //     // console.log(this.text());
            // });
        // // console.log('-------------------------------');

            news_data.save(function(err, data){
                console.log("gettttt");
                if(err) console.log(err);
                else console.log("done");
            });
        }
    });
};


//when get ajax of title, find the latest news and ajax to front end

//cnn main function
function cnn( req, res, next ){
    downloadCon();
    // getCont( 'http://edition.cnn.com/2013/06/25/opinion/snowden-us-humilation/index.html?hpt=hp_c1' );

};




