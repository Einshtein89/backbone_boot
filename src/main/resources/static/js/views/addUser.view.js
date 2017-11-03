define(function (require) {
    var Template = require('addUserTemplate');
    var BaseView = require('baseView');
    var Backbone = require('backbone');
    var User = require('model');
    var UserUtils = require('userUtils');
    require('jConfirm');

    var AddUserView = BaseView.extend({

        el: '.userFormHolder',

        events: {
            'click #submitButton': 'submit',
            'click #cancel': 'cancel',
        },

        template: Template,

        initialize: function () {
            this.render();
        },

        render: function () {
            BaseView.prototype.render.apply(this, arguments);
            console.log('addUser is rendered!');
            return this;
        },

        submit: function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();

            var newUser = new User();
            UserUtils.populateUserData(newUser, false);

            //checking existing user
            var existedUser = this.collection.findWhere({
                firstName: newUser.attributes.firstName,
                lastName: newUser.attributes.lastName
            })

            if(existedUser) {
                this.renderMessage("This user already exists!", false)
            } else {
                var self = this;
                newUser.save({}, {
                    dataType : 'text',
                    success: function (model, response) {
                        response = JSON.parse(response);
                        if (!response.id) {
                            UserUtils.renderMessage("User was not saved!", true)
                        }
                        if (!$("#messages").length) {
                            UserUtils.clearErrors();
                            self.$el.empty();
                            UserUtils.renderMessage("User  " + newUser.attributes.firstName + " was successfully" +
                                " saved", false)
                        }
                    },
                    error: function (model, response) {
                        UserUtils.renderMessage("Error during adding new User!", true)
                    }
                });
                Backbone.history.navigate('', true);
            }
        },

        cancel: function() {
            UserUtils.clearErrors();
            this.$el.empty();
            Backbone.history.navigate('', true);
        }
    });

    return AddUserView;
});