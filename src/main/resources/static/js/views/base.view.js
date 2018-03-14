
define(function (require) {
    var Backbone = require('backbone');
    var Dust = require('dust');

    return Backbone.View.extend({

        initialize: function (options) {
            if (this.model) {
                this.model.on('change', this.render(options), this);
            }
        },

        render: function (options) {
            var sexArray = ["man", "woman"];
            var data = (this.model) ? this.model.toJSON() : {};
            if (options) {
                data.isAdd = options.isAdd;
            }
            data.sexArray = sexArray;
            var output = '';
            Dust.renderSource(this.template, data, function(err, out) {
                if (err) {
                    alert(err);
                } else {
                    output = out;
                }
            });
            this.$el.html(output);

            return this;
        }
    });
});