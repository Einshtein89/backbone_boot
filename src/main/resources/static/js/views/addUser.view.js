define(function (require) {
    var Template = require('addUserTemplate');
    var BaseView = require('baseView');
    var Backbone = require('backbone');
    var User = require('model');
    var UserUtils = require('userUtils');
    var Validation = require('validation');
    var paginationView;

    var AddUserView = BaseView.extend({

        className: 'userFormHolder',

        events: {
            'click #submitButton': 'submit',
            'click #cancel': 'cancel',
        },

        template: Template,

        initialize: function (options) {
            paginationView = options.paginationView;
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
                UserUtils.renderMessage("This user already exists!", false)
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
                            model.set("id", response.id);
                            self.collection.fullCollection.add(model);
                            UserUtils.renderMessage("User  " + newUser.attributes.firstName + " was successfully" +
                                " saved", false);
                            Backbone.history.navigate('last', true);
                            paginationView.render({isMainPage: false, isNewUserAdded: true});
                            self.remove();
                        }
                    },
                    error: function (model, response) {
                        UserUtils.renderMessage("Error during adding new User!", true)
                    }
                });
            }
        },

        cancel: function() {
            this.remove();
            Backbone.history.navigate('', {trigger: false, replace: false});
        }
    });

    return AddUserView;
});