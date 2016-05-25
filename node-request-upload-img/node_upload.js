/**
 * Created by qinfan on 2016/5/24.
 */
var request = require('request');
var cheerio = require('cheerio');


module.exports = function(cookie,file,cb){
    var nowDate = new Date();
    var formData = {
        mailTypeCode: 'MICEN',
        month: nowDate.getMonth() + 1,
        file: file
    };
    //get cookie
    // request({
    //     url:'http://edm.focuschina.com/'
    // },function(error,response,body){
    //     if(!error && response.statusCode == 200){
    //         var $ = cheerio.load(body);
    //         console.log(body)
    //     }
    // });

    request.post({
        url:'http://edm.focuschina.com/uploadImg',
        headers:{
            Cookie:cookie
        },
        formData: formData
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });

    cb();

}
