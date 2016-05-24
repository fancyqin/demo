/**
 * Created by qinfan on 2016/5/24.
 */
var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');


module.exports = function(cookie,fileName){
    var nowDate = new Date();
    var formData = {
        mailTypeCode: 'MICEN',
        month: nowDate.getMonth() + 1,
        file: fs.createReadStream(__dirname + '/' + fileName)
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
        console.log('Upload successful!  Server responded with:', body);
    });

}
