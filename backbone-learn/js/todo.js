/**
 * Created by qinfan on 2016/5/23.
 */

;void function(){

    var Mission = Backbone.Model.extend({
        initialize: function(){},
        defaults:{
            title: '',
            status: 0
        }
    });

    var MissionList = Backbone.Collection.extend({
        model: Mission
    });

    var MissionView = new Backbone.View.extend({
        el: $('body'),
        initialize: function(){},
        render: function(){},
        events: {

        }

    })






}.call(this);