define(function (require) {
    // var $ = require('jquery');
    var Template = require('contactInfoTemplate');
    var BaseView = require('baseView');


    var UserInfo = BaseView.extend({

        el: '.userInfo',

        events: {
            'click .closeUserInfo': 'closeUserInfo',
        },

        template: Template,

        initialize: function () {
            this.render();
        },

        render:  function () {
            BaseView.prototype.render.apply(this, arguments);
            this.$el.animate({
                opacity: 0,
                top: "-50px",
            }, 0 );
            this.$el.animate({
                opacity: 1,
                top: "+100px",
                left: "+50px"
            }, 1000 );
            return this;
        },

        closeUserInfo: function () {
            this.$el.empty();
            this.$el.animate({
                opacity: 0,
                top: "-50px",
            }, 0 );
        }
    });

    return UserInfo;
});
