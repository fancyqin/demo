/**
 * Created by qinfan on 2016/5/24.
 */

var koa = require('koa');
var app = koa();

var logger = require('koa-logger');
var route = require('koa-route');
var views = require('co-views');
var serve = require('koa-static');
var parse = require('co-busboy');

var fs = require('fs');
var path = require('path');
var os = require('os');

var request = require('request');
var tough = require('tough-cookie');


var Upload = require('./node_upload');

app.use(logger());
app.listen(1882);

console.log('listening on port 1882');

app.use(serve(__dirname + '/src'));

var render = views(__dirname + '/view', {
    map: { html: 'ejs' }
});

app.use(route.get('/',index));
app.use(route.post('/uploadImg',uploadImg));


function *index(){
    this.body = yield render('index',{})
}
var cookie = 'JSESSIONID=abcxXKXC8Du7C_VC66Ctv; TTNET=326b385074505338392f485154475a677873754b38413d3d0d0a; _ttnet_session=eyJfY3NyZiI6Ikt0YjBCazRWZW9pQXdYSTFGS1JjV1E9PSIsIl9sb2duYW1lIjoicWluZmFuIn0=--4paPK+p/W1Yw2Sr+QUWvIKtsW2U=; TTNETLVT=684d45474a586f7774737846536f6e5533782b704378737030424c6e7947426e0d0a';
//cookie = '';
function *uploadImg(next){

    if ('POST' != this.method) return yield next;

    var parts = parse(this);
    var part;
    var name;

    // get cookie

    //function getCookie(){
    //    var j = request.jar();
    //    request({
    //        url:'http://edm.focuschina.com/',
    //        jar: j
    //    },function(){
    //        var cookies = j.getCookies('http://edm.focuschina.com/');
    //        console.log(cookies);
    //    });
    //}


    //function getCookie(){
    //    var cookiejar = new tough.CookieJar();
    //
    //    cookiejar.getCookies('http://edm.focuschina.com/',function(err,cookies) {
    //        if(!err){
    //            console.log(cookies)
    //        }
    //    });
    //}

    //getCookie();


    while (part = yield parts) {

        name = part.filename;
        var stream = fs.createWriteStream(path.join(__dirname, name));
        part.pipe(stream).on('finish',function(){
            var aa = fs.createReadStream(name);
            var ff = Upload(cookie, aa,function(){
                fs.unlink(name);
            });
            if (ff==='error'){
                console.log('upload error');
            }
        });

    }
    this.response.body = {
        name: name
    };

    yield next;
}

