define(function (require) {
    let $ = require('jquery');
    let Backbone = require('backbone');
    let BooksPageView = require('booksView');
    let BooksList = require('booksList');
    let HomePageView = require('homePageView');
    let BooksHeaderView = require('headerView');
    let booksPageView;
    let homePageView;
    let booksHeaderView;
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
                bookList.setPageSize(3, options);
                bookList.fetch({
                    success: function () {
                        self.createBooksPageView(options);
                        // if (view === "listView") {
                        //     self.renderListView(globalOptions, usersView);
                        // }
                    }
                })
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

            },

            createHeaderView: function () {
                if (!booksHeaderView){
                    booksHeaderView = new BooksHeaderView(globalOptions);
                }
                $(booksHeaderView.$el).insertBefore(".footer");
            },

            createMultiView: function (globalOptions) {
                if (!booksPageView){
                    booksPageView = new BooksPageView({collection: bookList});
                }
                $(booksPageView.render().el).insertAfter(".header");
            },

            deleteHomePage: function () {
                if (homePageView) homePageView.remove(); homePageView = null;
            },

            deleteBooksPage: function () {
                
            }
        }
    };

    return MainController;
});