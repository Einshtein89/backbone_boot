
define(function (require) {
    var Backbone =require('backbone');
    var Dust = require('dust');
    var DustHelpers = require("libs/dust-helpers");

    return Backbone.View.extend({

        render: function () {
            var sexArray = ["man", "woman"];
            var data = (this.model) ? this.model.toJSON() : {};
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