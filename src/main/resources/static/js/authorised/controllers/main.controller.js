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

            renderListView: function (options, usersView) {
                options.singleViewTemplate = singleViewListTemplate;
                options.className = 'contactList_list';
                usersView.render(options);
            },

            renderTabView: function (options, usersView) {
                options.singleViewTemplate = null;
                options.className = null;
                usersView.render(options);
            },

            chooseListOrTabView: function () {
                let self = this;
                usersView.on('view:listView', function (options) {
                    self.renderListView(options, this);
                    Backbone.history.navigate('admin/listView', {trigger: false, replace: true});
                });
                usersView.on('view:tabsView', function (options) {
                    self.renderTabView(options, this);
                    Backbone.history.navigate('admin/tabView', {trigger: false, replace: true});
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
                        multiView: usersView, paginationView: paginationView});
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

            getCurrentPage: function (pageId) {
                let id = Number(pageId);
                contactList.getPage(id, options);
                paginationView.render({isMainPage : false});
                this.setNavigationButtonStyles();
                usersView.remove();
                $(usersView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
                let $currentLi = $('[name=' + id + ']');
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