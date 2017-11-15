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
                        self.getLastPage();
                        paginationView.render({isMainPage: false, isNewUserAdded: true});
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
                });

                Backbone.history.navigate('', {trigger: false, replace: false});
                paginationView.render({isMainPage: true, isNewUserAdded: false});
            },

            //pagination actions
            getFirstPage: function () {
                contactList.getFirstPage(options);
                this.setNavigationButtonStyles();
                usersView.render();
            },

            getLastPage: function () {
                contactList.getLastPage(options);
                this.setNavigationButtonStyles();
                usersView.render();
            },

            getCurrentPage: function (id) {
                var id = Number(id);
                contactList.getPage(id, options);
                this.setNavigationButtonStyles();
                $( ".pagination" ).find( "li" ).eq(id + 1).addClass('active').siblings().removeClass('active');
                usersView.render();
            },

            getPrevPage: function () {
                contactList.getPreviousPage(options);
                Backbone.history.navigate('', {trigger: false, replace: false});
                Backbone.history.navigate('page' + (contactList.state.currentPage), true);
                usersView.render();
            },

            getNextPage: function () {
                contactList.getNextPage(options);
                Backbone.history.navigate('', {trigger: false, replace: false});
                Backbone.history.navigate('page' + (contactList.state.currentPage), true);
                usersView.render();
            },

            setNavigationButtonStyles: function () {
                let $firstPage = $( ".pagination" ).find( "li" ).eq(0);
                let $prevPage = $( ".pagination" ).find( "li" ).eq(1);
                let $lastPage = $( ".pagination" ).find( 'li:last' );
                let $nextPage = $( ".pagination" ).find( 'li:last' ).prev();

                if (contactList.state.currentPage === contactList.state.firstPage) {
                    $firstPage.children().attr('href', null);
                    $prevPage.children().attr('href', null);
                } else {
                    $firstPage.children().attr('href', '#first');
                    $prevPage.children().attr('href', '#prev');
                }
                if (contactList.state.currentPage === contactList.state.lastPage) {
                    $nextPage.children().attr('href', null);
                    $lastPage.children().attr('href', null);
                } else {
                    $nextPage.children().attr('href', '#next');
                    $lastPage.children().attr('href', '#last');
                }
            }
        };
    };

    return MainController;
});