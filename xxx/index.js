const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');


const requrl = 'https://www.zeldadungeon.net/wiki/Gallery:Breath_of_the_Wild_Meals';
// var cookie = 'PHPSESSID=27b5e8c254878a4374193b75bb26a98a;fvl_id=6F6DD9B50C86A36F594A39FE003995865BFC756911FD2E23;token=MjFkNWw1UE1vM3RicW1hK1JtM2dzdnM5b3R6dEZYVWNVQkhEUjZpQjEvV2JlcVJiVmRqM1Radw';


let mealArr = []

const acquireData = data => {
    const $ = cheerio.load(data);
    const meal = $('.gallerybox .thumb').toArray();
    
    meal.map((item,index) =>{
        const name = item.children[0].children[0].attribs.title;
        console.log(name);
        
    })
    
}

const copyMealData = ()=>{
    request({
        url:requrl
    },function(err,res,body){
        if(!err && res.statusCode == 200){
            acquireData(body);
        }
    })
}


function loadImg (uid,usrName){
    var url = 'http://oa.vemic.com/seat/index/user/id/'+ uid +'/status/view';
    request({
        url:url,
        headers:{
            Cookie:cookie
        }
    },function(err,res,body){
        if(!err && res.statusCode == 200){
            var $ = cheerio.load(JSON.parse(body).data);
            var imgsrc = $('img').attr('src');
            var urlname = parseUrlForFileName(imgsrc);
            var filename = usrName + '.' + urlname.split('.')[1];
            downloadImg(imgsrc,filename,function(){
                console.log(uid+'  done');
            })
        }
    })
}

function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}

var downloadImg = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
        // console.log('content-length:', res.headers['content-length']);  //图片大小
        if (err) {
            console.log('err: '+ err);
            return false;
        }
        request.get(uri).on('error', function(err) {
            console.log(err)
        }).pipe(fs.createWriteStream('avatar/11F/'+filename)).on('close', callback);  //调用request的管道来下载到 images文件夹下
    });
};



copyMealData();