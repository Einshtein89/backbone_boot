define(function (require) {
    let $ = require('jquery');
    let Backbone = require('backbone');
    let BooksPageView = require('booksView');
    let BooksList = require('booksList');
    let HomePageView = require('homePageView');
    let BooksHeaderView = require('headerView');
    let ContactsPerPageView = require('contactsPerPageView');
    let PaginationView = require('paginationView');
    let SelectViewView = require('selectViewView');
    let ControllerUtils = require('controllerUtils');
    let singleViewListTemplate = require('contactListTemplate');
    let booksPageView;
    let homePageView;
    let booksHeaderView;
    let paginationView;
    let selectViewView;
    let contactsPerPageView;
    let bookList = new BooksList();
    let globalOptions;

    let MainController = function(options) {
        return {
            //rendering actions
            renderHomePage: function () {
                var options = options || {};
                this.createHomePageView(options);
                this.deleteBooksPage();
            },

            renderBooksPage: function () {
                var options = options || {};
                this.deleteHomePage();
                let self = this;
                if (bookList.fullCollection.models.length === 0) {
                    bookList.setPageSize(3, options);
                    bookList.fetch({
                        success: function () {
                            self.createBooksPageView(options);
                            // if (view === "listView") {
                            //     self.renderListView(globalOptions, usersView);
                            // }
                        }
                    })
                } else {
                    self.refreshBooksPage();
                }
            },
            //creating views
            createHomePageView: function (options) {
                if (!homePageView){
                    homePageView = new HomePageView(options);
                }
                $(homePageView.$el).insertBefore(".footer");
            },

            createBooksPageView: function (options) {
                this.createHeaderView();
                this.createMultiView();
                this.createPaginationView();
                this.createContactsPerPageView();
                this.createSelectViewView(globalOptions);
                this.chooseListOrTabView(globalOptions);
            },

            createHeaderView: function () {
                if (!booksHeaderView){
                    booksHeaderView = new BooksHeaderView(globalOptions);
                }
                $(booksHeaderView.render().el).insertBefore(".footer");
            },

            createMultiView: function (globalOptions) {
                if (!booksPageView){
                    booksPageView = new BooksPageView({collection: bookList});
                }
                $(booksPageView.render().el).insertAfter(".menu");
            },

            createPaginationView: function () {
                if (!paginationView){
                    paginationView = new PaginationView({collection: bookList, isMainPage: true});
                }
                $(paginationView.render({isMainPage: true, isNewUserAdded: false}).el)
                    .insertAfter("." + booksPageView.$el[0].className);

            },

            createContactsPerPageView: function () {
                if (!contactsPerPageView) {
                    contactsPerPageView = new ContactsPerPageView({collection : bookList,
                        multiView: booksPageView, paginationView: paginationView, redirectTo: "store"});
                }
                $(contactsPerPageView.render().el).insertAfter(".menu");
            },

            createSelectViewView: function () {
                if (!selectViewView) {
                    selectViewView = new SelectViewView({collection : bookList,
                        multiView: booksPageView, paginationView: paginationView});
                }
                $(selectViewView.$el).insertAfter(".menu");
            },

            deleteHomePage: function () {
                if (homePageView) homePageView.remove(); homePageView = null;
            },

            deleteBooksPage: function () {
                bookList.fullCollection.models = [];
                if (booksHeaderView) booksHeaderView.remove();
                if (booksPageView) booksPageView.remove(); booksPageView = null;
                if (paginationView)  paginationView.remove(); paginationView = null;
                if (contactsPerPageView) contactsPerPageView.remove(); contactsPerPageView = null;
            },

            refreshBooksPage: function () {
                booksPageView.remove();
                $(booksPageView.render().el).insertAfter(".menu");
                this.getLastPage();
                paginationView.render({isMainPage: false, isNewUserAdded: true});
            },

            chooseListOrTabView: function () {
                ControllerUtils.chooseListOrTabView(booksPageView, 'store/listView', 'store/tabView', singleViewListTemplate);
            },


            //pagination actions
            getFirstPage: function () {
                var options = {};
                options.redirectTo = "store";
                ControllerUtils.getFirstPage(bookList, paginationView, contactsPerPageView, booksPageView, options);
            },

            getLastPage: function () {
                var options = {};
                options.redirectTo = "store";
                ControllerUtils.getLastPage(bookList, paginationView, contactsPerPageView, booksPageView, options);
            },

            getCurrentPage: function (pageId) {
                var options = {};
                options.redirectTo = "store";
                ControllerUtils.getCurrentPage(pageId, bookList, paginationView, contactsPerPageView, booksPageView, options);
            },

            getPrevPage: function () {
                ControllerUtils.getPrevPage(bookList, options);
            },

            getNextPage: function () {
                ControllerUtils.getNextPage(bookList, options);
            }
        }
    };

    return MainController;
});