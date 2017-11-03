define(function (require) {
    var $ = require('jquery');
    var Backbone =require('backbone');
    var MultiView = require('multiView');
    var ContactList = require('contactList');
    var AddUserView = require('addUserView');
    var contactList = new ContactList();

    var Router = Backbone.Router.extend({
    routes: {
        '': 'renderAllUsers',
        'add': 'showAddForm',
        'edit' : 'userEdit'
    },

    renderAllUsers: function () {
        setTimeout(function() {contactList.fetch(
            {
                success: function () {
                    var usersView = new MultiView({collection : contactList});
                    usersView.render();
                }
            }
        )}, 500);
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