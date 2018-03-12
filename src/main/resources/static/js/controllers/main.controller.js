define(function (require) {
    var $ = require('jquery');
    var Backbone = require('backbone');
    var MultiView = require('multiView');
    var ContactList = require('contactList');
    var SearchView = require('searchView');
    var AddUserView = require('addUserView');
    var PaginationView = require('paginationView');
    var ContactsPerPageView = require('contactsPerPageView');
    var SelectViewView = require('selectViewView');
    var singleViewListTemplate = require('contactListTemplate');
    var AdminHeaderView = require('headerView');
    var HomePageView = require('homePageView');
    var User = require('model');
    var contactList = new ContactList();
    var newUser = new User();
    var usersView;
    var searchView;
    var addUserView;
    var paginationView;
    var contactsPerPageView;
    var selectViewView;
    var adminHeaderView;
    var homePageView;

    var MainController = function(options) {
        return {
            //rendering actions
            renderHomePage: function () {
                this.createHomePageView();
                this.deleteAdminPage();
                // $(".content_home").css("display", "block");
            },
            renderAdminPage: function () {
                this.deleteHomePage();
                var self = this;
                if (contactList.fullCollection.models.length === 0) {
                    contactList.setPageSize(3, options);
                    contactList.fetch({
                        success: function () {
                            self.createAdminPage();
                        }
                    })
                } else {
                    self.refreshAdminPage();
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
                                Backbone.history.navigate('admin', {trigger: false, replace: false});
                                paginationView.render({isMainPage: true, isNewUserAdded: false});
                            }
                        }
                    });
                });
            },

            chooseListOrTabView: function () {
                usersView.on('view:listView', function (options) {
                    options.singleViewTemplate = singleViewListTemplate;
                    options.className = 'contactList_list';
                    this.render(options);
                });
                usersView.on('view:tabsView', function (options) {
                    options.singleViewTemplate = null;
                    options.className = null;
                    this.render(options);
                });
            },

            showAddForm: function () {
                addUserView = new AddUserView({model: newUser, collection : contactList,
                    paginationView: paginationView,
                    isAdd: true});
                $(addUserView.$el).appendTo("body");
                this.renderUserForm(false);
                Backbone.history.navigate('admin', {trigger: false, replace: false});
            },

            userEdit: function() {
                this.renderUserForm(true);
                Backbone.history.navigate('admin', {trigger: false, replace: false});
            },

            //creating views
            createHomePageView: function () {
                if (!homePageView){
                    homePageView = new HomePageView();
                }
                $(homePageView.render().el).insertBefore(".footer");
            },

            createAdminPage: function () {
                this.createHeaderView();
                this.createPaginationView();
                this.createContactsPerPageView();
                this.createMultiView();
                this.createSelectViewView();
                $(usersView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
                this.createSearchView();
                this.renderSearch();
                this.chooseListOrTabView();
            },

            createHeaderView: function () {
                if (!adminHeaderView){
                    adminHeaderView = new AdminHeaderView();
                }
                $(adminHeaderView.render().el).insertBefore(".footer");
            },

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

            createSelectViewView: function () {
                if (!selectViewView) {
                    selectViewView = new SelectViewView({collection : contactList,
                        multiView: usersView, paginationView: paginationView});
                }
                $(selectViewView.render().el).insertAfter(".header");
            },

            renderEmptyView: function () {
                contactList.fetch();
                usersView.render({emptyView: true});
            },

            deleteHomePage: function () {
                if (homePageView) homePageView.remove(); homePageView = null;
            },

            deleteAdminPage: function () {
                contactList.fullCollection.models = [];
                if (usersView) usersView.remove(); usersView = null;
                if (adminHeaderView) adminHeaderView.remove();
                if (paginationView)  paginationView.remove(); paginationView = null;
                if (contactsPerPageView) contactsPerPageView.remove(); contactsPerPageView = null;
                if (selectViewView) selectViewView.remove(); selectViewView = null;
                if (searchView) searchView.remove(); searchView = null;
            },

            refreshAdminPage: function () {
                usersView.remove();
                $(usersView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
                this.getLastPage();
                paginationView.render({isMainPage: false, isNewUserAdded: true});
            },

            //pagination actions
            getFirstPage: function () {
                contactList.getFirstPage(options);
                paginationView.render({isMainPage : true});
                usersView.remove();
                $(usersView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
                Backbone.history.navigate('admin', {trigger: false, replace: false});
                this.setNavigationButtonStyles();
            },

            getLastPage: function () {
                contactList.getLastPage(options);
                paginationView.render({isNewUserAdded : true});
                usersView.remove();
                $(usersView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
                Backbone.history.navigate('admin', {trigger: false, replace: false});
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
                Backbone.history.navigate('admin', {trigger: false, replace: false});
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