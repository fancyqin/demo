/**
 * Created by qinfan on 2016/5/24.
 */

var koa = require('koa');
var app = koa();

var logger = require('koa-logger');
var route = require('koa-route');
var views = require('co-views');
var serve = require('koa-static');


var url = require('url');
var http = require('http');
var q = require('q');
var sizeOf = require('image-size');

app.use(logger());
app.listen(3000);

console.log('listening on port 3000');

app.use(serve(__dirname + '/src'));

var render = views(__dirname + '/view', {
    map: { html: 'ejs' }
});

app.use(route.get('/',index));
app.use(route.get('/checkImg',checkImg));


function *index(){
    this.body = yield render('index',{})
}

function *checkImg(next){

    var deferred = q.defer();
    var imgUrl = this.request.query.imgurl;
    var options = url.parse(imgUrl);
    getImgInfo(options,function(data){
        console.log(data);
        deferred.resolve(data);
    });
    this.body = yield deferred.promise;

}




function getImgInfo(options,cb){

    http.get(options, function (response) {
        var chunks = [];
        response.on('data', function (chunk) {
            chunks.push(chunk);
        }).on('end', function() {
            var buffer = Buffer.concat(chunks);
            cb(sizeOf(buffer));
        });
    });
}
