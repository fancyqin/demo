/**
 * Created by qinfan on 2016/8/2.
 */

// @require jquery.js,util.js,template.js,artDialog.js

;void function () {

    
    var tmpl = util.templatify(util.tpl("<!--## ContentTop ##-->\r\n<div class=\"obelisk-form select-country\">\r\n    <div class=\"search-box J-search\"><input type=\"text\" placeholder=\"{{-searchPlaceholder}}\"><button>{{-search}}</button></div>\r\n    <div class=\"tab-primary J-tab\">\r\n<!--## end ##-->\r\n<!--## ContentCenter ##-->\r\n    </div>\r\n    <div class=\"act J-action input-checkbox\">\r\n        <label class=\"checkbox\">\r\n            <input type=\"checkbox\" class=\"J-checkedAll\" value=\"\">\r\n            <span class=\"input-ctnr\"></span>\r\n            {{-selectAll}}\r\n            (<span class=\"J-count\"></span>/<span class=\"J-counts\"></span>)\r\n        </label>\r\n    </div>\r\n    <div class=\"country-content input-checkbox J-lists flags\">\r\n        <div class=\"search-box J-search-box\"></div>\r\n<!--## end ##-->\r\n<!--## ContentBottom ##-->\r\n    </div>\r\n</div>\r\n<!--## end ##-->\r\n\r\n\r\n<!--## countryArea ##-->\r\n<div class=\"country-area J-box\">\r\n    <div class=\"country-add J-country-add\"><i class=\"micon\">&#xe005;</i></div>\r\n</div>\r\n<!--## end ##-->\r\n\r\n<!--## countryItem ##-->\r\n<div class=\"country-item flags\" title=\"{{-countryTitle}}\" >\r\n    <span class=\"flag flag-{{-flag}}\">{{-countryName}}</span>\r\n    <span class=\"del J-del micon\" country-simple=\"{{-simpleCountry}}\" region=\"{{-region}}\"></span>\r\n</div>\r\n<!--## end ##-->\r\n\r\n<!--## noResult ##-->\r\n<div class=\"J-noResult\">{{-noResult}}</div>\r\n<!--## end ##-->"));


    var defaults = {
        el:'.J-country-select',
        input:'#country-select',
        url:'country.json',
        lang: {
            'zh-CN': {
                'artDialog': {
                    title: '选择国家/地区',
                    edit: '修改',
                    save: '保存',
                    cancel: '取消'
                },
                confirmTip: '您确定要清空{userName}的国家/地区吗？',
                selectAll: '全选',
                searchPlaceholder: '请输入国家/地区名称',
                search:'搜索',
                noResult:'没有搜索到todo'
            },
            'en-US': {
                'artDialog': {
                    title: 'Select country/region',
                    edit: 'Edit',
                    save: 'Save',
                    cancel: 'Cancel'
                },
                confirmTip: "Are you sure to clear {userName}'s country/region?",
                selectAll: 'Select All',
                searchPlaceholder:'todo',
                search:'todo',
                noResult:'todo'
            }
        },
        en: false
    };



    var SelectCountry = function (config) {
        this.conf = $.extend(true, {}, defaults,config);
        this.data = null;
        this.lang = this.conf.en ? this.conf.lang['en-US']:this.conf.lang['zh-CN'];

        this.init();

    };

    SelectCountry.prototype = {
        init: function(){
            this.renderHtml();
            this.bindEvent();
        },
        getJSON: function(cb){
            var _this = this;
            var conf = this.conf;
            $.ajax({
                type: "GET",
                cache: false,
                // async: false,
                url: conf.url,
                success:function (json){
                    if (!json) {
                        alert('Query Data Error.');
                        return false;
                    }
                    _this.data = json;
                    cb && cb(json);

                },
                error:function(){
                    alert('Query Data Error.');
                }
            })
        },
        renderHtml: function(){
            var _this = this;
            var el = this.conf.el,
                input = this.conf.input;
            this.getJSON(
                function(json){

                    var inputVal = $(input).val();
                    var $box,$add;

                    $(el).find('.J-box').remove();
                    // if ($(input).prop('disabled')){
                    //     return false;
                    // }
                    $(input).after(tmpl.countryArea());

                    $box = $(el).find('.J-box');

                    $add = $box.find('.J-country-add');

                    var inputVals = inputVal.split('@');

                    for (var i = 0;i < inputVals.length;i++){
                        _this.traversal(json,'countryRegion',inputVals[i],function(country){

                            var htmlConf = {
                                'flag':country['simpleCountry'].toLowerCase(),
                                'countryName': country['countryName'],
                                'simpleCountry':country['simpleCountry'],
                                'region':country['countinentRegion'],
                                'countryTitle':country['longCountryName']? country['parameterValue']:''
                            };


                            country['myChecked'] = true;
                            var counts = _this.data['countryCounts'][country['countinentRegion']];
                            if (counts){
                                _this.data['countryCounts'][country['countinentRegion']]++;
                            }else {
                                _this.data['countryCounts'][country['countinentRegion']] = 1;
                            }

                            $add.before(tmpl.countryItem(htmlConf));
                        })
                    }
                }
            )

        },
        traversal: function(json,key,value,cb){
            $.each(json['continentRegionMap'],function(i,n){
                $.each(n,function(j,m){
                    if (m[key]===value){
                        cb(m);
                    }
                })
            })
        },
        reset: function(){
            $(this.conf.input).val('');
            this.renderHtml();
        },
        bindEvent: function(){
            var _this = this;

            var el = _this.conf.el,
                input = _this.conf.input,
                lang = this.lang;
            var countryDialog = null;
            // 绑定事件

            //删除
            $(el).on('click','.J-del', function (e) {
                e.preventDefault();
                var $target = $(e.target);
                var region = $target.attr('region');
                var ctry = $target.attr('country-simple');
                var countries = _this.data['continentRegionMap'][region];

                $.each(countries,function(i,n){
                    if (ctry === n['simpleCountry']){
                        $target.closest('.country-item').remove();
                        var countryReg = n['countryRegion'];

                        var reg =  RegExp("@"+ countryReg +"@",'g'),
                            reg_begin = RegExp('^'+ countryReg +'@','g'),
                            reg_end = RegExp('@'+ countryReg +'$','g'),
                            reg_last = RegExp('^'+ countryReg +'$', 'g');

                        var vl = $(input).val().replace(reg, "@").replace(reg_begin,'').replace(reg_end,'').replace(reg_last,'');

                        n['myChecked'] = false;
                        _this.data['countryCounts'][n['countinentRegion']]--;
                        $(input).val(vl);
                    }
                })
            });
            //弹框
            $(el).on('click','.J-country-add',function(e){
                countryDialog = art.dialog({
                    title : lang.artDialog.title,
                    okVal : lang.artDialog.save,
                    cancelVal : lang.artDialog.cancel,
                    width : 800,
                    height : 510,
                    lock : true,
                    content : _this.getContentList(),
                    init : function(){
                        var content = this.content();
                        var tabs = $('.J-tab', content),
                            lists = $('.J-lists', content),
                            action = $('.J-action', content);
                        tabs.find('.item:first').addClass('active');
                        lists.find('.countries:first').addClass('active');
                        _this.changeNums(content);
                        _this.bindArtDialogEvent(content);
                    },
                    ok : function(){
                        _this.saveData(this.content())
                    },
                    cancel: function(){
                        //todo
                    },
                    close : function() {
                        countryDialog = null;
                    }
                });
            });


        },
        bindArtDialogEvent: function(content){
            var _this = this;
            var tabs = $('.J-tab', content),
                lists = $('.J-lists', content),
                selectedAll = $('.J-checkedAll', content),
                action = $('.J-action', content),
                $search = $('.J-search',content);

            tabs.on('click', '.item',function(e) {
                var thisRegion = $(this).attr('data-region');
                tabs.find('.item').removeClass('active');
                $(e.target).addClass('active');
                lists.find('.countries').removeClass('active');
                lists.find('.countries[data-region="'+thisRegion+'"]').addClass('active');

                _this.changeNums(content);

                e.preventDefault();
            });

            lists.on('change','input[type=checkbox]', function(e) {
                if($(this).closest('.J-search-box')){
                    var _check = $(this).prop('checked');
                    var _val = $(this).val();
                    lists.find('.countries input[type=checkbox][value="'+ _val +'"]').attr('checked',_check);
                }
                _this.changeNums(content);

            });
            selectedAll.on('change',function(){
                if ($(this).attr('checked')){
                    lists.find('.active input[type=checkbox]').attr('checked', true).trigger('change');
                }else{
                    lists.find('.active input[type=checkbox]').attr('checked', false).trigger('change');
                }
                _this.changeNums(content);
            });

            $search.on('keyup','input',function(e){

                var items =  lists.find('.countries input[type=checkbox]');
                var $search = lists.find('.J-search-box');
                //todo
                var val = $(this).val().replace(/\s/g,'_');

                // var reg = RegExp(val, 'gi');
                if(val){
                    tabs.hide();
                    lists.find('.active').removeClass('active');
                    $search.addClass('active').html('');
                    for (var i=0;i<items.length;i++){
                        var iN =  $(items[i]).val().toLowerCase().indexOf(val.toLowerCase());
                        if(iN > -1){
                            var thisHtml = $(items[i]).closest('.input-wrap').prop('outerHTML');
                            $search.append(thisHtml);
                        }
                    }

                    _this.changeNums(content);



                }else {

                    tabs.show();
                    $search.removeClass('active');
                    var region = tabs.find('.item.active').attr('data-region');

                    lists.find('.countries[data-region="'+region+'"]').addClass('active');

                    _this.changeNums(content);


                }

            })
        },
        changeNums: function(content){
            var tabs = $('.J-tab', content),
                lists = $('.J-lists', content),
                action = $('.J-action', content),
                allCount = $('.J-counts', content);
            var thisRegions = lists.find('.active input[type=checkbox]').length;
            var thisRegionsSel = lists.find('.active input[type=checkbox]:checked').length;
            var noResultTxt = {
                noResult: this.lang.noResult
            }
            allCount.html(thisRegions);
            tabs.find('.item.active').find('.J-count').html(thisRegionsSel);
            action.find('.J-count').html(thisRegionsSel);
            //全选状态
            if (thisRegions === thisRegionsSel){
                action.find('.J-checkedAll').attr('checked',true);
            }else{
                action.find('.J-checkedAll').attr('checked',false);
            }
            //搜索没结果
            if(thisRegions === 0 && $('.J-search-box.active').length>0){
                action.hide();
                $('.J-search-box').append(tmpl.noResult(noResultTxt));
            }else{
                var nr = $('.J-search-box .J-noResult');
                action.show();
                (nr.length >0) && nr.remove();
            }

        },
        getContentList: function(){
            var _this = this;

            if (!_this.data){
                console.error('without data!');
                return false;
            }
            var regions =  '',lists = '';

            var htmlTxt = {
                'searchPlaceholder':this.lang.searchPlaceholder,
                'search':this.lang.search,
                'selectAll':this.lang.selectAll
            }

            $.each(_this.data['continentRegionMap'],function(i,n){
                var num = _this.data['countryCounts'][i] || 0;
                var middle = '';
                regions = regions + '<a class="item" data-region="'+i+'" href="javascript:;">'+i+'(<span class="J-count">'+num+'</span>)</a>'

                lists = lists + '<div class="countries" data-region="'+i+'">';

                $.each(n,function(j,m){
                    middle = middle + '<label class="input-wrap"'+ (m['longCountryName'] && 'title="'+m['parameterValue']+'"') + '><input type="checkbox" '+ (m['myChecked'] && 'checked') +' value="'+ m['countryRegion']+'"><span class="input-ctnr"></span><span class="flag flag-'+m['simpleCountry'].toLowerCase()+'"></span>'+ m['countryName']+'</label>'
                });
                lists = lists + middle + '</div>'

            });

            var html = tmpl.ContentTop(htmlTxt) + regions + tmpl.ContentCenter(htmlTxt) + lists + tmpl.ContentBottom();

            return html;
        },
        saveData:function (content){
            var input = this.conf.input;
            var lists = $('.J-lists', content);

            var postData = [];
            var checks = lists.find('.countries input[type=checkbox]:checked');
            for(var i = 0;i<checks.length;i++){
                $(checks[i]).val() && postData.push($(checks[i]).val());

            }
            $(input).val(postData.join('@'));

            this.renderHtml();

        }


    }




    // exports
    if (typeof define === "function") { // amd & cmd
        define(function () {
            return SelectCountry;
        });
    } else if (typeof module !== "undefined" && "exports" in module) { // commonJS
        module.exports = SelectCountry;
    } else { // global
        window.SelectCountry = SelectCountry;
    }

}.call(this);












