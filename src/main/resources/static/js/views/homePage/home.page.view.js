define(function (require) {
    var Template = require('homePageTemplate');
    var BaseView = require('baseView');

    var HomeHeaderView = BaseView.extend({

        className: "content_home tabcontent",

        template: Template,

        initialize: function (options) {
          options = options || {};
          $.when(this.isAdmin(options)).then(function () {
              this.render(options)
          }.bind(this));

        },

        render: function (options) {
            BaseView.prototype.render.apply(this, arguments);
            return this;
        },

        isAdmin: function(options) {
            var ajax = $.ajax({
                url: '../isAdmin',
                contentType: "application/json",
                success: function (response) {
                    options.isAdmin = response;
                }
            });
            return ajax;
        }
    });

    return HomeHeaderView;
});
