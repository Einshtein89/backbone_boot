define(function (require) {
    var Template = require('homePageTemplate');
    var BaseView = require('baseView');

    var HomeHeaderView = BaseView.extend({

        className: "content_home tabcontent",

        template: Template,

        initialize: function () {
          this.getName();
        },

        render: function (options) {
            BaseView.prototype.render.apply(this, arguments);
            return this;
        },

        getName: function() {
        $.ajax({
            url: 'getName',
            contentType: "application/json",
            success: function (response) {
                // response = JSON.parse(response);
                $('#name').html(response);
            }
        });
    }
    });

    return HomeHeaderView;
});
