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
            //rendering actions
            renderAllUsers: function () {
                var self = this;
                setTimeout(function() {
                    if (contactList.fullCollection.models.length === 0) {
                        contactList.setPageSize(3, options);
                        contactList.fetch({
                            success: function () {
                                self.createPaginationView();
                                self.createMultiView();
                                usersView.render();
                                self.createSearchView();
                                self.renderSearch();
                            }
                        })
                    }
                    else {
                        usersView.render();
                        paginationView.render();
                    }
                }, 500);
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

            renderSearch: function () {
                usersView.on('view:search', function (options) {
                    this.collection.reset(options.filteredData);
                    this.render();
                });
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

            //creating views
            createPaginationView: function () {
                if (!paginationView){
                    paginationView = new PaginationView({collection: contactList, isMainPage: true});
                }
            },

            createMultiView: function () {
                if (!usersView) {
                    usersView = new MultiView({collection: contactList, paginationView: paginationView});
                }
            },

            createSearchView: function () {
                if (!searchView) {
                    searchView = new SearchView({collection : contactList, multiView: usersView});
                }
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

            //pagination actions
            getFirstPage: function () {
                contactList.getFirstPage(options);
                usersView.render();
            },

            getLastPage: function () {
                contactList.getLastPage(options);
                usersView.render();
            },

            getCurrentPage: function (id) {
                var id = Number(id);
                contactList.getPage(id, options);
                $( ".pagination" ).find( "li" ).eq(id).addClass('active');
                usersView.render();
            },

            getPrevPage: function () {
                contactList.getPreviousPage(options);
                usersView.render();
            }
        };
    };

    return MainController;
});