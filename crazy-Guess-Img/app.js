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
app.use(route.get('/change',changeImg));
app.use(route.get('/check',checkName));



function *index(){
    this.body = yield render('index')
}

function *changeImg(next){
    var file = fileBox[0];
    var eName = getExtensionName(file);
    var imgbase64 =  base64_encode(imgSrc + '/' + file);
    nowName = getName(file);
    var aBox = getAnswerBox(nowName);
    var nameLength = nowName.length;
    this.response.body = {newImg:imgbase64,eName:eName,answerBox:aBox,nameLength:nameLength};
    yield next;

}

function *checkName(){

}




var imgSrc = 'src/img';
var fileBox,folderLen,nowName;

//读取本地目录图片
function readDir (){
    fs.readdir(imgSrc,function(err,files){
        if (err){
            console.log(err);
        }else {
            folderLen =  files.length;
            //todo
            fileBox = files;
        }
    })
}
readDir();

//图片base64编码
function base64_encode(file){
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

//获取图片扩展名

function getExtensionName (file){
    var eName = file.split('.')[1].toLowerCase();
    if (eName && (eName === 'jpg' || eName === 'png' || eName ==='gif') ){
        return eName
    }else {
        console.error('img ExtensionName error');
    }
}

//获取名字
function getName (file){
    var nameReg = /[^\u4e00-\u9fa5]/;
    var name = file.split('.')[0].replace(/\s+/,'');
    if(!nameReg.test(name)){
        return name;
    }else {
        console.error('file name only by Chinese');
    }
}

//获取答案组 8 firstName 16 lastName

function getAnswerBox(nowName){

    var firstNameArray = ['李','王','张','刘','陈','杨','赵','黄','周','吴','徐','孙'];
    var lastNameArray = ['小','明','伟','红','宝','刚','杰','伦','文','翔','姗','珊','娟',
        '雷','磊','静','阳','飞','璐','振','珍','勇','波','海','帆','娜','芳','敏',
        '丽','国','春','艳','洋','强','军','英','华','金'];

    var nameArray = nowName.split('');
    var nameLen = nameArray.length;
    var n = firstNameArray.indexOf(nameArray[0]);//es5
    var newFirstNameArray,newLastNameArray;
    var answerName = [];
    if (n === -1){
        newFirstNameArray = firstNameArray;
    }else {
        newFirstNameArray = firstNameArray.slice(0,n).concat(firstNameArray.slice(n+1,firstNameArray.length));
    }
    newLastNameArray = lastNameArray;
    for (var i = 0 ; i<7; i++){
        var len = newFirstNameArray.length;
        var num = parseInt(Math.random()*len);
        answerName = answerName.concat(newFirstNameArray[num]);
        newFirstNameArray.splice(num,1);
    }
    for (var j = 0 ; j< 17 - nameLen; j++){
        var len2 = newLastNameArray.length;
        var num2 = parseInt(Math.random()*len2);
        answerName = answerName.concat(newLastNameArray[num2]);
        newLastNameArray.splice(num2,1);
    }
    for (var k = 0; k< nameLen; k++){
        var len3 = answerName.length;
        var num3 = parseInt(Math.random()*len3);
        answerName.splice(num3,0,nameArray[k]);
    }
    return answerName;
}




