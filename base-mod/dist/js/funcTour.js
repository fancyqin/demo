;void function(){

    var defaults = {
        item:[
            ['.J-steps-1','center bottom',"hello, I'm the first steps"],
            ['.J-steps-2','center bottom',"hello, I'm the second steps"]
        ],
        zindex: 100000
    };
    var $tour = $('.J-funcTour');
    var $hightlight = $tour.find('.ft-highlight');

    var FuncTour = function(config){
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

    };

    function Tour(item,zindex){
        var $el = $(item[0]);
        var el = $el[0];
        var direction = item[1] || 'center bottom';
        var txt = item[2] || 'please set some words';
        var el_pos;
        //if (window.getComputedStyle){
        //    el_pos = el.style.position || window.getComputedStyle(el).position
        //}else{
        //    el_pos = el.style.position || el.currentStyle.position;
        //}
        el_pos = el.style.position || (window.getComputedStyle && window.getComputedStyle(el).position) || el.currentStyle.position;
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
        $hightlight.css({
            width: elInfo.width,
            height: elInfo.height,
            top: elInfo.top,
            left: elInfo.left
        })



    }

    window.FuncTour = FuncTour;

}.call(this);


var abc = new FuncTour();

