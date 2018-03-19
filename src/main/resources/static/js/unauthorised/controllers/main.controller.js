define(function (require) {
    let $ = require('jquery');
    let Backbone = require('backbone');
    let BooksPageView = require('booksView');
    let BooksList = require('booksList');
    let booksPageView;
    let bookList = new BooksList();

    let MainController = function(options) {
        return {
            //rendering actions
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
            createBooksPageView: function (options) {
                if (!booksPageView){
                    booksPageView = new BooksPageView({collection: bookList});
                }
                $(booksPageView.render().el).insertBefore(".footer");
            },

            deleteHomePage: function () {
                if (homePageView) homePageView.remove(); homePageView = null;
            },
        }
    };

    return MainController;
});