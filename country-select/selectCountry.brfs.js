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
        lang: [{
            'artDialog': {
                title: 'Select Country/Region',
                edit: 'Edit',
                save: 'Confirm',
                cancel: 'Cancel'
            },
            confirmTip: "Are you sure to clear {userName}'s country/region?",
            selectAll: 'Select All',
            searchPlaceholder:'Please enter a country/region',
            search:'Search',
            noResult:'Can’t find countries or regions for “{searchWord}” .Try to search by other words.',
            artAlert:'Warning',
            alertTxt:'Please select at least one country or region.',
            onlyEnglish:'Only English characters can be entered here.'

        },{
            'artDialog': {
                title: '选择国家/地区',
                edit: '修改',
                save: '确认',
                cancel: '取消'
            },
            confirmTip: '您确定要清空{userName}的国家/地区吗？',
            selectAll: '全选',
            searchPlaceholder: '请输入国家/地区名称',
            search:'搜索',
            noResult:'没有找到匹配 "{searchWord}" 的国家/地区，请使用其它关键词搜索。',
            artAlert:'提示',
            alertTxt:'请选择国家/地区。',
            onlyEnglish:'此处仅支持输入英文字符进行搜索。'
        }],
        lanCode: 1,
        afterPostData: function(){return false;}//用于去除报错提示等。

    };



    var SelectCountry = function (config) {
        this.conf = $.extend(true, {}, defaults,config);
        this.data = null;
        this.lang = this.conf.lang[this.conf.lanCode];

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
                        console.error('Query Data Error.');
                        return false;
                    }
                    _this.data = json;
                    cb && cb(json);

                },
                error:function(){
                    console.error('Query Data Error.');
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

                    var inputVals = inputVal ? inputVal.split('@'):[];

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
                        var countryReg = n['countryRegion'].replace('(','[(]').replace(')','[)]');

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
            $(el).on('click','.J-country-add',function(){
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
                        var input = _this.conf.input;
                        var lang = _this.lang;
                        var lists = $('.J-lists', this.content());

                        var postData = [];
                        var checks = lists.find('.countries input[type=checkbox]:checked');
                        _this.conf.afterPostData();
                        if(checks.length === 0){
                            artDialog.alert(lang.alertTxt,lang.artAlert,{type: 'tip'}).time(2);
                            return false;
                        }
                        for(var i = 0;i<checks.length;i++){
                            $(checks[i]).val() && postData.push($(checks[i]).val());
                        }
                        $(input).val(postData.join('@'));

                        _this.renderHtml();



                        //_this.saveData(this.content())
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

                var noResultTxt = {
                    noResult: _this.lang.noResult.replace('{searchWord}', $(this).val())
                };
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

                //搜索没结果

                if(!/^[\x00-\x7F\xB0]*$/.test($(this).val())){
                    noResultTxt.noResult = _this.lang.onlyEnglish;
                }
                var thisRegions = lists.find('.active input[type=checkbox]').length;
                if(thisRegions === 0 && $('.J-search-box.active').length>0){
                    action.hide();
                    $('.J-search-box').append(tmpl.noResult(noResultTxt));
                }else{
                    var nr = $('.J-search-box .J-noResult');
                    action.show();
                    (nr.length >0) && nr.remove();
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
            //全选状态
            if (thisRegions === thisRegionsSel){
                action.find('.J-checkedAll').attr('checked',true);
            }else{
                action.find('.J-checkedAll').attr('checked',false);
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
            };

            $.each(_this.data['continentRegionMap'],function(i,n){
                var num = _this.data['countryCounts'][i] || 0;
                var middle = '';
                regions = regions + tmpl.tabItem(
                        {
                            regionName:(i==='Australasia')? 'Oceania':i,
                            region:i,
                            regionNum:num
                        });

                lists = lists + tmpl.countriesItem({region:i});

                $.each(n,function(j,m){
                    middle = middle + tmpl.selectItem({
                            title:m['longCountryName']? m['parameterValue']:'' ,
                            checked:m['myChecked']? 'checked':'' ,
                            value:m['countryRegion'],
                            flag:m['simpleCountry'].toLowerCase(),
                            name:m['countryName']
                        })

                });
                lists = lists + middle + '</div>'

            });

            var html = tmpl.ContentTop(htmlTxt) + regions + tmpl.ContentCenter(htmlTxt) + lists + tmpl.ContentBottom();

            return html;
        }

    };




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












