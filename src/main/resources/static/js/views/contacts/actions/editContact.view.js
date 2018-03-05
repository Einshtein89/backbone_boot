define(function (require) {
    var Template = require('addUserTemplate');
    var BaseView = require('baseView');
    var Backbone = require('backbone');
    var UserUtils = require('userUtils');
    require('dust_helpers');

    var EditUserView = BaseView.extend({

        className: 'userFormHolder',

        events: {
            'click #updateButton': 'update',
            'click #cancel': 'cancel',
        },

        template: Template,

        initialize: function () {
            this.render();
            UserUtils.bindValidation(this);
        },

        render: function () {
            BaseView.prototype.render.apply(this, arguments);
            return this;
        },

        update: function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();

            UserUtils.populateUserData(this.model, true, false);

            var self = this;
            this.model.save({}, {
                    dataType : 'text',
                    success: function (model, response) {
                        UserUtils.updateModel(self.model, model);
                        UserUtils.renderMessage("User " + model.attributes.firstName
                            + " was successfully updated", false);
                        Backbone.history.navigate('page' + self.collection.state.currentPage, true);
                        Backbone.history.navigate('', true);
                        self.remove();
                    },
                    error: function (model, response) {
                        UserUtils.renderMessage("Error during adding new User!")
                    }
                });
        },

        cancel: function() {
            this.remove();
            Backbone.history.navigate('', {trigger: false, replace: false});
        }
    });

    return EditUserView;
});
