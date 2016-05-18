;void function(){

    var defaults = {
        el:'.J-anchor',            //锚点导航dom
        acrAttr:'as-anchor',       //锚点属性
        item:'a',                  //锚点元素
        selectedClass:'selected',  //锚点导航下当前元素的class
        speed: 500,                //动画速度
        blankTop:0                 //锚点距顶距离
    };
    var AnchorScroll = function(config){
        this.conf = $.extend(defaults,config);
        var el = this.conf.el;
        var acrAttr = this.conf.acrAttr;
        var sCls = this.conf.selectedClass;
        var spd = this.conf.speed;
        var btop = this.conf.blankTop;
        var item = this.conf.item;
        //scroll anchor
        var $el = $(el);
        $el.on('click', item, function(e) {
            var target = $(e.target);
            var acr = target.attr(acrAttr);
            var acrtop = $(acr).offset().top - btop;

            e.preventDefault();

            $('html,body').animate({scrollTop: acrtop+1}, spd,function(){
                $el.find(item).removeClass(sCls);
                target.addClass(sCls);
            });
            // scrollChange();

        });

        $(window).on('scroll', function(e) {
            scrollChange();
        });


        function scrollChange(){
            var top = $(window).scrollTop();
            var fixedA = $el.find(item);
            var sArray = [];
            $el.find('a').each(function() {
                var acr = $(this).attr(acrAttr);
                var acrtop = $(acr).offset().top - btop;
                sArray.push(acrtop);
            });

            var index;
            for (var i = 0;i< sArray.length; i++) {
                if (top + $(window).height() === $('html').height()){
                    index = sArray.length;
                }else {
                    if (top < sArray[i]) {
                        index = i;
                        break;
                    }else{
                        index = sArray.length;
                    }
                }
            }
            fixedA.removeClass(sCls);
            if (index!==0){
                fixedA.eq(index - 1).addClass(sCls);
            }
        }






    };
    window.AnchorScroll = AnchorScroll;

}.call(this);




