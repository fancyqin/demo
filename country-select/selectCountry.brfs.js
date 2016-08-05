/**
 * Created by qinfan on 2016/8/2.
 */

// @require jquery.js,util.js,template.js,artDialog.js

;void function () {

    var fs = require('fs');
    var tmpl = util.templatify(util.tpl(fs.readFileSync('./selectCountry.tpl', 'utf-8')));


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
                assignTip: '表示已分配',
                selectedAll: '全选',
                'prompt': {
                    changeAssignSucc: '国家/地区负责人修改成功！',
                    changeAssignErr: '系统错误！',
                    assign: '已分配给'
                }
            },
            'en-US': {
                'artDialog': {
                    title: 'xxx todo',
                    edit: 'Edit',
                    save: 'Save',
                    cancel: 'Cancel'
                },
                confirmTip: "Are you sure to clear {userName}'s country/region?",
                assignTip: 'is Already Assigned',
                selectedAll: 'Select All',
                'prompt': {
                    changeAssignSucc: 'Person in charge of country/region  changed successfully.',
                    changeAssignErr: 'System Error.',
                    assign: 'Assigned to '
                }
            }
        }
    };



    var SelectCountry = function (config) {
        this.conf = $.extend(true, {}, defaults,config);
        this.data = null;

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
                async: false,
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
                                'region':country['countinentRegion']

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
                lang = _this.conf.lang['zh-CN'];
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
                _this.changeNums(content);

            });
            selectedAll.on('change',function(){
                if ($(this).attr('checked')){
                    lists.find('.countries.active input[type=checkbox]').attr('checked', true);
                }else{
                    lists.find('.countries.active input[type=checkbox]').attr('checked', false);
                }
                _this.changeNums(content);
            });

            $search.on('keyup','input',function(e){

                var items =  lists.find('.countries input[type=checkbox]');
                var $search = lists.find('.J-search-box');
                //todo
                var val = $(this).val();
                var reg = RegExp(val, 'gi');
                if(val){
                    tabs.hide();
                    lists.find('.active').removeClass('active');
                    $search.addClass('active').html('');
                    for (var i=0;i<items.length;i++){
                        if($(items[i]).val().match(reg)){
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

                    // var region = tabs.find('.item.active').attr('data-region');
                    // lists.html('').html(viewCountryList(_this.cacheData, region ,args));
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
            allCount.html(thisRegions);
            tabs.find('.item.active').find('.J-count').html(thisRegionsSel);
            action.find('.J-count').html(thisRegionsSel);
            if (thisRegions === thisRegionsSel){
                action.find('.J-checkedAll').attr('checked',true);
            }else{
                action.find('.J-checkedAll').attr('checked',false);
            }

        },
        getContentList: function(){
            var _this = this;

            if (!_this.data){
                console.error('widthout data!');
                return false;
            }
            var regions =  '',lists = '';

            $.each(_this.data['continentRegionMap'],function(i,n){
                var num = _this.data['countryCounts'][i] || 0;
                var middle = '';
                regions = regions + '<a class="item" data-region="'+i+'" href="javascript:;">'+i+'(<span class="J-count">'+num+'</span>)</a>'

                lists = lists + '<div class="countries" data-region="'+i+'">';

                $.each(n,function(j,m){
                    middle = middle + '<label class="input-wrap"><input type="checkbox" '+ (m['myChecked'] && 'checked') +' value="'+ m['countryRegion']+'"><span class="input-ctnr"></span><span class="flag flag-'+m['simpleCountry'].toLowerCase()+'"></span>'+ m['countryName']+'</label>'
                });
                lists = lists + middle + '</div>'

            });

            var html = tmpl.ContentTop() + regions + tmpl.ContentCenter() + lists + tmpl.ContentBottom();

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












