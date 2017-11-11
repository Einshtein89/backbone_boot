define(function (require) {
    var $ = require('jquery');
    var Backbone =require('backbone');
    var MultiView = require('multiView');
    var ContactList = require('contactList');
    var SearchView = require('searchView');
    var AddUserView = require('addUserView');
    var contactList = new ContactList();

    var Router = Backbone.Router.extend({
    routes: {
        '': 'renderAllUsers',
        'add': 'showAddForm',
        'edit' : 'userEdit',
        'resetSearch' : 'resetCollection'
    },

    renderAllUsers: function () {
        var self = this;
        setTimeout(function() {
            var usersView = new MultiView({collection : contactList});
            if (contactList.models.length === 0) {
                contactList.fetch({
                        success: function () {
                            usersView.render();
                            var search = new SearchView({collection : contactList, multiView: usersView});
                            usersView.on('view:search', function (options) {
                                this.collection.reset(options.filteredData);
                                this.render();
                            });
                        }
                    }
                )
            }
            else {
                usersView.render();
            }
           }, 500);
    },

    resetCollection: function () {
        contactList.fetch({
            success: function () {
                var usersView = new MultiView({collection : contactList});
                usersView.render();
            }
        })
        Backbone.history.navigate('', {trigger: false, replace: false});
    },

    showAddForm: function () {
        var addUserView = new AddUserView({collection : contactList});
        this.renderUserForm(false);
    },

    userEdit: function() {
        this.renderUserForm(true);
    },

    renderUserForm: function (isEdit) {
        if (isEdit) {
            $('#submitButton').hide();
            $('#updateButton').show();
        } else {
            $('#submitButton').show();
            $('#updateButton').hide();
        }
        $(".container_1").slideToggle("slow");
        //show form
        $('#userForm').css('width', '100%');
    }
});

return Router;
});