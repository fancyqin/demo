/**
 * Created by qinfan on 2016/5/24.
 */

var koa = require('koa');
var app = koa();

var logger = require('koa-logger');
var route = require('koa-route');
var views = require('co-views');
var serve = require('koa-static');
var formidable = require('formidable');

var fs = require('fs');
var path = require('path');
var util = require('util');
var http = require('http');



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

function *uploadImg(next){

    var form = new formidable.IncomingForm();
    console.log(form);
    form.uploadDir = "/src";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });
    //todo https://cnodejs.org/topic/4f16442ccae1f4aa2700104d
    //todo https://github.com/felixge/node-formidable
    var lv = this.query.lv;


    yield next;
}

app.use

//上传








//var cookie = 'JSESSIONID=abcxXKXC8Du7C_VC66Ctv;TTNET=326b385074505338392f485154475a677873754b38413d3d0d0a;_ttnet_session=eyJfY3NyZiI6Ikt0YjBCazRWZW9pQXdYSTFGS1JjV1E9PSIsIl9sb2duYW1lIjoicWluZmFuIn0=--4paPK+p/W1Yw2Sr+QUWvIKtsW2U=;TTNETLVT=625753743737347870774539505162386e6f2b3456356f576c473565556754770d0a';
//var fileName = 'avv.png';
//
//Upload(cookie,fileName);