;void function(){

    var defaults = {
        el:'.J-anchor',            //锚点导航dom
        acrAttr:'as-anchor',       //锚点属性
        item:'a',                  //锚点元素
        selectedClass:'selected',  //锚点导航下当前元素的class
        speed: 500,                //动画速度
        blankTop:0                 //锚点距顶距离
    };
    var FuncTour = function(config){
        this.conf = $.extend(defaults,config);
        var el = this.conf.el,
            acrAttr = this.conf.acrAttr,
            sCls = this.conf.selectedClass,
            spd = this.conf.speed,
            btop = this.conf.blankTop,
            item = this.conf.item;
        var $el = $(el);

    };
    window.FuncTour = FuncTour;

}.call(this);

