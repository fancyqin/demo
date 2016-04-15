var koa = require('koa');
var app = koa();

var logger = require('koa-logger');
var route = require('koa-route');
var views = require('co-views');
var serve = require('koa-static');

var fs = require('fs');
var path = require('path');


app.use(logger());
app.listen(1882);

console.log('listening on port 1882');

app.use(serve(__dirname + '/src'));

var render = views(__dirname + '/views', {
    map: { html: 'ejs' }
});

app.use(route.get('/',index));




function *index(){
    this.body = yield render('index')
}








var imgSrc = 'src/img';
var firstName = ['李','王','张','刘','陈','杨','赵','黄','周','吴','徐','孙'];
var lastName = ['小','明','伟','红','宝','刚','杰','伦','文','翔','姗','珊','娟',
    '雷','磊','静','阳','飞','璐','振','珍','勇','波','海','帆','娜','芳','敏',
    '丽','国','春','艳','洋','强','军','英','华','金'];

function readDir (){
    fs.readdir(imgSrc,function(err,files){
        if (err){
            console.log(err);
        }else {
            var len =  files.length;
            var imgbase64 =  base64_encode(imgSrc + '/' + files[0]);
            console.log(len);

            //todo
        }
    });
}

readDir();

//图片base64编码
function base64_encode(file){
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}









