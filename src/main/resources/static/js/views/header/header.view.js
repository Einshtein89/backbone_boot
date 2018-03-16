define(function (require) {
    var Template = require('headerTemplate');
    var BaseView = require('baseView');

    var AdminHeaderView = BaseView.extend({

        className: "content_admin tabcontent",

        template: Template,

        render: function (options) {
            BaseView.prototype.render.apply(this, arguments);
            return this;
        },

        remove: function () {
            this.$el.empty();
        }
    });

    return AdminHeaderView;
});
