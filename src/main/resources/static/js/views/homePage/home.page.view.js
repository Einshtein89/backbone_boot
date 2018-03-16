define(function (require) {
    var Template = require('homePageTemplate');
    var BaseView = require('baseView');

    var HomeHeaderView = BaseView.extend({

        className: "content_home tabcontent",

        template: Template,

        initialize: function (options) {
          options = options || {};
          this.render(options)
        },

        render: function (options) {
            BaseView.prototype.render.apply(this, arguments);
            return this;
        }
    });

    return HomeHeaderView;
});
