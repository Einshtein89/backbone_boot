define(function (require) {
    var Template = require('addUserTemplate');
    var BaseView = require('baseView');
    var Backbone = require('backbone');
    var User = require('model');
    var UserUtils = require('userUtils');
    require('dust_helpers');

    var EditUserView = BaseView.extend({

        el: '.userFormHolder',

        events: {
            'click #updateButton': 'update',
            'click #cancel': 'cancel',
        },

        template: Template,

        initialize: function () {
            this.render();
        },

        render: function () {
            BaseView.prototype.render.apply(this, arguments);
            console.log('editUser is rendered!');
            return this;
        },

        update: function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();

            var newUser = new User();
            UserUtils.populateUserData(newUser, true);

            var self = this;
                newUser.save({}, {
                    dataType : 'text',
                    success: function (model, response) {
                        UserUtils.updateModel(self.model, model, true);
                        UserUtils.clearErrors();
                        self.$el.empty();
                        UserUtils.renderMessage("User " + newUser.attributes.firstName + " was successfully updated", false);
                        Backbone.history.navigate('', true);
                    },
                    error: function (model, response) {
                        UserUtils.renderMessage("Error during adding new User!")
                    }
                });

        },

        cancel: function() {
            UserUtils.clearErrors();
            this.$el.empty();
            Backbone.history.navigate('', {trigger: false, replace: false});
        }
    });

    return EditUserView;
});