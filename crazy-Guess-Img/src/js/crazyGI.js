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
                    $('.J-inputBox').append('<span class="blank" data-index=""></span>')
                }
            },
            error: function(){
                console.log('error')
            }
        })
    }
    changeImg();

    $('.J-aBox').on('click','button',function(e){
        var $blank = $('.J-inputBox').find('.blank:first');
        if($blank.length > 0){
            var num = $(this).index();
            $blank.html($(this).text())
                .removeClass('blank')
                .attr('data-index',num);
            $(this).addClass('hide');
        }
    });

    $('.J-inputBox').on('click','span',function(){
        var $this = $(this);
        var ind = $this.attr('data-index');
        var txt = $this.text();
        if($this.html() !==''&& ind!== ''){
            $('.J-aBox').find('button').eq(ind).removeClass('hide');
            $this.text('').addClass('blank').attr('data-index','');
        }
    });

    $('.J-fresh').click(function(){
        changeImg();
    })

}();