;void function () {

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
        var _this = this;
        this.conf = $.extend(defaults,config);
        this.data = null;

        this.init();

    };

    SelectCountry.prototype = {
        getJSON: function(cb){
            var _this = this;
            var conf = this.conf;
            $.ajax({
                type: "GET",
                cache: false,
                async: true,
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
        init: function(){
            var _this = this;
            this.getJSON(function(json){

                var el = _this.conf.el,
                    input = _this.conf.input,
                    lang = _this.conf.lang['zh-CN'];

                var inputVal = $(input).val();
                var $box,$add;
                var countryDialog = null;
                console.log(json);
                if ($(input).prop('disabled')){
                    return false;
                }
                $(input).after('<div class="country-area J-box"><div class="country-add J-country-add"><i class="micon">&#xe005;</i></div></div>')
                $box = $(el).find('.J-box');
                $add = $box.find('.J-country-add');

                var inputVals = inputVal.split('@');

                for (var i = 0;i < inputVals.length;i++){
                    _this.traversal(json,'countryRegion',inputVals[i],function(country){

                        var html = '<div class="country-item flags">' +
                            '<span class="flag flag-'+country['simpleCountry'].toLowerCase()+'">'
                            +country['countryName']+'</span>' +
                            '<span class="del J-del micon" country-simple="'+ country['simpleCountry'] +'" region="'+country['continentRegion']+'"></span>' +
                            '</div>';

                        $add.before(html);
                    })
                }

                //todo 绑定事件

                //删除
                $box.bind('click','.J-del', function (e) {
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

                            $(input).val(vl);
                        }
                    })
                });

                $box.bind('click','.J-country-add',function(){
                    countryDialog = art.dialog({
                        title : lang.artDialog.title,
                        okVal : lang.artDialog.save,
                        cancelVal : lang.artDialog.cancel,
                        width : 800,
                        height : 510,
                        lock : true,
                        content : 'fuck',
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
                });

                
            })

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
            //todo
        }
    }



    window.SelectCountry = SelectCountry;


}.call(this);













$(function () {


    new SelectCountry();


});


