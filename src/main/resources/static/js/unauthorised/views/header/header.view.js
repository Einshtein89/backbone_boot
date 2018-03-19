define(function (require) {
    var Template = require('headerTemplate');
    var BaseView = require('baseView');

    var AdminHeaderView = BaseView.extend({

        className: "content_books tabcontent",

        template: Template,

        initialize: function (options) {
            this.render(options);
        },

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
