void function () {

    var defaults = {
        wrapEl:'.J-catalogPop',
        innerEl:'.J-catAuthority-country',
        addEl:'.J-country-add',
        inputEl:'#countrysCanot',
        url:'country.json',
        assignLang: {
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
        var _this = this;
        this.conf = $.extend(defaults,config);

        var wrapEl = this.conf.wrapEl,
            addEl = this.conf.addEl,
            inputEl = this.conf.inputEl,
            innerEl = this.conf.innerEl,
            url = this.conf.url;

        var assignLang = this.conf.assignLang;


        assignLang = assignLang[($('#lanCode').val() === '1' ? 'zh-CN' : 'en-US')];
        initPage();

        function getCountryList(cb, operatorNo) {
            if (_this.cacheData) {
                cb && cb(_this.cacheData);
                return _this.cacheData;
            }

            $.ajax({
                type: "GET",
                cache: false,
                async: true,
                datatype: "json",
                url: url,
                success:function (contries){
                    if (!contries) {
                        alert('Query Data Error.');
                        _this.cacheData = null;
                        return false;
                    }
                    _this.cacheData = contries;
                    cb && cb(contries);
                },
                error:function(error){
                    alert('Query Data Error.');
                    _this.cacheData = null;
                }
            });
        }

        function initPage() {
            _this.cacheData = null;
            _this.selectedRegion = null;
            _this.selectingData = null;
            var operatorNo = null,
                userName = null,
                countryDialog = null;

            var country;

            $(wrapEl).on('click',addEl, function(e) {




                e.preventDefault();
                editCountry();

            });


            function editCountry() {
                //todo
                getCountryList(function(json) {

                    countryDialog = art.dialog({
                        title : assignLang.artDialog.title,
                        okVal : assignLang.artDialog.save,
                        cancelVal : assignLang.artDialog.cancel,
                        width : 800,
                        height : 510,
                        lock : true,
                        content : viewCountryList(json, _this.selectedRegion),
                        init : initDialog,
                        ok : function() {
                            saveCache(this.content());
                            var regions = _this.cacheData['continentRegionMap'],
                                data = [],
                                region, country, countries;


                            var $countryBox = $(innerEl);
                            $countryBox.find('.country-item').remove();

                            for (region in regions) {
                                countries = regions[region];
                                for (country in countries) {
                                    if (countries[country]['myChecked']) {
                                        data.push(countries[country]['countryRegion']);
                                        var html = '<div class="country-item flags">' +
                                            '<span class="flag flag-'+countries[country].simpleCountry.toLowerCase()+'">'
                                            +countries[country].countryName+'</span>' +
                                            '<span class="del micon" country-simple="'+ countries[country].simpleCountry +'" region="'+region+'"></span>' +
                                            '</div>';

                                        $countryBox.find(addEl).before(html);

                                    }
                                }
                            }



                            postData(data.join('@'));
                        },
                        cancel: function(){
                            _this.cacheData = JSON.parse(_this.selectingData);
                        },
                        close : function() {
                            countryDialog = null;
                            //countryDialog = _this.cacheData = null;
                        }
                    });
                }, operatorNo);
            }

            function clearCountry() {
                if (confirm(assignLang.confirmTip.replace('{userName}', userName))) {
                    postData();
                }
            }

            function postData(data) {



                $(inputEl).val(data);

            }

            if ($("#r").val() && $("#r").val() == 's') {
                showTips(assignLang.prompt.changeAssignSucc, 'succ');
            }
        }

        function initDialog() {
            var content = this.content();
            var tabs = $('.J-tab', content),
                lists = $('.J-lists', content),
                selectedAll = $('.J-checkedAll', content),
                action = $('.J-action', content),
                allCount = $('.J-counts', content);
            _this.selectingData = JSON.stringify(_this.cacheData);
            _this.selectedRegion = tabs.find('.active').attr('data-region');

            tabs.find('a').bind('click', function(e) {
                if (!_this.cacheData) return;
                var args = { 'tab' : 'none', 'action' : 'none' };
                tabs.find('a').removeClass('active');
                $(this).addClass('active');
                _this.selectedRegion = $(this).attr('data-region');

                if ($(this).attr('data-flag')) {
                    args.check = 'none';
                }

                lists.html(viewCountryList(_this.cacheData, _this.selectedRegion, args));
                if (!args.check) {
                    saveCache(content)
                }
                e.preventDefault();
            });

            lists.bind('click', function(e) {
                if (e.target.nodeName.toLowerCase() === 'input' && e.target.type === 'checkbox') {
                    saveCache(content)
                }
            });

            selectedAll.bind('change', function() {
                if ($(this).attr('checked')) {
                    lists.find('input[type=checkbox]').attr('checked', true);
                } else {
                    lists.find('input[type=checkbox]').attr('checked', false);
                }
                saveCache(content)
            });




        }

        function saveCache(content){
            var tabs = $('.J-tab', content),
                lists = $('.J-lists', content),
                selectedAll = $('.J-checkedAll', content),
                action = $('.J-action', content),
                allCount = $('.J-counts', content);

            updateCount();
            updateCache();
            function updateCount() {
                action.find('.J-count').html(lists.find('input[type=checkbox]:checked').length);
                tabs.find('.active .J-count').html(lists.find('input[type=checkbox]:checked').length);
                allCount.html(lists.find('input[type=checkbox]').length);

                if (lists.find('input[type=checkbox]:checked').length === lists.find('input[type=checkbox]').length) {
                    selectedAll.attr('checked', true);
                } else {
                    selectedAll.attr('checked', false);
                }

                var region = _this.cacheData['countryCounts'];
                var thisRegion = tabs.find('.item.active').attr('data-region');
                region[thisRegion] = lists.find('input[type=checkbox]:checked').length;



            }

            function updateCache() {
                var items = lists.find('input[type=checkbox]:checked'),
                    countries = _this.cacheData['continentRegionMap'][_this.selectedRegion],
                    i = 0,
                    j = 0;


                for (j = 0; j < countries.length; j++) {
                    if (items.length === 0) {
                        countries[j]['myChecked'] = null;
                        continue;
                    }
                    countries[j]['myChecked'] = null;
                    for (i = 0; i < items.length; i++) {
                        if (countries[j]['countryRegion'] === $(items[i]).val() && $(items[i]).attr('checked')) {
                            countries[j]['myChecked'] = true;
                            break;
                        }
                    }
                }

            }
        }
        /**
         * 组织HTML结构
         * @param json {Object} 原始数据
         * @param selected {String} 选中的地区
         * @param contentFlag {Object} 根据对象属性判断是否生成对应的内容，默认不设置为生成
         * @returns {string}
         */
        function viewCountryList(json, selected, contentFlag) {
            var _container = '<div class="form select-country">',
                _content = '<div class="country-content colspan4 J-lists flags">',
                _tab = '<div class="tab-primary J-tab">',
                _sel = selected,
                country, countries, region,
                regions = json['continentRegionMap'],
                counts = json['countryCounts'],
                order = 0,
                _action = '',
                _flag = contentFlag || {};

            for (region in regions) {
                if (!_sel) {
                    _sel = region;
                }

                if (!_flag['type'] || counts[region]) {
                    _tab += '<a class="item '+ (region === _sel ? 'active' : '') +'" data-region="'+ region +'" href="javascript:;" '+ (_flag['check'] ? 'data-flag="true"' : false) +'>'+
                        (region === 'Australasia' ? 'Oceania' : region) +'(<span class="J-count">'+ (counts[region] || 0) +'</span>)</a>';
                }

                if (region === _sel) {
                    countries = regions[region];
                    for (country in countries) {
                        if (_flag['check'] && !countries[country]['myChecked']) {
                            continue;
                        }

                        if (countries[country]['longCountryName']) {
                            _content += '<label class="checkbox" title="' + countries[country]['parameterValue'] + '">';
                        }
                        else {
                            _content += '<label class="checkbox">';
                        }

                        if (!_flag['check']) {
                            _content += '<input type="checkbox" class="input-checkbox" '+ (countries[country]['myChecked'] && 'checked') +' value="'+ countries[country]['countryRegion'] +'"/>';
                        }

                        _content += '<span class="flag flag-'+ countries[country]['simpleCountry'].toLowerCase() +'"></span> '+ countries[country]['countryName'] +'' +
                            (countries[country]['otherUser'] && '<span class="ico-people" alt="' + assignLang.prompt.assign + countries[country]['otherUser'] + '" title="' + assignLang.prompt.assign + countries[country]['otherUser'] + '"></span>') + '</label>';

                        if (countries[country]['myChecked']) {
                            order++;
                        }
                    }
                }
            }
            _tab += '</div>';
            _content += '</div>';

            _action += '<div class="act J-action" style="display:block">' +
                '<label class="checkbox"><input type="checkbox" class="input-checkbox J-checkedAll" '+ (countries && countries.length === order ? 'checked' : '') +' value=""/>' +
                assignLang.selectedAll + ' (<span class="J-count">'+ (counts[_sel] || 0) +'</span>/<span class="J-counts">'+ regions[_sel].length +'</span>)</label></div>';

            if (!_flag['tab']) {
                _container += _tab;
            }

            if (!_flag['action']) {
                _container += _action;
            }

            if (!_flag['content']) {
                _container += _content;
            }

            _container += '</div>';

            return _container;
        }

        var _timer;
        function showTips(message, type) {
            _timer && clearTimeout(_timer);
            $('#J-message').html('<div class="alert '+ (type ? 'alert-'+ type : '') +'"><div class="alert-con">'+ message +'</div></div>');
            _timer = setTimeout(function() {
                $('#J-message').empty();
            }, 3000);
        }


// 删除
        $(wrapEl).on('click',innerEl+' .del',function(e){
            e.preventDefault();
            var $target = $(e.target);
            var region = $target.attr('region');
            var ctry = $target.attr('country-simple');

            var countries = _this.cacheData['continentRegionMap'][region];

            var country,delItem;


            for (country in countries) {
                if(ctry === countries[country]['simpleCountry']){
                    delItem = countries[country];


                    _this.cacheData['continentRegionMap'][region][country]['myChecked'] = "";
                    _this.cacheData['countryCounts'][region] --;

                    $target.closest('.country-item').remove();
                    var countryReg = _this.cacheData['continentRegionMap'][region][country]['countryRegion'];
                    var reg =  RegExp("@"+ countryReg +"@",'g');
                    var reg_begin = RegExp('^'+ countryReg +'@','g');
                    var reg_end = RegExp('@'+ countryReg +'$','g');
                    var reg_last = RegExp('^'+ countryReg +'$', 'g');
                    var vl = $(inputEl).val().replace(reg, "@").replace(reg_begin,'').replace(reg_end,'').replace(reg_last,'');

                    $(inputEl).val(vl);

                    //todo
                }
            }


        });

    };

    SelectCountry.prototype = {

        reset: function(){
            this.cacheData = null;
            this.selectedRegion = null;
            this.selectingData = null;
        }
    }




    window.SelectCountry = SelectCountry;


}.call(this);













$(function () {


    var aa = new SelectCountry({
        wrapEl:'.J-catalogPop',
        innerEl:'.J-catAuthority-country',
        addEl:'.J-country-add',
        inputEl:'#countrysCanot'

    });


    var bb = new SelectCountry({
        wrapEl:'.J-catalogPop-2',
        innerEl:'.J-catAuthority-country-2',
        addEl:'.J-country-add-2',
        inputEl:'#countrysCan'

    });

    $('.J-reset-1').click(function () {
        aa.reset();
    })
});


