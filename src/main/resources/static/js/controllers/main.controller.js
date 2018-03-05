define(function (require) {
    var $ = require('jquery');
    var Backbone =require('backbone');
    var MultiView = require('multiView');
    var ContactList = require('contactList');
    var SearchView = require('searchView');
    var AddUserView = require('addUserView');
    var PaginationView = require('paginationView');
    var ContactsPerPageView = require('contactsPerPageView');
    var User = require('model');
    var contactList = new ContactList();
    var newUser = new User();
    var usersView;
    var searchView;
    var addUserView;
    var paginationView;
    var contactsPerPageView;

    var MainController = function(options) {
        return {
            //rendering actions
            renderAllUsers: function () {
                var self = this;
                if (contactList.fullCollection.models.length === 0) {
                    contactList.setPageSize(3, options);
                    contactList.fetch({
                        success: function () {
                            self.createPaginationView();
                            self.createContactsPerPageView();
                            self.createMultiView();
                            $(usersView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
                            self.createSearchView();
                            self.renderSearch();
                        }
                    })
                }
                else {
                    usersView.remove();
                    $(usersView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
                    this.getLastPage();
                    paginationView.render({isMainPage: false, isNewUserAdded: true});
                }
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
                usersView.on('view:emptySearch', function (options) {
                    this.collection.reset(options.filteredData);
                    this.render();
                });
                usersView.on('view:resetSearch', function () {
                    this.collection.fetch({
                        success: function () {
                            if (!usersView) {
                                usersView = new MultiView({collection : contactList});
                            } else {
                                usersView.render();
                                Backbone.history.navigate('', {trigger: false, replace: false});
                                paginationView.render({isMainPage: true, isNewUserAdded: false});
                            }
                        }
                    });
                });
            },

            showAddForm: function () {
                addUserView = new AddUserView({model: newUser, collection : contactList,
                    paginationView: paginationView,
                    isAdd: true});
                $(addUserView.$el).appendTo("body");
                this.renderUserForm(false);
                Backbone.history.navigate('', {trigger: false, replace: false});
            },

            userEdit: function() {
                this.renderUserForm(true);
                Backbone.history.navigate('', {trigger: false, replace: false});
            },

            //creating views
            createPaginationView: function () {
                if (!paginationView){
                    paginationView = new PaginationView({collection: contactList, isMainPage: true});
                }
                $(paginationView.render({isMainPage: true, isNewUserAdded: false}).el).insertAfter(".header");
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
            createContactsPerPageView: function () {
                if (!contactsPerPageView) {
                    contactsPerPageView = new ContactsPerPageView({collection : contactList,
                        multiView: usersView, paginationView: paginationView});
                }
                $(contactsPerPageView.render().el).insertAfter(".header");
            },


            renderEmptyView: function () {
                contactList.fetch();
                usersView.render({emptyView: true});
            },

            //pagination actions
            getFirstPage: function () {
                contactList.getFirstPage(options);
                paginationView.render({isMainPage : true});
                usersView.remove();
                $(usersView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
                Backbone.history.navigate('', {trigger: false, replace: false});
                this.setNavigationButtonStyles();
            },

            getLastPage: function () {
                contactList.getLastPage(options);
                paginationView.render({isNewUserAdded : true});
                usersView.remove();
                $(usersView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
                Backbone.history.navigate('', {trigger: false, replace: false});
                this.setNavigationButtonStyles();
            },

            getCurrentPage: function (id) {
                var id = Number(id);
                contactList.getPage(id, options);
                paginationView.render({isMainPage : false});
                this.setNavigationButtonStyles();
                usersView.remove();
                $(usersView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
                var $currentLi = $('[name=' + id + ']');
                $currentLi.addClass('active').siblings().removeClass('active');
                Backbone.history.navigate('', {trigger: false, replace: false});
            },

            getPrevPage: function () {
                contactList.getPreviousPage(options);
                Backbone.history.navigate('page' + (contactList.state.currentPage), true);
            },

            getNextPage: function () {
                contactList.getNextPage(options);
                Backbone.history.navigate('page' + (contactList.state.currentPage), true);
            },

            setNavigationButtonStyles: function () {
                let $firstPage = paginationView.$el.find( "li" ).eq(0);
                let $prevPage = paginationView.$el.find( "li" ).eq(1);
                let $lastPage = paginationView.$el.find( 'li:last' );
                let $nextPage = paginationView.$el.find( 'li:last' ).prev();

                if (contactList.state.currentPage === contactList.state.firstPage) {
                    $firstPage.hide();
                    $prevPage.hide();
                } else {
                    $firstPage.show();
                    $prevPage.show();
                }
                if (contactList.state.currentPage === contactList.state.lastPage) {
                    $nextPage.hide();
                    $lastPage.hide();
                } else {
                    $lastPage.show();
                    $nextPage.show();
                }
            }
        };
    };

    return MainController;
});