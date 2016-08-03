// require jQuery
var util = function($){
    var util = {};
    var noop = function(){};
    var toString = Object.prototype.toString;

    /**
     * type
     */
    util.type = function(o){
        var _type;
        var r_native = /\{\s*\[native\s*code\]\s*\}/i;

        if(o === null){
            //for IE, use toString, it's '[object Object]'
            //for FF/Opera, it's '[object Window]'
            _type = 'null';
        }else if(typeof o === 'undefined'){
            //for IE, use toString, it's '[object Object]'
            //for FF/Opera, it's '[object Window]'
            _type = 'undefined';
        }else{
            _type = Object.prototype.toString.call(o).match(/\w+/g)[1].toLowerCase();

            //IE native function
            if(_type === 'object' && r_native.test(o + '')){
                _type = 'function';
            }
        }

        return _type;
    };

    /*
     * trim
     */
    util.trim = function(str){
        return (str + '').replace(/^[\s\u00A0]+|[\s\u00A0]+$/g, '');
    };

    /*
     * JSON
     */
    util.JSON = function(JSON){
        var _JSON = {};
        if(JSON){
            _JSON.stringify = JSON.stringify;
        }else{
            _JSON.stringify = function(){ return '' };
        }

        _JSON.parse = function(jsonStr){
            var ret;

            if(util.type(jsonStr) === 'string'){
                try{
                    ret = new Function('return ' + jsonStr)();
                }catch(ex){
                    ret = {};
                }
            }else{
                ret = jsonStr;
            }

            return ret;
        };

        return _JSON;
    }.call(this, window.JSON);


    /**
     * extend
     */
    util.extend = function(){
        var me = arguments.callee;
        var start, override;

        if(util.type(arguments[0]) !== 'object'){
            start = 1;
            override = !!arguments[0];
        }else{
            start = 0;
            override = false;
        }

        var tar = arguments[start] || {};
        var args = [].slice.call(arguments, start + 1);

        var tmp;
        var type;
        while(args.length){
            tmp = args.shift();
            if(util.type(tmp) !== 'object'){
                continue;
            }

            var t;
            for(var key in tmp){
                t = tmp[key];

                if(util.type(t) === 'object'){
                    if(t == window || t == document || ('childNodes' in t && 'nextSibling' in t && 'nodeType' in t)){
                        if(!(!override && (key in tar))){
                            tar[key] = t;
                        }

                        continue;
                    }

                    type = util.type(tar[key]);
                    if(!(key in tar) || type === 'undefined' || type === 'null'){
                        tar[key] = {};
                    }

                    if(util.type(tar[key]) === 'object'){
                        me(override, tar[key], t);
                    }
                }else if(!(!override && (key in tar))){
                    tar[key] = t;
                }

            }
        }

        return tar;
    };

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var nativeIndexOf = Array.prototype.indexOf;
    var nativeSome = Array.prototype.some;
    var nativeFilter = Array.prototype.filter;
    var nativeMap = Array.prototype.map;
    var breaker = {};

    // each
    var each = util.each = function(obj, iterator, context) {
        if (obj == null) return;
        if ([].forEach && obj.forEach === [].forEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            for (var key in obj) {
                if (util.has(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) return;
                }
            }
        }
    };

    util.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };

    // Keep the identity function around for default iterators.
    util.identity = function(value) {
        return value;
    };

    // Determine if at least one element in the object matches a truth test.
    // Delegates to **ECMAScript 5**'s native `some` if available.
    // Aliased as `any`.
    var any = util.some = util.any = function(obj, iterator, context) {
        iterator || (iterator = util.identity);
        var result = false;
        if (obj == null) return result;
        if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
        each(obj, function(value, index, list) {
            if (result || (result = iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };

    // Return the first value which passes a truth test. Aliased as `detect`.
    util.find = util.detect = function(obj, iterator, context) {
        var result;
        any(obj, function(value, index, list) {
            if (iterator.call(context, value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };

    // Determine if the array or object contains a given value (using `===`).
    // Aliased as `include`.
    util.contains = util.include = function(obj, target) {
        if (obj == null) return false;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
        return any(obj, function(value) {
            return value === target;
        });
    };

    // Return all the elements that pass a truth test.
    // Delegates to **ECMAScript 5**'s native `filter` if available.
    // Aliased as `select`.
    util.filter = util.select = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
        each(obj, function(value, index, list) {
            if (iterator.call(context, value, index, list)) results[results.length] = value;
        });
        return results;
    };

    // Return the results of applying the iterator to each element.
    // Delegates to **ECMAScript 5**'s native `map` if available.
    util.map = util.collect = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function(value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        });
        return results;
    };

    util.invert = function(obj) {
        var result = {};
        for (var key in obj) if (util.has(obj, key)) result[obj[key]] = key;
        return result;
    };

    util.keys = Object.keys || function(obj) {
            if (obj !== Object(obj)) throw new TypeError('Invalid object');
            var keys = [];
            for (var key in obj) if (util.has(obj, key)) keys[keys.length] = key;
            return keys;
        };

    // Retrieve the values of an object's properties.
    util.values = function(obj) {
        var values = [];
        for (var key in obj) if (util.has(obj, key)) values.push(obj[key]);
        return values;
    };

    // List of HTML entities for escaping.
    var entityMap = {
        escape: {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        }
    };

    entityMap.unescape = util.invert(entityMap.escape);

    // Regexes containing the keys and values listed immediately above.
    var entityRegexes = {
        escape:	 new RegExp('[' + util.keys(entityMap.escape).join('') + ']', 'g'),
        unescape: new RegExp('(' + util.keys(entityMap.unescape).join('|') + ')', 'g')
    };

    // Functions for escaping and unescaping strings to/from HTML interpolation.
    util.each(['escape', 'unescape'], function(method) {
        util[method] = function(string) {
            if (string == null) return '';
            return ('' + string).replace(entityRegexes[method], function(match) {
                return entityMap[method][match];
            });
        };
    });

    /*
     * indexOf
     */
    util.indexOf = function(items, value){
        if(items.indexOf){
            return items.indexOf(value);
        }

        var ret = -1;
        var i = 0, len = items.length;
        for(; i < len; i++){
            if(items[i] === value){
                ret = i;
                break;
            }
        }

        return ret;
    };

    /*
     * unique array
     */
    util.unique = function(arr){
        var ret = [];

        for(var i = 0, len = arr.length; i < len; i++){
            if(util.indexOf(ret, arr[i]) === -1){
                ret.push(arr[i]);
            }
        }

        return ret;
    };

    /*
     * random  -- Int
     */
    util.random = function(){
        var cache = {};

        return function(min, max, clear){
            min = min || 0;
            max = util.type(max) === 'number' && !isNaN(max)
                ? max === min
                ? max + 10
                : max
                : min + 10;

            var group = min + '_' + max;

            if(!cache[group]){
                cache[group] = [];
            }

            if(cache[group].length === max - min){
                cache[group] = [];
                util.type(clear) === 'function' && clear.call(this);
            }

            var ret;
            while(true){
                ret = min + ~~(Math.random() * (max - min));
                if(util.indexOf(cache[group], ret) === -1){
                    cache[group].push(ret);
                    break;
                }
            }

            return ret;
        };
    }.call(this);

    /**
     * format
     */
    util.format = function(){
        var day = 24 * 60 * 60;
        var hour = 60 * 60;
        var minute = 60
        var second = 1;

        var calcular = function(last){
            var days = Math.floor(last / day);
            var hours = Math.floor((last - days * day) / hour);
            var minutes = Math.floor((last - days * day - hours * hour) / minute);
            var seconds = Math.floor((last - days * day - hours * hour - minutes * minute) / second);

            return {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        };

        var pad = function(num){
            return num < 10 ? ('0' + num) : (num + '');
        };

        return function(sec, tmpl){
            tmpl = tmpl || 'HH:mm:ss';

            var time = calcular(sec);
            var data = {
                HH: pad(time.hours),
                mm: pad(time.minutes),
                ss: pad(time.seconds)
            };

            return tmpl.replace(/\w+/g, function($1){
                return data[$1];
            });
        };
    }.call(this);


    /**
     * 数字格式化
     */
    util.formatNumber = function(num){
        return (num + '').replace(/(?=(?:\B\d{3})+)(?:\.\d+|$)/g, ',');
    };


    /**
     * flash 可用性检测
     */
    util.flash = function(nav, plugs){
        var flash = {
            enabled: false,
            version: 0
        };

        //flash check
        var SHOCKWAVE_FLASH = "Shockwave Flash";
        var SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash";
        var FLASH_MIME_TYPE = "application/x-shockwave-flash";

        var rv = /\d+/g;

        var hasFlash = false;

        try{
            var ax = new ActiveXObject(SHOCKWAVE_FLASH_AX);

            if(ax){
                flash = {
                    enabled: true,
                    version: ax.GetVariable("$version").match(rv).join('.')
                };
            }
        }catch(ex){
            if(plugs && plugs[SHOCKWAVE_FLASH] && plugs[SHOCKWAVE_FLASH].description && !(nav.mimeTypes && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)){ // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
                flash = {
                    enabled: true,
                    version: /\d+\.\d+/.exec(plugs[SHOCKWAVE_FLASH].description)[0]
                };
            }
        }

        return flash;

    }.call(this, window.navigator, window.navigator.plugins);

    /*
     * log4js
     */
    util.console = function(console){
        var logStat = false;
        var noop = function(){};

        var SWITCH = {
            ON: true,
            OFF: false
        };

        var _loger = {
            SWITCH: SWITCH,
            turn: function(stat){
                logStat = SWITCH[!!stat ? 'ON' : 'OFF'];
            },
            log: noop,
            info: noop,
            warn: noop,
            error: noop,
            debug: noop
        };

        if(!console){
            return _loger;
        }

        if(!console.debug){
            console.debug = console.log;
        }

        if(!console.error){
            console.error = console.warn;
        }

        return util.extend(true, _loger, {
            log: function(msg){
                if(logStat === SWITCH.ON){
                    console.log(msg);
                }
            },
            info: function(msg){
                if(logStat === SWITCH.ON){
                    console.info(msg);
                }
            },
            warn: function(msg){
                if(logStat === SWITCH.ON){
                    console.warn(msg);
                }
            },
            error: function(msg){
                if(logStat === SWITCH.ON){
                    console.error(msg);
                }
            },
            debug: function(msg){
                if(logStat === SWITCH.ON){
                    console.debug(msg);
                }
            }
        });
    }.call(window, window.console);

    /**
     * 图片预加载
     * // IE7 可能存在中止访问的报错，请保证调用 preload 时，页面已经加载完成
     */
    util.preload = function(){
        var cache = document.createElement('div');
        cache.style.cssText = 'position:absolute; top:0; left:0; width:1px; height:1px; overflow:hidden;';

        var isAppended = false;
        var appendCache = function(){
            !isAppended && document.body.appendChild(cache);
            isAppended = true;
        };

        var noop = function(){};

        return function(src, callback){
            appendCache();

            callback = (typeof callback === 'function') ? callback : noop;
            var img = document.createElement('img');

            var clear = function(){
                try{
                    img.onload = img.onerror = noop;
                    cache.removeChild(img);
                }catch(ex){}
            };

            var succ = function(){
                setTimeout(function(){
                    callback.call(img, img);
                    clear();
                }, 0);
            };

            img.onload = succ;
            img.onerror = clear;

            img.src = src;
            cache.appendChild(img);

            if(img.complete){
                succ();
            }
        };
    }.call(this);


    /**
     * 窗口滚动
     */
    util.scrollTo = function(left, top, doAnimate){
        top = top || 0;
        left = left || 0;

        /*document.documentElement.scrollTop = document.body.scrollTop = top;
         document.documentElement.scrollLeft = document.body.scrollLeft = left;*/

        if(doAnimate){
            $('html,body').animate({scrollTop: top, scrollLeft: left}, 404);
        }else{
            window.scroll(left, top);
        }
    };


    /**
     * 元素绝对位置
     */
    util.rect = function(elem){
        elem = $(elem)[0];
        var scrollTop = window.scrollTop || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var scrollLeft = window.scrollLeft || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

        var rect = elem.getBoundingClientRect();

        // ie6/7 的 top, left 值 包含了浏览器边框(2px)
        if($.browser.msie && $.browser.version <= 7){
            rect = {
                top: rect.top - 2,
                left: rect.left - 2
            };
        }

        return {
            top: scrollTop + rect.top,
            left: scrollLeft + rect.left
        };
    };


    /**
     * domain信息
     */
    util.domain = {
        main: '',
        toMain: function(){
            return '';
        },
        isCross: function(){
            return true;
        }
    };

    var main_domain = /[\w\-\_]+\.[\w\-\_]+$/.exec(window.location.hostname || '');
    if(main_domain){
        main_domain = main_domain[0];
        util.domain = {
            main: main_domain,
            toMain: function(){
                return document.domain = main_domain;
            },
            isCross: function(){
                return document.domain !== window.location.hostname;
            }
        };
    }


    /**
     * 浅拷贝
     */
    util.copy = function(o){
        var me = arguments.callee;
        var copy;
        var type = toString.call(o).match(/\w+/g)[1].toLowerCase();

        if(type === 'object'){
            copy = $.extend(true, {}, o);
        }else if(type === 'array'){
            copy = [];
            $(o).each(function(i, item){
                copy.push(me(item));
            });
        }

        return copy;
    };

    /**
     * url增补参数
     */
    util.url = function(url, newParams){
        var r_paramsSection = /\?(.+?)(#.*)?$/;
        var r_replace = r_paramsSection;
        var oriParams = {};
        var oriParamsStr = r_paramsSection.exec(url);
        if(oriParamsStr){
            var r_params = /(\w+)\=(\w*)/g;
            oriParamsStr[1].replace(r_params, function(section, key, value){
                oriParams[key] = value;
            });
        }else{
            r_replace = /(\b|\B)(#.*)?$/;
        }

        var params = $.extend(true, {}, oriParams, newParams);

        var search = [];
        for(var key in params){
            search.push(key + '=' + params[key]);
        }

        return url.replace(r_replace, '\?' + search.join('&') + '$2');
    };


    /**
     * cookie 操作
     */
    util.cookie = function(win, doc){
        var defaults = {
            //domain: win.location.hostname,
            //path: win.location.pathname//,
            //expires: 24 * 60 * 60 * 1000
        };

        var get = function(key){
            var reg = new RegExp('(?:^|;\\s*)' + key + '\\=([^;]*)');
            var ret = reg.exec(doc.cookie);
            return ret ? ret[1] : ret;
        };

        var set = function(key, value, domain, path, expires){
            var cache = [key, '=', value + ''];

            if(domain){
                cache.push('; ', 'domain=', domain.toString());
            }

            if(path){
                cache.push('; ', 'path=', path.toString());
            }

            if(expires && typeof expires === 'number' && !isNaN(expires)){
                expires = new Date().valueOf() + expires;
                expires = new Date(expires);
            }

            if(expires && expires.valueOf && expires.toUTCString){
                cache.push('; ', 'expires=', expires.toUTCString());
            }

            return document.cookie = cache.join('');
        };

        var del = function(keys){
            if(typeof keys === 'string'){
                keys = keys.split(/[\s\,\;]+/);
            }

            if(!keys.length){
                return;
            }

            for(var i = 0; i < keys.length; i++){
                set(keys[i], null, null, null, -1);
            }
        };

        var delAll = function(){
            var cookie = doc.cookie;
            var reg = /([^;=\s]*)\=/g;
            var cache = [];

            reg.exec('');
            var ret = null;
            while(ret = reg.exec(cookie)){
                cache.push(ret[1]);
            }

            del(cache);
        };

        var fn = function(key, value, options){
            if(!key){
                return;
            }

            if(value !== undefined){
                options = $.extend(true, {}, defaults, options);
                return set(key, value, options.domain, options.path, options.expires);
            }else{
                return get(key);
            }
        };

        fn.get = get;
        fn.set = set;
        fn.del = del;
        fn.delAll = delAll;

        return fn;
    }(window, document);


    /**
     * 视窗尺寸
     */
    util.winSize = function(){
        var win = window;
        var doc = document;

        var docE = doc.documentElement;
        var body = doc.body;

        return {
            width: win.innerWidth || docE.clientWidth || body.clientWidth || 0,
            height: win.innerHeight || docE.clientHeight || body.clientHeight || 0
        };
    };

    /**
     * 模板字符串初始化
     */
    util.tpl = function(tpl, r_block){
        r_block = r_block || /\<\!--\s*#+\s*([\w\.]+)\s*#+\s*--\>([\w\W]*?)\<\!--\s*#+\s*end\s*#+\s*--\>/gi;
        tpl = tpl.toString() || '';

        r_block.exec('');

        var chips = {};
        var result = null;

        while(result = r_block.exec(tpl)){
            var names = result[1].split('.');
            var root = chips;
            while(names.length){
                var name = names.shift();
                if(!(name in root)){
                    root[name] = {};
                }

                if(!names.length){
                    root[name] = result[2].replace(/^[\s\u00A0]+|[\s\u00A0]+$/g, '');
                }

                root = root[name];
            }
        };

        return chips;
    };

    /**
     * 模板字符串对象合集 全部模板化
     */
    util.templatify = function(){
        var emptyTmpl = function(){return ''};
        var toStr = Object.prototype.toString;

        var _templatify = function(tpl){
            var tmpl = emptyTmpl;

            if(typeof tpl === 'string'){
                tmpl = template(tpl);
            }else if(toStr.call(tpl) === '[object Object]'){
                tmpl = {};

                for(var key in tpl){
                    tmpl[key] = util.templatify(tpl[key]);
                }
            }

            return tmpl;
        };

        return _templatify;
    }.call(this);

    /**
     * 等比缩放工具
     */
    util.zoom = function(size, config){
        var cfg = {
            maxWidth: 280,
            maxHeight: 280,
            minWidth: 1,
            minHeight: 1,
            mode: util.zoom.MODE.MAX
        };

        cfg = $.extend(true, cfg, config);

        var scale = size.width / size.height;
        var ret = {};

        if(cfg.mode === util.zoom.MODE.MAX){ //限制最大值模式
            if(size.width > cfg.maxWidth || size.height > cfg.maxHeight){
                var scaleMax = cfg.maxWidth / cfg.maxHeight;

                if(scale >= scaleMax){
                    ret.width = cfg.maxWidth;
                    ret.height = ret.width / scale;
                }else{
                    ret.height = cfg.maxHeight;
                    ret.width = ret.height * scale;
                }
            }else{
                ret = $.extend(true, ret, size);
            }
        }else if(cfg.mode === util.zoom.MODE.MIN){ //限制最小值模式
            if(size.width < cfg.minWidth || size.height < cfg.minHeight){
                var scaleMin = cfg.minWidth / cfg.minHeight;

                if(scale >= scaleMin){
                    ret.height = cfg.minHeight;
                    ret.width = ret.height * scale;
                }else{
                    ret.width = cfg.minWidth;
                    ret.height = ret.width / scale;
                }
            }else{
                ret = $.extend(true, ret, size);
            }
        }

        return ret;
    };

    util.zoom.MODE = { //限制模式
        MAX: 'max',
        MIN: 'min'
    };

    /**
     * 元素等比缩放，内容居中
     */
    util.BCenter = function(elem, config, size){
        if(!elem){
            return;
        }

        var cfg = {
            mode: util.BCenter.MODE.PADDING,
            height: 340, //容器高度
            width: 340,	//容器宽度
            limitMode: util.zoom.MODE.MAX
        };

        cfg = $.extend(true, cfg, config);
        size = size || { width: elem.clientWidth, height: elem.clientHeight };

        var css = util.zoom(size, {
            maxWidth: cfg.width,
            maxHeight: cfg.height,
            minWidth: cfg.width,
            minHeight: cfg.height,
            mode: cfg.limitMode
        });

        var top = (cfg.height - css.height) / 2;
        var left = (cfg.width - css.width) / 2;

        css[(cfg.mode + 'Top').replace(/\w/, function($1){return $1.toLowerCase()})] = top;
        css[(cfg.mode + 'Left').replace(/\w/, function($1){return $1.toLowerCase()})] = left;
        css[(cfg.mode + 'Right').replace(/\w/, function($1){return $1.toLowerCase()})] = left;
        css[(cfg.mode + 'Bottom').replace(/\w/, function($1){return $1.toLowerCase()})] = top;

        $(elem).css(css);
    };

    util.BCenter.MODE = { //居中模式
        PADDING: 'padding',	//内边距居中模式
        MARGIN: 'margin',	//外边距居中模式
        POSITION: '' //浮动模式，需要元素本身为定位元素
    };


    /**
     * 数据适配器
     */
    util.Adapter = function(dic, deep){
        this._ = {};
        this.config = util.extend(true, {}, dic);
        this._.deep = !!deep;
        this.init();
    };

    util.Adapter.prototype = {
        init: function(){
            this._.dic = this.config;
            this._.rdic = {};
            for(var key in this.config){
                this._.rdic[this.config[key]] = key;
            }
        },
        __parse: function(data, dic, deep){
            var type = util.type(data);
            var ret;

            switch(type){
                case 'object': {
                    ret = {};
                    for(var key in data){
                        ret[key in dic ? dic[key] : key] = (deep && /object|array/.test(util.type(data[key]))) ? this.__parse(data[key], dic, deep) : data[key];
                    }
                }; break;
                case 'array': {
                    ret = [];
                    for(var i = 0; i < data.length; i++){
                        ret.push(this.__parse(data[i], dic, deep));
                    }
                }; break;
                default: {
                    ret = dic[data] || data;
                };
            }

            return ret;
        },
        parse: function(data, dic, deep){
            return this.__parse(data, dic || this.config, deep || this._.deep);
        },
        reverse: function(data, dic, deep){
            this.init();
            return this.__parse(data, dic || this._.rdic, deep || this._.deep);
        },
        filter: function(data, keep, deep){
            keep = ',' + keep.split(/[,;_@ ]+/).join(',') + ',';
            var type = util.type(data);

            var ret;
            switch(type){
                case 'object': {
                    var ret = {};
                    for(var key in data){
                        if(keep.indexOf(',' + key + ',') !== -1){
                            ret[key] = (deep && /object|array/.test(util.type(data[key]))) ? this.filter(data[key], keep, deep) : data[key];
                        }
                    }
                }; break;
                case 'array': {
                    var ret = [];
                    for(var i = 0; i < data.length; i++){
                        ret.push(this.filter(data[i], keep, deep));
                    }
                }; break;
                default: {
                    if(keep.indexOf(',' + data + ',') !== -1){
                        ret = data;
                    }
                };
            }

            return ret;
        }
    };


    /**
     * 表单数据序列化
     */
    var default_serialize = {
        sep: '',
        isJoin: true,
        filter: function($elems){return $elems.filter(function(){return !this.disabled});},
        special: {
            names: [
                /*
                 {
                 rule: function(name){}; /  /regex/gi,
                 name: 'namespace'
                 }
                 */
            ],
            values: {
                /*name: function(elemsAsName, name){return data} */
            }
        }
    };

    util.Serialize = function(config){
        this._ = {};
        this.config = util.extend(true, {}, default_serialize, config);
        this.init();
    };

    util.Serialize.prototype = {
        init: function(){},
        parse: function(form, filter){
            var _this = this;
            var $wrap = $(form);
            //$wrap.append(form);

            filter = filter || this.config.filter;

            var $els = $wrap.find('input[name],textarea[name],select[name]');
            /*$els = $els.filter(function(i, el){
             if(el.tagName.toLowerCase() === 'input'){
             if(el.type === 'radio' || el.type === 'checkbox'){
             return el.checked;
             }else{
             return true;
             }
             }else{
             return true;
             }
             });*/

            $els = filter($els);

            var orderEls = {};
            var name;
            $els.each(function(i, el){
                name = _this.__getName(el.name);
                if(!orderEls[name]){
                    orderEls[name] = [];
                }

                orderEls[name].push(el);
            });

            var data = {};

            $.each(orderEls, function(name, els){
                data[name] = _this.__getValue(name, els);
            });

            return data;
        },
        __getName: function(name){
            var names = this.config.special.names;
            var ret = name;
            var type;
            var match;

            for(var i = 0; i < names.length; i++){
                type = util.type(names[i].rule);

                if(type === 'regexp'){
                    names[i].rule.exec('');
                    match = names[i].rule.exec(name);
                    match = !!(match && match.length);

                    if(match){
                        ret = names[i].name;
                        break;
                    }
                }else if(type === 'function'){
                    match = !!names[i].rule(name);

                    if(match){
                        ret = names[i].name;
                        break;
                    }
                }
            }

            return ret;
        },
        __getValue: function(name, els){
            var data;

            if(name in this.config.special.values){
                data = this.config.special.values[name]($(els), name);
            }else{
                data = [];
                $(els).each(function(i, el){
                    if(el.tagName.toLowerCase() === 'input' && (el.type === 'checkbox' || el.type === 'radio')){
                        if(el.checked){
                            data.push(el.value);
                        }
                    }else{
                        data.push(el.value);
                    }
                });

                if(data.length <= 1 || this.config.isJoin){
                    data = data.join(this.config.sep || ',');
                }
            }

            return data;
        }
    };

    /**
     * 获取js文件目录
     */
    util.path = function(tar, tagname){
        for(var scripts = document.getElementsByTagName((tagname || "script").toLowerCase()), i = 0; i < scripts.length; i++){
            var s = scripts[i].src;
            if(s && 0 <= s.indexOf(tar)){
                return s.substr(0, s.indexOf(tar));
            }
        }

        return "";
    };


    /**
     * 专用的 radio checkbox 切换选中 的绑定事件方法
     * [options] 可选参数
     * [options.radioChanged = group] 变更触发类型。  each 每个元素都单独触发，group 一组触发一次变化
     */
    util.onCheckedChange = function(selector, options, callback){
        if(typeof options === 'function'){
            callback = options;
            options = {radioChanged: 'group'};
        }else{
            options = $.extend(true, {radioChanged: 'group'}, options);
        }

        var $selector = $(selector);
        var radios = [];

        $selector.filter(':radio').each(function(i, el){
            var name = el.name;
            var form = $(el).closest('form')[0] || document.body;

            if(!$.grep(radios.slice(0), function(radio){return radio.name === el.name && radio.form === form;}).length){
                radios.push({
                    name: name,
                    form: form
                });
            }
        });

        $selector = $selector.not(':radio');

        $.each(radios, function(i, radio){
            radio.items = $('input:radio[name="' + radio.name + '"]', radio.form);
            $selector = $selector.add(radio.items);
        });


        $selector.each(function(i, el){
            if(!el || !/input/i.test(el.tagName) || !/checkbox|radio/.test(el.type)){
                return;
            }

            callback = (typeof callback === 'function') ? callback : noop;

            var $el = $(el);

            $el.bind('checkedChange', function(e, data){
                callback.call(el, data);
            });

            // 若曾绑定过，则无需下面两个事件绑定
            if($el.data('__checkedChangeBounded__')){
                return;
            }

            el.checkedChanged = function(){
                $el.trigger('checkedChange', {checked: !!el.checked});

                if(options.radioChanged === 'each' && el.type === 'radio' && el.checked){
                    $.each(radios, function(i, radio){
                        if(radio.name === el.name && radio.items.filter(function(){return this === el}).length){
                            radio.items.not(el).each(function(){
                                $(this).trigger('checkedChange', {checked: !!this.checked});
                            });
                        }
                    });
                }
            };

            $el.parent().click(function(e){
                setTimeout(el.checkedChanged, 0);
            });

            $el.data('__checkedChangeBounded__', true);

        });
    };


    /**
     * 表单状态类
     */
    util.FormStatus = function(selector, filter){
        this.filter = (typeof filter === 'function' ? filter : null);

        this.parser = new util.Serialize();
        this.forms = $(selector || 'form');

        this.originalData = this.__getData();

        this.changed = false;
    };

    util.FormStatus.prototype = {
        isChanged: function(name){
            if(!name && this.changed){
                return this.changed;
            }

            var _this = this;

            var changed = false;
            var currData = this.__getData();
            var oriData = this.originalData;

            if(name){
                $.each(currData, function(i, data){
                    if(data[name] !== oriData[i][name]){
                        changed = true;
                    }
                });

                return changed;
            }else{
                $.each(currData, function(i, data){
                    if(!_this.__equal(data, oriData[i])){
                        changed = true;
                        return false;
                    }
                });
            }

            return (this.changed = changed);
        },
        __equal: function(obj1, obj2){
            //var equal = true;
            var key1 = [];
            var key2 = [];

            for(var key in obj1){
                key1.push(key);
            }

            for(var key in obj2){
                key2.push(key);
            }

            // key 数量不一致，不等
            if(key1.length !== key2.length){
                return false;
            }


            var d1;
            var d2;
            var key;
            for(var i = 0; i < key2.length; i++){
                var key = key2[i];

                // key 名不一致，不等
                if(!(key in obj1)){
                    return false;
                }

                d1 = obj1[key];
                d2 = obj2[key];

                var type1 = util.type(d1);
                var type2 = util.type(d2);

                // 相同 key，值类型不同， 不等
                if(type1 !== type2){
                    return false;
                }

                // 字符串值 不同， 不等
                if(type1 === 'string'){
                    if(d1 !== d2){
                        return false;
                    }
                }

                // 数组数据
                if(type1 === 'array'){
                    // 数组长度不同, 不等
                    if(d1.length !== d2.length){
                        return false;
                    }

                    // 数组数据不一致，不等
                    if(d1.join('#_#') !== d2.join('#_#')){
                        return false;
                    }
                }
            }

            return true;
        },
        filter: function(){

        },
        __getData: function(){
            var data = [];
            var _this = this;

            this.forms.each(function(){
                data.push(_this.parser.parse(this, _this.filter));
            });

            return data;
        }
    };


    /**
     * 自动填表
     */
    util.FormHelper = function(form, dic){
        this._ = {};
        this._.dic = dic || {};
        this._.form = $(form);

        this.__init();
    };

    util.FormHelper.prototype = {
        __init: function(){},
        __getElem: function(name, form){
            var elem = null;

            elem = $('[name=' + name + ']', form);

            if(!elem.length){
                elem = $('#' + name, form);
            }

            return elem;
        },
        fill: function(data, dic, form){
            var dic = util.extend(true, {}, this._.dic, dic);
            form = form || $(this._.form);

            var key;
            var value;

            for(var name in data){
                key = name;

                if(key in dic){
                    key = dic[key];
                }

                value = data[name];

                var $el = this.__getElem(key, form);

                if($el.length && /input/i.test($el[0].tagName) && /checkbox|radio/i.test($el[0].type)){
                    value = util.type(value) === 'array' ? value.join('$$$$$$$$$$$').split('$$$$$$$$$$$') : (value + '').split(/[\s,]+/);
                }

                $el.val(value);
            }
        },
        reset: function(form){
            var $form = $(form || this._.form);

            $form.each(function(i, form){
                form.reset();
            });
        }
    };

    /**
     * 简单的jQuery元素显示和隐藏动画绑定
     * @require jQuery
     **/
    if(window.jQuery){
        jQuery.fn.appear = function(delay){
            $(this).each(function(i, el){
                var $dom = $(el);
                clearTimeout($dom.data('disappearTimer'));

                $dom.show()
                    .stop(false, true)
                    .animate({
                        opacity: 1
                    }, 300, function(){
                        $dom.data('disappearTimer', setTimeout(function(){
                            $dom.disappear();
                        }, delay || 5000));
                    });
            });
        };

        jQuery.fn.disappear = function(){
            $(this).each(function(i, el){
                var $dom = $(el);
                $dom.stop(false, true)
                    .animate({
                        opacity: 1
                    }, 300, function(){
                        $dom.hide();
                    });
            });
        };
    }

    /**
     * 禁止滚动内容到顶部/底部时，开始滚动页面
     */
    if(window.jQuery){
        util.stopScrollPage = function(){
            var type = $.browser.mozilla && !(!window.ActiveXObject && /function[\s\S]+?\[native\s+code\]/.test(window.ActiveXObject + '')/* ie 11+ */);

            var handle = function(e){
                e.preventDefault();
                var delta = e.originalEvent[type ? "detail" : "wheelDelta"];

                if(!type){
                    delta = -delta;
                }

                this.scrollTop += delta > 0 ? 56 : -56;
            };

            return function(elem){
                var event = type ? 'DOMMouseScroll' : 'mousewheel';
                $(elem).bind(event, handle);
            };
        }.call(this);
    }


    return util;
}.call(this, window.jQuery);