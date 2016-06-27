;void function(){

    var defaults = {
        item:[
            ['.J-step-1',"hello, I'm the first steps",'center bottom'],
            ['.J-step-2',"hello, I'm the second steps",'center bottom']
        ],
        zindex: 100000
    };
    var $tour = $('.J-funcTour');
    var $highLight = $tour.find('.ft-highlight');
    var $txtBox = $tour.find('.ft-txt');
    var $tourDot = $tour.find('.tour-dot');
    var $next =  $tour.find('.ft-next');
    var $prev = $tour.find('.ft-prev');
    var $done = $tour.find('.ft-done');
    var $inner = $tour.find('.ft-inner');


    var FuncTour = function(config){
        var _this = this;
        this.conf = $.extend(defaults,config);
        var items = this.conf.item;
        var zindex = this.conf.zindex;
        var stepNum = items.length;

        var w_w =  document.body.clientWidth ;
        var w_h = window.innerHeight;

        (stepNum < 1) && console.error('err');


        for (var i = 0;i<stepNum;i++){
            var item =  items[i];
            (item.length<1) && console.error('err');

        }

        $tour.on('click','.ft-close',function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.closeTour();
        }).on('click','.ft-next',function(e){
            var lastNum = _this.lastNum;
            e.stopPropagation();
            e.preventDefault();
            (lastNum + 1 != stepNum) && _this.tourTo(lastNum + 1);
        }).on('click','.ft-prev',function(e){
            var lastNum = _this.lastNum;
            e.stopPropagation();
            e.preventDefault();
            (lastNum != 0) && _this.tourTo(lastNum - 1);
        }).on('click','.ft-again',function(e){
            e.stopPropagation();
            e.preventDefault();
            _this.beginTour();
        })

        $tourDot.on('click','i',function(e){
            e.stopPropagation();
            e.preventDefault();
            var index = $(e.target).index();
            _this.tourTo(index);
        })

    };

    FuncTour.prototype.lastNum = 0;

    FuncTour.prototype.lastCssStyle = {
        position: '',
        zIndex:''
    }

    FuncTour.prototype.beginTour = function () {
        this.tourTo(0);

        var stepNum = this.conf.item.length;
        $tourDot.html('');
        for (var j = 0;j< stepNum; j++){
            $tourDot.append('<i></i>')
        }
        $tourDot.find('i:first').addClass('on');
        $tour.show();
    };

    FuncTour.prototype.closeTour = function () {
        console.log(this.conf);
        $tour.hide();
    };

    FuncTour.prototype.tourTo = function (num) {

        var stepNum = this.conf.item.length;
        var items = this.conf.item;
        var item = items[num];
        var $el = $(item[0]);
        var el = $el[0];
        var zindex = this.conf.zindex;
        var txt = item[1] || 'please set some words';
        var dir = item[2] || 'center bottom';

        $inner.removeClass(function(num,cls){
            var arr = cls.split(' ');
            var reg = /^ft-dir-/;
            var delCls = '';
            for (var k = 0;k< arr.length;k++){
                if (reg.test(arr[k])){
                    delCls = delCls + ' '+ arr[k]
                }
            }
            return delCls;
        });

        switch (dir){
            case 'center top':
                $inner.addClass('ft-dir-ct');
                break;
            case 'center bottom':
                $inner.addClass('ft-dir-cb');
                break;
            case 'left top':
                $inner.addClass('ft-dir-lt');
                break;
            case 'left center':
                $inner.addClass('ft-dir-lc');
                break;
            case 'left bottom':
                $inner.addClass('ft-dir-lb');
                break;
            case 'right top':
                $inner.addClass('ft-dir-rt');
                break;
            case 'right center':
                $inner.addClass('ft-dir-rc');
                break;
            case 'right bottom':
                $inner.addClass('ft-dir-rb');
                break;
            default:
                $inner.addClass('ft-dir-cb');
                break;
        }



        var el_pos = getCssStyle(el,'position');
        var el_zindex = getCssStyle(el,'z-index');


        var elInfo = {
            width :  el.clientWidth,
            height : el.clientHeight,
            top :el.offsetTop || el.offsetParent.offsetTop,
            left : el.offsetLeft || el.offsetParent.offsetLeft
        };

        //clear lastNum styles
        var lastNum = this.lastNum;
        var $lastEl = $(items[lastNum][0]);

        $lastEl[0].style.zIndex = this.lastCssStyle.zIndex;
        $lastEl[0].style.position = this.lastCssStyle.position;


        //button show hide
        if (num === 0){

            $next.show();
            $prev.hide();
            $done.hide();
        }else if (num === stepNum - 1){
            $next.hide();
            $prev.hide();
            $done.show();
        }else{
            $next.show();
            $prev.show();
            $done.hide();
        }

        //style position
        setTimeout(function () {
            if (el_pos ==='static'){
                $el.css({
                    'position':'relative',
                    'z-index': zindex
                })
            }else {
                $el.css({
                    'z-index': zindex
                })
            }

        },200);

        //locate
        $highLight.css({
            width: elInfo.width,
            height: elInfo.height,
            top: elInfo.top,
            left: elInfo.left
        });

        $('html,body').animate({scrollTop: el.offsetTop - 50},400);

        $txtBox.text(txt);

        $tourDot.find('i').eq(num).addClass('on').siblings().removeClass('on');

        this.lastNum = num;
        this.lastCssStyle.position = el_pos;
        this.lastCssStyle.zIndex = el_zindex;
    };


    function getCssStyle(el,attr){
        var attr = attr.toString();
        var value = (window.getComputedStyle && window.getComputedStyle(el)[attr]) || el.currentStyle[attr] || el.style[attr];
        return value;
    }

    window.FuncTour = FuncTour;

}.call(this);




