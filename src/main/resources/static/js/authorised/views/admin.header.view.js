define(function (require) {
    var Template = require('adminHeaderTemplate');
    var BaseView = require('baseView');
    var Dust = require('dust');

    var AdminHeaderView = BaseView.extend({

        el: "body",

        template: Template,

        initialize: function () {
            this.render();
        },

        render: function () {
            var output = '';
            var data = {};
            Dust.renderSource(this.template, data, function(err, out) {
                if (err) {
                    alert(err);
                } else {
                    output = out;
                }
            });
            this.$el.append(output);
            return this;
        }
    });

    return AdminHeaderView;
});
