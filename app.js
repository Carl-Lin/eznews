
/**
 * Module dependencies.
 */

var express = require('express')
  , Courser = require('courser')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();
mongoose.connect('localhost','news');

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var courser = new Courser(app);
courser.addPath(__dirname + '/routes');
courser.init(function() {
    app.listen(3000);
});
// http.createServer(app).listen(app.get('port'), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });
