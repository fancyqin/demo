void function(){
    var datas = {
        imgSrc: ''
    };
    var vm =new Vue({
        el:'#app',
        data:datas
    });

    function changeImg(){
        $.ajax({
            url:'/change',
            dataType:'json',
            success: function(data){
                datas.imgSrc = 'data:image/'+data.eName+';base64,'+data.newImg;
            },
            error: function(){
                console.log('error')
            }
        })
    }
    changeImg();



}();