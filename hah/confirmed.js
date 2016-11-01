// @import url(/js/custom-channels/module/upload.js)
// Copyright 2016 FOCUS Inc.All Rights Reserved.

/**
 * Created by qinfan on 2016/9/5.
 */
;void function(){
    var tips = {
        art:{
            supplier:"Sorry, this service is only available for buyers.We will direct you to Easy Sourcing to quote for buyers' RFQs.<br><br><a href='http://sourcing.made-in-china.com/suppliers.html' class='btn btn-main'>Go to Easy Sourcing</a>",
            suspended:'Sorry, you cannot post customized request because your account has not been approved by Made-in-China.com.',
            sendLimit:'You can post up to {num} Sourcing Requests within 1 day. Please submit later.'
        },
        error:{
            onlyEn:'Please enter in English.',
            sendLimit:'Please enter less than 4000 characters (Including Custom Request Details).'
        },
        tip:'NOTICE'
    };

    $(function() {
                
        window.onload = function(){
            $(window).scroll();
        };
        
        $("[placeholder]").each(function (i,n) {
            var placeholder = new Placeholder({
                carrier: $(n)[0]
            });
        })



        var word = $('input[name=keywordGetCatalog]').val() || '';
        $.ajax({
            url:'http://purchase.made-in-china.com/catalog/searchCatalogByKeyword/'+ word,
            dataType:'jsonp',
            jsonp:'jsoncallback',
            timeout: 10000,
            success:function(data){
                $('input[name=rfqCatcode]').val(data);
                $('#submitSend').prop('disabled',false);
            },
            error: function () {
                $('#submitSend').prop('disabled',false);
                window.console && console.error('ajax error')
            }
        });




        judgeUserStatus(false,function(){});
        renderFiles();




        var $form = $('form[name=customRequestForm]');

        $('#submitSend').click(function(e){
            e.preventDefault();

            if(formValidate()){
                judgeUserStatus(true, function () {
                    $form.submit();
                })
            }

        });

        window.urlForward = function(){
            closePopupDialog();
            // topLoginInfo.request();
            judgeUserStatus(false, function () {
                $form.submit();
            })
        };

        $('textarea[name=rfqRemark]').on('focus',function(){
            $('.J-showErrors').hide();
        })

        $('.J-uploadTips').hover(function(){
            $('.J-TipTxt').show();
        },function(){
            $('.J-TipTxt').hide();
        });


        var specTable = template($('#specTable').html(),{});
        
        //特殊字符
        $('.J-popSpec').on('click',function(e){
            e.stopPropagation();

            
            var popSpec = art.dialog({
                title : 'Special Characters',
                cancelVal : 'Cancel',
                width : 510,
                height : 510,
                lock : true,
                content : specTable,
                init : function(){
                    renderSpechar();
                },
                cancel: function(){
                    //todo
                },
                close : function() {
                    
                }
            });

        });
        


    });

    function renderFiles() {
        var lastUpload = $('#lastUpload').val(),
            files = null,
            file = null;

        if (lastUpload) {
            try {
                files = JSON.parse(lastUpload);
                files = files.val;
                for (var i = 0; i < files.length; i++) {
                    file = files[i];
                    file['name'] = file.val;
                }
                window.resetFileQueue && window.resetFileQueue(files);
            } catch (err) {
                window.console && console.warn(err);
            }
        }
    }


    function formValidate(){



        var $remark = $('textarea[name=rfqRemark]');
        var val = $remark.val();
        var limit = Number($('input[name=remarkMaxLen]').val()) || 3000;

        if(!/^[\x00-\x7F\xB0]*$/.test(val)){
            showError(tips.error.onlyEn);
            return false;
        }
        //else if(val.length > limit){
        //    showError(tips.error.sendLimit);
        //    return false;
        //}
        else{
            return true;
        }


    }

    function showError(txt){
        $('.J-showErrors').html(txt).show();
    }

    function judgeUserStatus(needJudgeLogin,cb){
        $('textarea[name=rfqRemark]').attr('disabled', 'disabled');
        var thisData = needJudgeLogin? $('form[name=customRequestForm]').serialize():"";
        if (thisData) {
            thisData += '&rfqRemark=' + encodeURIComponent(encodeURIComponent($('textarea[name=rfqRemark]').val()));
        }
        $('textarea[name=rfqRemark]').removeAttr('disabled');

        $.ajax({
            url:'/customChannel.do?xcase=doCheckRequest',
            type: 'post',
            cache: false,
            dataType:'json',
            data: thisData,
            success:function(data){
                if(data.remarkLength ==="0"){
                    //超出字数
                    showError(tips.error.sendLimit);
                    return false;
                }

                if(data.logon === "0"){
                    //未登录
                    if(needJudgeLogin){
                        showPoploginArtdialog(window.location.href,'quoteUrl=1');
                        return false;
                    }
                }
                if(data.buyer === "0"){
                    artDialog.tip(tips.art.supplier,tips.tip,{type: 'tip'});
                    return false;
                }else if(data.comExist ==="0"){
                    artDialog.tip(tips.art.suspended,tips.tip,{type: 'tip'});
                    return false;
                }else if(data.sendLimit){
                    artDialog.tip(tips.art.sendLimit.replace('{num}',data.sendLimit),tips.tip,{type: 'tip'});
                    return false;
                }else{
                    cb();
                }
            },
            error:function(){
                window.console && console.error('ajax error')
            }
        })
    }




}.call(this);


