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
            _this.tourTo(lastNum + 1);
        })

    };

    FuncTour.prototype.lastNum = 0;

    FuncTour.prototype.beginTour = function () {
        this.tourTo(0);
        $tour.show();
    };

    FuncTour.prototype.closeTour = function () {
        console.log(this.conf);
        $tour.hide();
    };

    FuncTour.prototype.tourTo = function (num) {
        var lastNum = this.lastNum;

        var items = this.conf.item;
        var item = items[num];
        var $el = $(item[0]);
        var el = $el[0];
        var zindex = this.conf.zindex;
        var txt = item[1] || 'please set some words';
        var direction = item[2] || 'center bottom';
        //var el_pos =  (window.getComputedStyle && window.getComputedStyle(el)['position']) || el.currentStyle['position'] || el.style['position'];
        var el_pos = getCssStyle(el,'position');
        var el_zindex = getCssStyle(el,'z-index');
        var elInfo = {
            width :  el.clientWidth,
            height : el.clientHeight,
            top :el.offsetTop,
            left : el.offsetLeft
        };

        //clear lastNum styles
        var $lastEl = $(items[lastNum][0]);
        $lastEl[0].style.zIndex = 0;
        console.log($lastEl[0].style);




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
        $highLight.css({
            width: elInfo.width,
            height: elInfo.height,
            top: elInfo.top,
            left: elInfo.left
        });
        $txtBox.text(txt);
        this.lastNum = num;
    };


    function getCssStyle(el,attr){
        var attr = attr.toString();
        var value = (window.getComputedStyle && window.getComputedStyle(el)[attr]) || el.currentStyle[attr] || el.style[attr];
        return value;
    }

    window.FuncTour = FuncTour;

}.call(this);




