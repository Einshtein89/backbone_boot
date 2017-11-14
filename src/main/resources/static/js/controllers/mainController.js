define(function (require) {
    var $ = require('jquery');
    var Backbone =require('backbone');
    var MultiView = require('multiView');
    var ContactList = require('contactList');
    var SearchView = require('searchView');
    var AddUserView = require('addUserView');
    var PaginationView = require('paginationView');
    var contactList = new ContactList();
    var usersView;
    var searchView;
    var addUserView;
    var paginationView;

    var MainController = function(options) {
        return {
            renderAllUsers: function () {
                var self = this;
                setTimeout(function() {
                    if (!usersView) {
                        usersView = new MultiView({collection: contactList});
                    }
                    if (contactList.fullCollection.models.length === 0) {
                        contactList.setPageSize(6, options);
                        contactList.fetch({
                                success: function () {
                                    usersView.render();
                                    if (!paginationView){
                                        paginationView = new PaginationView({collection: contactList});
                                    }
                                    if (!searchView) {
                                        searchView = new SearchView({collection : contactList, multiView: usersView});
                                    }
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
                        paginationView.render();
                    }
                }, 500);
            },

            resetCollection: function () {
                contactList.fetch({
                    success: function () {
                        if (!usersView) {
                            usersView = new MultiView({collection : contactList});
                        } else {
                            usersView.render();
                        }
                    }
                })

                Backbone.history.navigate('', {trigger: false, replace: false});
            },

            showAddForm: function () {
                if (!addUserView) {
                    addUserView = new AddUserView({collection : contactList});
                } else {
                    addUserView.render();
                }
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
            },

            getFirstPage: function () {
                contactList.getFirstPage(options);
                usersView.render();
            },

            getLastPage: function () {
                contactList.getLastPage(options);
                usersView.render();
            },

            getCurrentPage: function (id) {
                var id = Number(id) -1;
                contactList.getPage(id, options);
                usersView.render();
            }
        };
    };

    return MainController;
});