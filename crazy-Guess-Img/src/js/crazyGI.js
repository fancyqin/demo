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
            success: function(data){

            }
        })
    }




}();