
$(function(){


    var $beforeTime = $('.J-beforeTime');
    var $countdown = $('.J-countdown');
    var $timeline = $('.J-timeline');
    var $countdownTxt = $('.J-countdownTxt');


    //设置当天的圆点
    function setDayDot (){
        var today = new Date().getDate();
        var beginDay = 14;
        var num = today - beginDay;
        if (num >= 0 && num <= 4){
            $timeline.find('.J-day').removeClass('today').eq(num).addClass('today');
        }else{
            $timeline.find('.J-day').removeClass('today');
        }
    }
    setDayDot();


    //倒计时
    function countdown(time){
    	var thisTime = new Date();
    	var diff = time - thisTime;
        var dd = parseInt(diff / 1000 / 60 / 60 / 24, 10);
        var hh = parseInt(diff / 1000 / 60 / 60 % 24, 10);
        var mm = parseInt(diff / 1000 / 60 % 60, 10);
        var ss = parseInt(diff / 1000 % 60, 10);

        hh = checkTime(hh);
        mm = checkTime(mm);
        ss = checkTime(ss);

        if (dd > 0) {
        	$beforeTime.show().text(dd);
        	$countdown.hide();
        }else if (dd === 0){
        	$countdown.show();
            $beforeTime.hide();

        	showCountdown('.J-hour',hh);
       		showCountdown('.J-min',mm);
        	showCountdown('.J-sec',ss);
            $countdownTxt.text('距离活动开始时间还剩');
            if (hh === mm && mm === ss && ss === '00'){//?????????
                alert("let's cook");
                clearInterval(firstCountdown);
            }
        }

    }

    function checkTime(i){
        if (i < 10) {
            i = "0" + i;
        }else {
            i = i.toString()
        }
        return i;
    }
    function showCountdown(time,str){
        var $borad = $(time);
        var firstNum = str.substring(1,0);
        var lastNum = str.substring(2,1);
        $borad.find('.num:first').text(firstNum);
        $borad.find('.num:last').text(lastNum);
    }


    //秒杀开始时间
    var beginTime = new Date(2016,2,7,17,36,0);

    //////
    var firstCountdown = setInterval(function(){
        countdown(beginTime)
    },1000);


    

    //goto活动规则
    $('#goToRules').click(function(){
        var addrs = $(this).attr('href');
        var scroll = $(addrs).offset().top;
        console.log(scroll);
        $('body').animate({ scrollTop: scroll }, 300);
    });






});