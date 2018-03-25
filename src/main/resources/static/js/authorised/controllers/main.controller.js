define(function (require) {
    let $ = require('jquery');
    let Backbone = require('backbone');
    let MultiView = require('multiView');
    let ContactList = require('contactList');
    let SearchView = require('searchView');
    let AddUserView = require('addUserView');
    let PaginationView = require('paginationView');
    let ContactsPerPageView = require('contactsPerPageView');
    let SelectViewView = require('selectViewView');
    let singleViewListTemplate = require('contactListTemplate');
    let AdminHeaderView = require('headerView');
    let HomePageView = require('homePageView');
    let ControllerUtils = require('controllerUtils');
    let User = require('user');
    let contactList = new ContactList();
    let newUser = new User();
    let usersView;
    let searchView;
    let addUserView;
    let paginationView;
    let contactsPerPageView;
    let selectViewView;
    let adminHeaderView;
    let homePageView;
    let globalOptions;

    let MainController = function(options) {
        return {
            //rendering actions
            renderHomePage: function () {
                var options = options || {};
                $.when(ControllerUtils.isAdmin(options)).then(function () {
                    this.createHomePageView(options);
                    this.deleteAdminPage();
                }.bind(this));
            },
            renderAdminPage: function (view) {
                var options = options || {};
                $.when(ControllerUtils.isAdmin(options)).then(function () {
                    globalOptions = options;
                    this.deleteHomePage();
                    let self = this;
                    if (contactList.fullCollection.models.length === 0) {
                        contactList.setPageSize(3, options);
                        contactList.fetch({
                            success: function () {
                                self.createAdminPage();
                                if (view === "listView") {
                                    self.renderListView(globalOptions, usersView);
                                }
                            }
                        })
                    } else {
                        self.refreshAdminPage();
                    }
                }.bind(this));
            },

            renderUserPage: function () {

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
                ControllerUtils.chooseListOrTabView(usersView, 'admin/listView', 'admin/tabView', singleViewListTemplate);
            },

            // renderListView: function (options, usersView) {
            //     options.singleViewTemplate = singleViewListTemplate;
            //     options.className = 'contactList_list';
            //     usersView.render(options);
            // },
            //
            // renderTabView: function (options, usersView) {
            //     options.singleViewTemplate = null;
            //     options.className = null;
            //     usersView.render(options);
            // },

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
            createHomePageView: function (options) {
                if (!homePageView){
                    homePageView = new HomePageView(options);
                }
                $(homePageView.$el).insertBefore(".footer");
            },

            createAdminPage: function () {
                this.createHeaderView(globalOptions);
                this.createPaginationView();
                this.createContactsPerPageView();
                this.createMultiView();
                this.createSelectViewView(globalOptions);
                $(usersView.render(globalOptions).el).insertAfter("." + contactsPerPageView.$el[0].className);
                this.createSearchView();
                this.renderSearch();
                this.chooseListOrTabView(globalOptions);
            },

            createHeaderView: function () {
                if (!adminHeaderView){
                    adminHeaderView = new AdminHeaderView(globalOptions);
                }
                $(adminHeaderView.render(globalOptions).el).insertBefore(".footer");
            },

            createPaginationView: function () {
                if (!paginationView){
                    paginationView = new PaginationView({collection: contactList, isMainPage: true});
                }
                $(paginationView.render({isMainPage: true, isNewUserAdded: false}).el).insertAfter(".header");
            },

            createMultiView: function (globalOptions) {
                if (!usersView) {
                    usersView = new MultiView({collection: contactList,
                        paginationView: paginationView,
                        options: globalOptions});
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
                        multiView: usersView, paginationView: paginationView, redirectTo: "admin"});
                }
                $(contactsPerPageView.render().el).insertAfter(".header");
            },

            createSelectViewView: function (globalOptions) {
                if (!selectViewView) {
                    selectViewView = new SelectViewView({collection : contactList,
                        multiView: usersView, paginationView: paginationView, isAdmin: globalOptions.isAdmin});
                }
                $(selectViewView.$el).insertAfter(".header");
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
                var options = {};
                options.redirectTo = "admin";
                ControllerUtils.getFirstPage(contactList, paginationView, contactsPerPageView, usersView, options);
            },

            getLastPage: function () {
                var options = {};
                options.redirectTo = "admin";
                ControllerUtils.getLastPage(contactList, paginationView, contactsPerPageView, usersView, options);
            },

            getCurrentPage: function (pageId) {
                var options = {};
                options.redirectTo = "admin";
                ControllerUtils.getCurrentPage(pageId, contactList, paginationView, contactsPerPageView, usersView, options);
            },

            getPrevPage: function () {
                ControllerUtils.getPrevPage(contactList, options);
            },

            getNextPage: function () {
                ControllerUtils.getNextPage(contactList, options);
            }
        };
    };

    return MainController;
});