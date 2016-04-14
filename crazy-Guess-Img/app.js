var fs = require('fs');

var firstName = ['李','王','张','刘','陈','杨','赵','黄','周','吴','徐','孙'];
var lastName = ['小','明','伟','红','宝','刚','杰','伦','文','翔','姗','珊','娟',
    '雷','磊','静','阳','飞','璐','振','珍','勇','波','海','帆','娜','芳','敏',
    '丽','国','春','艳','洋','强','军','英','华','金'];


fs.readdir('src/img',function(err,files){
    if (err){
        console.log(err);
    }else {
        console.log(files)
    }
})