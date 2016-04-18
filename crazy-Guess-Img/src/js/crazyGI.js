void function(){
    var datas = {
        imgSrc: '',
        answers:[]
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
                datas.answers = data.answerBox;
                $('.J-inputBox').html('');
                for (var i = 0 ; i< data.nameLength; i++){
                    $('.J-inputBox').append('<span class=""></span>')
                }
            },
            error: function(){
                console.log('error')
            }
        })
    }
    changeImg();

    $('.J-aBox').on('click','button',function(e){
        //todo
    });

    $('.J-fresh').click(function(){
        changeImg();
    })

}();