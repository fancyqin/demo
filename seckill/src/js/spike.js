
$(function(){


    var $beforeTime = $('.J-beforeTime');
    var $countdown = $('.J-countdown');
    var $timeline = $('.J-timeline');
    var $countdownTxt = $('.J-countdownTxt');

    var beginTime = $('#beginTime').val();        //秒杀开始时间
    var thisTime = $('#checkTime').val();         //首次进入页面时间
    var activeKey = $('#activeKey').val();        //活动码
    var nextActiveKey = $('#nextActiveKey').val();//下一次活动码

    //时间校验
    var valiateTime = setInterval(function(){
        $.ajax({
            url: 'http://m.made-in-china.com/validateTime/'+ activeKey
        })
        .done(function(results) {
            var data = JSON.parse(results);
            if(data.time){
                thisTime = data.time
            }else{
                thisTime = new Date().getTime();
            }
        })
        .fail(function() {
            thisTime = new Date().getTime();
        })
    },5000);


    //倒计时
    function countdown(nowTime,beginTime){

    	var diff = beginTime - nowTime;
        var dd = parseInt(diff / 1000 / 60 / 60 / 24, 10);
        var hh = parseInt(diff / 1000 / 60 / 60 % 24, 10);
        var mm = parseInt(diff / 1000 / 60 % 60, 10);
        var ss = parseInt(diff / 1000 % 60, 10);

        function strTime(i){
            if (i < 10) {
                i = "0" + i;
            }else {
                i = i.toString();
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

        hh = strTime(hh);
        mm = strTime(mm);
        ss = strTime(ss);
        if (diff < 0){
            getSpikeStatus();

            beginSpikeStatus();///////////////////
        }else{
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
                if (hh === mm && mm === ss && ss === '00'){
                    getSpikeStatus();
                
                	beginSpikeStatus();////////////////
                }
            }
        }
    }

    function getSpikeStatus(){
        $.ajax({
                url: 'http://m.made-in-china.com/comeIntoTheBowl/' + activeKey,
            })
            .done(function(result) {
                if (result === '3') {
                    //开始
                    beginSpikeStatus();
                }else if (result === '5') {
                    //已结束
                    window.location.href = nextActiveKey;////////////////

                }else if (result === '2') {
                    //未开始
                }
            })
    }

    function beginSpikeStatus(){
        $countdownTxt.text('秒杀进行中');
        clearInterval(firstCountdown);
        $countdown.show().find('.num').text('-');
        $('.J-btn').addClass('btn-main').text('开始秒杀');
        var productID;
        $('#awardWrap').on('click', '.J-btn.btn-main', function() {
            $('#beginSpike').addClass('open');
            productID = $(this).attr('data-prod');
            console.log(productID);
        });

        function spikeIntoTheBowl(){
            var verCode = $('#verCode').val();
            if (verCode) {
                    $.ajax({
                            url: 'http://m.made-in-china.com/comeIntoTheBowl',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                activeKey: activeKey,
                                verCode: verCode,
                                productID:productID
                            }
                        })
                        .done(function(result) {
                            function showPopup(tpl){
                                $('#beginSpike').removeClass('open');
                                $('#spikeStatusPopup').html('').append(tpl).addClass('open');
                            }
                            switch (result){
                                case '10001':
                                    console.log("验证码错误");
                                    $('#verCode').addClass('error');
                                    break;
                                case '3':
                                    console.log("秒杀中");
                                    var tpl = SetPopupTpl('ing');
                                    showPopup(tpl);
                                    setTimeout(spikeIntoTheBowl(),2000);
                                    break;
                                case '5':
                                    console.log("秒杀已结束");
                                    window.location.href = nextActiveKey;
                                    break;
                                case '6':
                                    console.log("失败");
                                    var tpl = SetPopupTpl('fail');
                                    showPopup(tpl);
                                    break;
                                case '8':
                                    console.log("成功！");
                                    var tpl = SetPopupTpl('ok');
                                    showPopup(tpl);
                                    break;
                            }
                        })
                }

        }
        $('#spikePost').click(function(){
            spikeIntoTheBowl();
        });
    }

    

    //倒计时开始
    var firstCountdown = setInterval(function(){
        countdown(thisTime, beginTime);
        thisTime = parseInt(thisTime) + 1000;
    },1000);


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

    //goto活动规则
    $('#goToRules').click(function(){
        var addrs = $(this).attr('href');
        var scroll = $(addrs).offset().top;
        console.log(scroll);
        $('body').animate({ scrollTop: scroll }, 300);
    });


    //弹框
    function SetPopupTpl (stats){
        var status,txt;
        if (stats === 'ok'){
            status = 'stats-ok';
            txt = '恭喜，秒杀成功，好运爆棚！'
        }else if (stats === 'fail'){
            status = 'stats-fail';
            txt = 'Sorry，手慢了点，明天再来！'
        }else if(stats === 'ing'){
            status = 'stats-ing';
            txt = '秒杀中...'
        }
        var popupTpl =
            '<div class="popup spike-stats">' +
            '<span class="popup-close J-popupClose"></span>' +
            '<div class="stats '+ status +'"></div>' +
            '<div class="stats-txt">'+ txt +'</div>' +
            '</div>';
        return popupTpl;
    }






    $('.J-popup').on('click','.J-popupClose',function(){
        $(this).parents('.J-popup:first').removeClass("open");
        return false;
    })



});