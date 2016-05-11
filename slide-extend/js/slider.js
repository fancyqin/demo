/**
 * Created with JetBrains WebStorm.
 * User: xingshikang
 * Date: 13-2-27
 * Time: 下午1:26
 */

;void function() {
    /**
     * @requires jquery
     * @type {Abstract}
     */
    var ISlider = new Abstract({
        /**
         * 开始播放幻灯片
         * @param begin
         */
        start: function (begin) {},
        /**
         * 停止播放幻灯片
         */
        stop: function () {},
        /**
         * 切换下一个幻灯片
         */
        next: function () {},
        /**
         * 切换上一个幻灯片
         */
        prev: function () {},
        /**
         * 切换至指定幻灯片
         * @param to
         */
        goTo: function (to) {},
        /**
         * 切换开始事件：每张幻灯片开始切换时触发
         */
        onSwitchStart: function () {},
        /**
         * 切换结束事件：每张幻灯片切换结束时触发
         */
        onSwitchEnd: function () {},
        /**
         * 一组动画开始事件：该动画行为开始时触发
         * tip：例如从2-4，若尊重自然动画则该切换实际上需要一次性完成2个切换动作，
         *      整个过程为一个spot，则这套动作开始时触发onSpotStart
         */
        onSpotStart: function () {},
        /**
         * 一组动画完成事件：该动画行为完成时触发
         */
        onSpotCompleted: function () {}
    });

    var config = {
        autoPlay: true, //是否自动播放
        speed: 500, //幻灯片切换的速度 ms
        interval: 3000, //自动播放的间隔时间 ms
        preLoadSliderNum: 1, //预加载的幻灯片数量，该数字代表当前幻灯片前后分别加载的幻灯片数量
        parallelPreLoad:true,//预加载的幻灯片是否并行加载，或者依次加载
        initSliderLoc:0,//初始幻灯片位置
        isLoop: true, //是否循环播放 （用处不大暂未实现）
        naturalOrder: 1, //play order{0:skip show;1:natural order;2:go ahead}
        animationType: "fade", //内置的切换动画：{show,fade,scrollX,scrollY}
        imgDepositSrc: "slider_src", //预加载图片的替代src属性名
        imgPlaceholderSrc: '', //在图片未被加载完成时的占位图片，例如loading
        sliderImgs: [], //指定图片数组进行轮播{href:'',alt:'',src:'',title:''}
        bannerEventType: 'click', //手动触发切换的事件{click,mouseover}
        bannerEventMouseoverDelay: 300, //bannerEventType为mouseover是的触发延迟 ms
        quickResponse:true,//在动画执行过程中，是否结束当前动画同时快速响应新动画
        carrier: {
            content: null, //幻灯片容器
            banner: null,//手动切换幻灯片的操作区容器
            stopAPAear:null//停止自动播放的区域容器（非必须，默认为每个幻灯片本身）
        },
        style: {
            bannerBtnSelected: "selected", //当前幻灯片指示灯的样式
            bannerBtnhover: 'hover'
        },
        //扩展内置方法
        extend: {
            linkDom: null, //function(conf,structure){},对于非典型dom结构，使用该方法将页面dom进行关联，
            //conf:配置，structure为数据结构
            switchSpot: null, //function(outObj,inObj,motionDir,motionTime,callback){}自扩展幻灯片切换动画
            //outObj:消失的幻灯片,inObj:显示的幻灯片，motionDir:动画的方向,motionTime:动画的完成时间,callback:动画执行完后回调函数（须手动调用）
            innerStateChange: null //切换后一定会执行的内置函数
        }
    };

    var Slider = Clazz(ISlider, { config: config, inherit: Component }, function (conf) {
        conf = this.setConfig(conf);
        var that = this;
        var bulitINDef = {
            linkDom: function (conf, sliderMember) {
                var content = conf.carrier.content;
                if (!(content && $(content).length > 0)) {
                    return;
                }
                var members = [];
                //根据imgs数组创建dom并关联
                if (conf.sliderImgs.length > 0) {
                    $.each(conf.sliderImgs, function (i, n) {
                        if (n.src != "") {
                            var sMember = new sliderMember();
                            var img = $("<img " + conf.imgDepositSrc + "='" + n.src + "' src='" + that.imgPlaceholderSrc + "' alt='" + n.alt + "' title='" + n.title + "'/>");
                            var a = $("<a href='" + n.href || "#" + "'></a>").append(img);
                            var li = $("<li></li>").append(a);
                            if (members.length == 0) {
                                $(content).html("");
                            }
                            $(content).append(li);
                        }
                    });
                }
                //根据已有图片节点初始关联dom数据
                var sliderObjs = $(content).children("li");
                $.each(sliderObjs, function (i, n) {
                    var img = $(n).find("img");
                    if (img.length > 0) {
                        var sMember = new sliderMember();
                        sMember.sliderObj = $(n);
                        if (img.attr("src") && img.attr("src") != "" && img.attr("src") != conf.imgPlaceholderSrc) {
                            sMember.isLoaded = true;
                        }
                        if (img.attr(conf.imgDepositSrc) && img.attr(conf.imgDepositSrc) != "" || img.attr("src") && img.attr("src") != "") {
                            var banner = conf.carrier.banner;
                            if (banner && $(banner).length > 0) {
                                if (members.length == 0) {
                                    $(banner).html("");
                                }
                                var bannerBtn = $("<li>" + (members.length + 1) + "</li>");
                                $(banner).append(bannerBtn);
                                sMember.bannerObj = bannerBtn;
                            }
                            members.push(sMember);
                        }
                    }
                });
                //only one slider,remove banner btn
                if (members.length == 1 && members[0].bannerObj && members[0].bannerObj.length > 0) {
                    members[0].bannerObj.remove();
                }
                return members;
            },
            motionFn: {
                show: function (outObj, inObj, motionDir, motionTime, callback) {
                    $.each(that._.sliderMembers,function(i,n){
                        n.sliderObj.hide();
                    });
                    inObj.show();
                    callback.call(that);
                },
                fade: function (outObj, inObj, motionDir, motionTime, callback) {
                    //way 1:more life,but change position
//                    $.each(that._.sliderMembers,function(i,n){
//                        n.sliderObj.hide();
//                    });
//                    var cssStay = new this.util.cssStay(['position','left','top','z-index','opacity']);
//                    cssStay.saveCss(outObj);
//                    outObj.show().css("left",0).css("top",0).css("position","absolute").css("z-index","0").animate({
//                        opacity:0
//                    },motionTime,function(){
//                        cssStay.restoreCss(outObj);
//                        outObj.hide();
//                        callback.call(this);
//                    });
//                    inObj.show();
                    //way2: have white flicker,but more reliable
                    outObj.fadeOut(motionTime / 2, function () {
                        inObj.hide().fadeIn(2 * motionTime / 3, function () {
                            callback.call(that);
                        });
                    });
                },
                scrollX: function (outObj, inObj, motionDir, motionTime, callback, _XoY) {
                    var parent = outObj.parent();
                    if (parent.length == 0 || parent.get(0) != inObj.parent().get(0)) {
                        bulitINDef.motionFn.show(outObj, inObj, motionDir, motionTime, callback);
                        return;
                    }
                    $.each(that._.sliderMembers,function(i,n){
                        n.sliderObj.hide();
                    });

                    var XoYTag = !_XoY ? {lt: "left", wh: "outerWidth"} : {lt: "top", wh: "outerHeight"};
                    var cssStay = new that.util.cssStay(['position', XoYTag.lt, 'overflow']);
                    cssStay.saveCss([parent, outObj, inObj]);

                    function strJsonToJson(jsonData) {
                        return ( new Function("return " + jsonData) )();
                    }

                    var loc = parent[XoYTag.wh]();
                    parent.css({
                        "position": "relative",
                        "overflow": "hidden",
                        "width": parent.outerWidth(),
                        "height": parent.outerHeight()
                    });
                    var outLoc = (motionDir == -1 ? loc : (0 - loc)) + "px";
                    outObj.show().css("position", "absolute").animate(strJsonToJson("{'" + XoYTag.lt + "':'" + outLoc + "'}"), motionTime, '', function () {
                        cssStay.restoreCss([outObj]);
                        outObj.hide();
                    });
                    var inLoc = (motionDir == -1 ? (0 - loc) : loc) + "px";
                    inObj.show().css(strJsonToJson("{'position':'absolute','" + XoYTag.lt + "':'" + inLoc + "'}")).animate(strJsonToJson("{'" + XoYTag.lt + "':'0px'}"), motionTime, '', function () {
                        cssStay.restoreCss([parent, inObj]);
                        callback.call(that);
                    });
                },
                scrollY: function (outObj, inObj, motionDir, motionTime, callback) {
                    bulitINDef.motionFn.scrollX(outObj, inObj, motionDir, motionTime, callback, "Y");
                }
            }
        };

        var _sliderMember = function () {
            this.isLoaded = false;
            this.sliderObj = null;
            this.bannerObj = null;
        };

        var _linkDomFn = null;
        if (conf.extend.linkDom && typeof(conf.extend.linkDom) == "function") {
            _linkDomFn = conf.extend.linkDom;
        } else {
            _linkDomFn = bulitINDef.linkDom;
        }
        this._ = {
            sliderMembers: _linkDomFn.call(that, conf, _sliderMember)
        };

        if (!this._.sliderMembers || this._.sliderMembers.length == 0) {
            return;
        }
        conf.preLoadSliderNum = conf.preLoadSliderNum > this._.sliderMembers.length ? this._.sliderMembers.length : conf.preLoadSliderNum;
        this._events = {};
        this._.inner = {
            currentIndex: 0,
            nextIndex: 1,
            prevIndex: 0,
            motioning: false,
            autoPlayTimer: null
        };
        //util
        this.util = {};
        this.util.cssStay = function (styles) {
            this.styles = styles || ['position', 'left', 'overflow', 'width', 'height'];
        };
        this.util.cssStay.prototype = {
            saveCss: function (Objs) {
                var styles = this.styles;
                $.each(Objs, function (l, m) {
                    var obj = $(m);
                    $.each(styles, function (i, n) {
                        obj.data("css_" + n, obj.css(n));
                    })
                });
            },
            restoreCss: function (Objs, remove) {
                var styles = this.styles;
                $.each(Objs, function (l, m) {
                    var obj = $(m);
                    $.each(styles, function (i, n) {
                        if (obj.data("css_" + n) != "undefined") {
                            obj.css(n, obj.data("css_" + n));
                            if (remove) {
                                obj.removeData("css_" + n);
                            }
                        }
                    });
                });
            }
        };

        var _fireEvent = function () {
            if (typeof(that._events[arguments[0]]) != "undefined" && that._events[arguments[0]] === false) {
                that._events[arguments[0]] = true;
            } else {
                $(that).trigger.apply($(that), arguments);
            }
        };

        var _waitImg = function () {
            this.imgObj = null;
        };
        var _preLoadImgs = function (begin, preLoadSliderNum, callback) {
            var waitLoadImgs = (function () {
                var membersNum = that._.sliderMembers.length || 0;
                var preIndexs = [];
                preIndexs.push(begin);
                for (var i = 1; i <= preLoadSliderNum; i++) {
                    var _insertNum = begin + i <= membersNum - 1 ? (begin + i) : (begin + i - membersNum);
                    if ($.inArray(_insertNum, preIndexs) == -1) {
                        preIndexs.push(_insertNum);
                    }
                    _insertNum = begin - i >= 0 ? (begin - i) : (begin + membersNum - i);
                    if ($.inArray(_insertNum, preIndexs) == -1) {
                        preIndexs.push(_insertNum);
                    }
                }
                if (preIndexs.length === 0) {
                    return;
                }
                var waitLoadImgs = [];
                $.each(preIndexs, function (i, n) {
                    if (that._.sliderMembers[n].isLoaded == false) {
                        var sliderObj = that._.sliderMembers[n].sliderObj;
                        var sliderImgs = sliderObj.find("img");
                        var _waitLoadImgsLength = waitLoadImgs.length;
                        $.each(sliderImgs, function (k, l) {
                            var despositSrc = $(l).attr(conf.imgDepositSrc), src = $(l).attr("src");
                            if ((!src || src == "" || src == conf.imgPlaceholderSrc) && despositSrc && despositSrc != "") {
                                var waitImg = new _waitImg();
                                waitImg.imgObj = $(l);
                                waitLoadImgs.push(waitImg);
                            }
                        });
                        if (_waitLoadImgsLength == waitLoadImgs.length) {
                            that._.sliderMembers[n].isLoaded = true;
                        }
                    }
                });
                return waitLoadImgs;
            })();
            if (!waitLoadImgs && waitLoadImgs.length > 0) {
                return;
            }
            //并行加载数据
            if(conf.parallelPreLoad){
                for(var p=0;p<waitLoadImgs.length;p++){
                    var waitImg=waitLoadImgs[p];
                    if (waitImg) {
                        waitImg.imgObj.attr("src", waitImg.imgObj.attr(conf.imgDepositSrc));
                        waitImg.imgObj.removeAttr(conf.imgDepositSrc);
                    }
                }
                callback.call(that, false);
                return;
            }

            var timeoutTimer = null, imgLoadedCount = 0;
            var _onImgLoaded = function (waitImg, index) {
                clearTimeout(timeoutTimer);
                if (waitImg) {
                    waitImg.imgObj.attr("src", waitImg.imgObj.attr(conf.imgDepositSrc));
                    waitImg.imgObj.removeAttr(conf.imgDepositSrc);
                }
                if (index && index < imgLoadedCount) {
                    return;
                }
                imgLoadedCount++;
                if (imgLoadedCount == waitLoadImgs.length) {
                    callback.call(that, true);
                } else {
                    callback.call(that, false);
                    _loadImg(waitLoadImgs[imgLoadedCount]);
                }
            };
            var _loadImg = function (waitImg) {
                if (!waitImg) {
                    return;
                }
                var src = waitImg.imgObj.attr(conf.imgDepositSrc);
                var img = new Image();
                img.src = src;
                setTimeout(function () {
                    if (!img.complete) {
                        timeoutTimer = setTimeout(function () {
                            _onImgLoaded();
                        }, 3000);
                        $(img).bind('onreadystatechange load', {index: imgLoadedCount}, function (event) {
                            _onImgLoaded(waitImg, event.data.index);
                        });
                    } else {
                        _onImgLoaded(waitImg);
                    }
                }, 25);
            };
            _loadImg(waitLoadImgs[imgLoadedCount]);
        };

        var _innerStateChange = function (to) {
            var cIndex = typeof(to) == "number" ? to : that._.inner.currentIndex, sliderMembers = that._.sliderMembers;
            $.each(sliderMembers, function (i, n) {
                n.bannerObj && n.bannerObj.removeClass(conf.style.bannerBtnSelected);
            });
            sliderMembers[cIndex].bannerObj && sliderMembers[cIndex].bannerObj.addClass(conf.style.bannerBtnSelected);
        };
        if (conf.extend.innerStateChange && typeof(conf.extend.innerStateChange) == "function") {
            _innerStateChange = conf.extend.innerStateChange;
        }
        var _spot = function (begin, next, callback) {
            var membersNum = that._.sliderMembers.length || 1, moveDir = 0;
            if (!(typeof(begin) != "undefined" && !isNaN(begin) && begin >= 0 && begin < membersNum && typeof(next) != "undefined" && !isNaN(next) && next >= 0 && next < membersNum)) {
                return;
            }
            if (begin == next) {
                return;
            }
            if (that._.inner.motioning) {
                return;
            }
            _preLoadImgs(next, conf.preLoadSliderNum, function (iscompleted) {
            });
            if (conf.naturalOrder && conf.naturalOrder != 0) {
                moveDir = conf.naturalOrder == 1 && begin > next ? -1 : 1;
            }
            //motion function
            var _motionFn = null;
            if (conf.extend.switchSpot && typeof(conf.extend.switchSpot) == "function") {
                _motionFn = conf.extend.switchSpot;
            } else {
                _motionFn = bulitINDef.motionFn[conf.animationType];
            }
            if (!_motionFn) {
                return;
            }

            //motion
            that._.inner.motioning = true;
            var _callback = callback && typeof(callback) == "funct ion" ? callback : function () {
            };
            var __endSpot = function (index, spotCompleted) {
                that._.inner.currentIndex = index;
                //_innerStateChange.call(that);//while motion end do
                _fireEvent("switchEnd");
                if (spotCompleted) {
                    that._.inner.motioning = false;
                    _fireEvent("spotCompleted");
                    _callback.call(that, true);
                } else {
                    _callback.call(that, false);
                }
            };
            _fireEvent("spotStart", next);
            _innerStateChange.call(that, next);//while motion begin do
            if (moveDir == 0) {
                _fireEvent("switchStart", next);
                _motionFn.call(that, that._.sliderMembers[begin].sliderObj, that._.sliderMembers[next].sliderObj, 0, conf.speed, function () {
                    __endSpot.call(that, next, true);
                });
            } else {
                var _speed = conf.speed / Math.abs(begin - next);
                var _doMotion = function (b, n) {
                    var beginObj = that._.sliderMembers[b].sliderObj, nextObj = that._.sliderMembers[n].sliderObj;
                    _fireEvent("switchStart", n);
                    _motionFn.call(that, beginObj, nextObj, moveDir, _speed, function () {
                        if (n == next) {
                            __endSpot.call(that, n, true);
                        } else {
                            __endSpot.call(that, n, false);
                            if(!that._.inner.motioning){
                                _speed=0;
                            }
                            begin > next ? _doMotion.call(that, b - 1, n - 1) : _doMotion.call(that, b + 1, n + 1);
                        }
                    });
                };
                _doMotion(begin, begin > next ? begin - 1 : begin + 1);
            }
        };

        var _eventInit = function () {
            var members = that._.sliderMembers, _mouseOverTimer;
            var _fn = function (i) {
                _stop();
                _goTo(i, function (isCompleted) {
                    if (isCompleted && conf.autoPlay) {
                        //when bannerbtn do complete whether play;
                        //_start();
                    }
                });
            };
            $.each(members, function (i, n) {
                if (conf.bannerEventType == "click") {
                    n.bannerObj && n.bannerObj.bind(conf.bannerEventType, function () {
                        _fn.call(that, i);
                    });
                }
                n.bannerObj && n.bannerObj.hover(function () {
                    if (conf.bannerEventType == "mouseover") {
                        _mouseOverTimer = setTimeout(function () {
                            $(n.bannerObj).addClass(conf.style.bannerBtnhover);
                            _fn.call(that, i)
                        }, conf.bannerEventMouseoverDelay);
                    } else {
                        $(n.bannerObj).addClass(conf.style.bannerBtnhover);
                    }
                }, function () {
                    $(n.bannerObj).removeClass(conf.style.bannerBtnhover);
                    clearTimeout(_mouseOverTimer ? _mouseOverTimer : null);
                });
                //mouseover stop
                var stopCarrier=conf.carrier.stopAPAear?$(conf.carrier.stopAPAear):(n.sliderObj?n.sliderObj:null);
                stopCarrier && stopCarrier.hover(function () {
                    _stop();
                }, function () {
                    _start();
                });
            });
        };

        function _init(){
            _eventInit();
            var membersNum = that._.sliderMembers.length;
            var index=conf.initSliderLoc;
            if (!(typeof(index) != "undefined" && !isNaN(index) && index >= 0 && index < membersNum)){
                index=0;
            }
            if(index==0){
                that._.inner.currentIndex=membersNum-1;
            }
            _goTo(index);
            _cleanMotion();
        };

        //stop and finish motion immediately
        var _cleanMotion=function(){
            if(conf.quickResponse){
                that._.inner.motioning=false;
                $.each(that._.sliderMembers,function(i,n){
                    n.sliderObj.stop(true,true);
                });
            }
        };
        //method implement
        function _start(begin) {
            if (!conf.autoPlay) {
                return;
            }
            _stop();
            that._.inner.autoPlayTimer = setInterval(function () {
                _next.call(that);
            }, conf.interval);
        }

        function _stop() {
            if (that._.inner.autoPlayTimer) {
                clearTimeout(that._.inner.autoPlayTimer);
            }
        }

        function _next() {
            _cleanMotion();
            var cIndex = that._.inner.currentIndex, membersNum = that._.sliderMembers.length;
            var next = cIndex >= membersNum - 1 ? 0 : cIndex + 1;
            _spot(cIndex, next);
        }

        function _prev() {
            _cleanMotion();
            var cIndex = that._.inner.currentIndex, membersNum = that._.sliderMembers.length;
            var next = cIndex == 0 ? membersNum - 1 : cIndex - 1;
            _spot(cIndex, next);
        }

        function _goTo(to, callback) {
            _cleanMotion();
            var cIndex = that._.inner.currentIndex, membersNum = that._.sliderMembers.length;
            if (!(typeof(to) != "undefined" && !isNaN(to) && to >= 0 && to < membersNum)) {
                return;
            }
            _spot(cIndex, to, callback);
        }

        this.start.implement(_start);
        this.stop.implement(_stop);
        this.next.implement(_next);
        this.prev.implement(_prev);
        this.goTo.implement(_goTo);

        //event implement
        function _onSwitchStart(fn, obj, overrideContext) {
            if (!$.isFunction(fn)) {
                return;
            }
            var _fn = function (ev, cIndex, member) {
                fn.call(overrideContext, ev, cIndex, member);
            };
            $(that).bind("switchStart", obj, _fn);
        }

        function _onSwitchEnd(fn, obj, overrideContext) {
            if (!$.isFunction(fn)) {
                return;
            }
            var _fn = function (ev, cIndex, member) {
                fn.call(overrideContext, ev, cIndex, member);
            };
            $(that).bind("switchEnd", obj, _fn);
        }

        function _onSpotStart(fn, obj, overrideContext) {
            if (!$.isFunction(fn)) {
                return;
            }
            var _fn = function (ev, cIndex, member) {
                fn.call(overrideContext, ev, cIndex, member);
            };
            $(that).bind("spotStart", obj, _fn);
        }

        function _onSpotCompleted(fn, obj, overrideContext) {
            if (!$.isFunction(fn)) {
                return;
            }
            var _fn = function (ev, cIndex, member) {
                fn.call(overrideContext, ev, cIndex, member);
            }
            $(that).bind("spotCompleted", obj, _fn);
        }

        this.onSwitchStart.implement(_onSwitchStart);
        this.onSwitchEnd.implement(_onSwitchEnd);
        this.onSpotStart.implement(_onSpotStart);
        this.onSpotCompleted.implement(_onSpotCompleted);

        _init();
        if (conf.autoPlay) {
            _start();
        }
    });

    this.Slider = Slider;
}.call(window);

