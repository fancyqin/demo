var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');

//var requrl = 'http://jira.vemic.com/rest/gadget/1.0/issueTable/jql?jql=assignee+%3D+currentUser()+AND+resolution+%3D+unresolved+ORDER+BY+priority+DESC%2C+created+ASC&num=10&addDefault=true&enableSorting=true&sortBy=null&paging=true&startIndex=0&showActions=true';
//
//request({
//    url: requrl,
//    headers: {
//        Cookie: "seraph.rememberme.cookie=16544%3A8ec2c417f7f936bcce7ded81b8b87da5efceac8f"
//    }
//},function(error,response,body){
//    if(!error && response.statusCode == 200){
//        acquireData(body);
//    }
//});
//
//function acquireData(data){
//    var $ =cheerio.load(JSON.parse(data).table);
//    var table = $('#issuetable').html();
//
//    console.log(table);
//}



var requrl = 'http://oa.vemic.com/seat/index/index/id/11';
var cookie = 'PHPSESSID=27b5e8c254878a4374193b75bb26a98a;fvl_id=6F6DD9B50C86A36F594A39FE003995865BFC756911FD2E23;token=MjFkNWw1UE1vM3RicW1hK1JtM2dzdnM5b3R6dEZYVWNVQkhEUjZpQjEvV2JlcVJiVmRqM1Radw';

request({
    url:requrl,
    headers:{
        Cookie:cookie
    }
},function(err,res,body){
    if(!err && res.statusCode == 200){
        acquireData(body);
    }
})

function acquireData(data){
    var $ = cheerio.load(data);
    var people = $('.p-a').toArray();
    var len = people.length;
    for (var i = 0;i<len;i++){
        var uid = people[i].attribs.uid;
        var usrName = people[i].children[0].data;
        loadImg(uid,usrName);
    }


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