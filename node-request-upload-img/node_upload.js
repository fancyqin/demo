/**
 * Created by qinfan on 2016/5/24.
 */
var request = require('request');
var fs = require('fs');


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
        console.log('Upload successful!  Server responded with:', body);
    });

    cb();

}
