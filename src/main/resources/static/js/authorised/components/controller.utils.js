define(function (require) {
    const Backbone = require('backbone');
    require('jConfirm');


    const ControllerUtils = {};

    ControllerUtils.isAdmin = function(options) {
        var options = options || {};
        const ajax = $.ajax({
            url: '../isAuthorised',
            contentType: "application/json",
            success: function (response) {
                options.isAdmin = response;
            }
        });
        return ajax;
    };

    //pagination actions
    ControllerUtils.getFirstPage = function (collection, paginationView, contactsPerPageView, mainView, options) {
        collection.getFirstPage(options);
        paginationView.render({isMainPage : true});
        mainView.remove();
        $(mainView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
        Backbone.history.navigate(options.redirectTo, {trigger: false, replace: false});
        this.setNavigationButtonStyles(collection, paginationView);
    };

    ControllerUtils.getLastPage = function (collection, paginationView, contactsPerPageView, mainView, options) {
        collection.getLastPage(options);
        paginationView.render({isNewUserAdded : true});
        mainView.remove();
        $(mainView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
        Backbone.history.navigate(options.redirectTo, {trigger: false, replace: false});
        this.setNavigationButtonStyles(collection, paginationView);
    };

    ControllerUtils.getCurrentPage = function (pageId, collection, paginationView, contactsPerPageView, mainView, options) {
        let id = Number(pageId);
        collection.getPage(id, options);
        paginationView.render({isMainPage : false});
        this.setNavigationButtonStyles(collection, paginationView);
        mainView.remove();
        $(mainView.render().el).insertAfter("." + contactsPerPageView.$el[0].className);
        let $currentLi = $('[name=' + id + ']');
        $currentLi.addClass('active').siblings().removeClass('active');
        Backbone.history.navigate(options.redirectTo, {trigger: false, replace: false});
    };

    ControllerUtils.getPrevPage = function (collection, options) {
        collection.getPreviousPage(options);
        Backbone.history.navigate('page' + (collection.state.currentPage), true);
    };

    ControllerUtils.getNextPage = function (collection, options) {
        collection.getNextPage(options);
        Backbone.history.navigate('page' + (collection.state.currentPage), true);
    };

    ControllerUtils.setNavigationButtonStyles = function (collection, paginationView) {
        let $firstPage = paginationView.$el.find( "li" ).eq(0);
        let $prevPage = paginationView.$el.find( "li" ).eq(1);
        let $lastPage = paginationView.$el.find( 'li:last' );
        let $nextPage = paginationView.$el.find( 'li:last' ).prev();

        if (collection.state.currentPage === collection.state.firstPage) {
            $firstPage.hide();
            $prevPage.hide();
        } else {
            $firstPage.show();
            $prevPage.show();
        }
        if (collection.state.currentPage === collection.state.lastPage) {
            $nextPage.hide();
            $lastPage.hide();
        } else {
            $lastPage.show();
            $nextPage.show();
        }
    };

    ControllerUtils.chooseListOrTabView = function (view, navigateToListView, navigateToTabView, singleViewListTemplate) {
        const self = this;
        view.on('view:listView', function (options) {
            self.renderListView(options, this, singleViewListTemplate);
            Backbone.history.navigate(navigateToListView, {trigger: false, replace: true});
        });
        view.on('view:tabsView', function (options) {
            self.renderTabView(options, this);
            Backbone.history.navigate(navigateToTabView, {trigger: false, replace: true});
        });
    };

    ControllerUtils.renderListView = function (options, view, singleViewListTemplate) {
        options.singleViewTemplate = singleViewListTemplate;
        options.className = 'contactList_list';
        view.render(options);
    };

    ControllerUtils.renderTabView = function (options, view) {
        options.singleViewTemplate = null;
        options.className = null;
        view.render(options);
    };

    return ControllerUtils;
});