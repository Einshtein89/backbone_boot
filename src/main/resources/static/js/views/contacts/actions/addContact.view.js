define(function (require) {
    var Template = require('addUserTemplate');
    var BaseView = require('baseView');
    var Backbone = require('backbone');
    var UserUtils = require('userUtils');
    require('validation');
    var paginationView;

    var AddUserView = BaseView.extend({

        className: 'userFormHolder',

        events: {
            'click #submitButton': 'submit',
            'click #cancel': 'cancel',
        },

        template: Template,

        initialize: function (options) {
            this.render(options);
            paginationView = options.paginationView;
            UserUtils.bindValidation(this);
        },

        render: function (options) {
            BaseView.prototype.render.apply(this, arguments);
            return this;
        },

        submit: function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();

            UserUtils.populateUserData(this.model, false, true);

            //checking existing user
            var existedUser = this.collection.findWhere({
                firstName: this.model.attributes.firstName,
                lastName: this.model.attributes.lastName
            })

            if(existedUser) {
                UserUtils.renderMessage("This user already exists!", false)
            } else {
                var self = this;
                if (this.model.isValid(true)) {
                    this.model.save({}, {
                        dataType : 'text',
                        success: function (model, response) {
                            response = JSON.parse(response);
                            if (!response.id) {
                                UserUtils.renderMessage("User was not saved!", true)
                            }
                            if (!$("#messages").length) {
                                model.set("id", response.id);
                                self.collection.fullCollection.add(model);
                                UserUtils.renderMessage("User  " + model.attributes.firstName + " was" +
                                    " successfully saved", false);
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

            }
        },

        cancel: function() {
            this.remove();
            Backbone.history.navigate('', {trigger: false, replace: false});
        }
    });

    return AddUserView;
});