
define(function (require) {
    var Backbone = require('backbone');
    var Dust = require('dust');
    require('validation');

    return Backbone.View.extend({

        initialize: function () {
            this.model.on('change', this.render, this);
            Backbone.Validation.bind(this, {
                valid: function(view, attr) {
                    var $el = view.$('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.removeClass('has-error');
                    $group.find('.help-block').html('').addClass('hidden');
                },
                invalid: function(view, attr, error) {
                    var $el = view.$('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.addClass('has-error');
                    $group.find('.help-block').html(error).removeClass('hidden');
                }
            });
        },

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