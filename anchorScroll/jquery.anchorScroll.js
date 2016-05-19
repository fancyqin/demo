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
        var el = this.conf.el,
            acrAttr = this.conf.acrAttr,
            sCls = this.conf.selectedClass,
            spd = this.conf.speed,
            btop = this.conf.blankTop,
            item = this.conf.item;
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
            //var sArray = [];
            $el.find(item).each(function(){
                var acr = $(this).attr(acrAttr);
                $(acr).attr('acr-itm','');
            });
            $el.find(item).each(function() {
                var acr = $(this).attr(acrAttr);
                var acrTop = $(acr).offset().top;
                var acrBot = acrTop + $(acr).innerHeight();
                var calTop = acrTop - btop;
                var calBot = acrBot - btop;
                //$(acr).addClass('J-acrItm');
                fixedA.removeClass(sCls);
                if (top < calBot && top > calTop){
                    $(this).addClass(sCls);
                    return false;
                }
            });
            var lastItm = $('[acr-itm]:last');
            if (top + $(window).height() === $(document).height() && lastItm.offset().top + lastItm.innerHeight() > top){
                var id = lastItm.attr('id');
                $el.find(item).removeClass(sCls);
                $el.find(item).filter('['+acrAttr+'="#'+id+'"]').addClass(sCls);
            }
        }

    };
    window.AnchorScroll = AnchorScroll;

}.call(this);




