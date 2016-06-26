;void function(){

    var defaults = {
        item:[
            ['.J-step-1','center bottom',"hello, I'm the first steps"],
            ['.J-step-2','center bottom',"hello, I'm the second steps"]
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


        stepNum = 1;//////////////////


        for (var i = 0;i<stepNum;i++){
            var item =  items[i];
            (item.length<2) && console.error('err');
            
            Tour(item,zindex);
        }

        $tour.on('click','.ft-close',function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.closeTour();
        })

    };

    function Tour(item,zindex){

        var $el = $(item[0]);
        var el = $el[0];
        var direction = item[1] || 'center bottom';
        var txt = item[2] || 'please set some words';
        var el_pos =  (window.getComputedStyle && window.getComputedStyle(el).position) || el.currentStyle.position || el.style.position;
        var elInfo = {
            width :  el.clientWidth,
            height : el.clientHeight,
            top :el.offsetTop,
            left : el.offsetLeft
        };
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


    }

    FuncTour.prototype.beginTour = function (cb) {
        $tour.show();
        cb();
    };

    FuncTour.prototype.closeTour = function () {
        $tour.hide();
    };

    FuncTour.prototype.tourTo = function (num) {
        //todo
    }

    window.FuncTour = FuncTour;

}.call(this);




