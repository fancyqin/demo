const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

const domain = 'https://www.zeldadungeon.net';

const requrl = domain + '/wiki/Gallery:Breath_of_the_Wild_Armor';
// var cookie = 'PHPSESSID=27b5e8c254878a4374193b75bb26a98a;fvl_id=6F6DD9B50C86A36F594A39FE003995865BFC756911FD2E23;token=MjFkNWw1UE1vM3RicW1hK1JtM2dzdnM5b3R6dEZYVWNVQkhEUjZpQjEvV2JlcVJiVmRqM1Radw';


let mealArr = []

const acquireData = data => {
    const $ = cheerio.load(data);
    const meal = $('.gallerybox .thumb').toArray();
    

    meal.map((item,index) =>{
        const nameEn = item.children[0].children[0].attribs.title;
        const imgDom = item.children[0].children[0].children[0]
        const imageName = imgDom.attribs.alt;
        const imgUrl = '/images/armor/' + imageName;

        const imgSrc = domain + imgDom.attribs.src;


        downloadImg(imgSrc,imageName,function(){
            console.log(imageName+'  done');
        })
        
    })
    
}

const copyMealData = ()=>{
    console.log('begin loading' ,requrl)
    request({
        url:requrl
    },function(err,res,body){
        if(err){
            console.log('load url error!',err)
        }
        if(!err && res.statusCode == 200){
            console.log('load url success!')
            acquireData(body);
        }
    })
}






const downloadImg = (uri, filename, callback) => {
    request.get(uri).on('error', function(err) {
        console.log(err)
    }).pipe(fs.createWriteStream('images/armor/'+filename)).on('close', callback);

    // request.head(uri, function(err, res, body){
    //     // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
    //     // console.log('content-length:', res.headers['content-length']);  //图片大小
    //     if (err) {
    //         console.log('err: '+ err);
    //         return false;
    //     }
    //     request.get(uri).on('error', function(err) {
    //         console.log(err)
    //     }).pipe(fs.createWriteStream('images/meals/'+filename)).on('close', callback);  //调用request的管道来下载到 images文件夹下
    // });
};



copyMealData();