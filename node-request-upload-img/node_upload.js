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
        var $ = cheerio.load(body);

        if ($('body').html() === ''){
            console.log('Upload successful!');
            cb();
        }else {
            console.log('上传失败，请联系管理员更换cookie');
            return 'error';
        }
    });


}
