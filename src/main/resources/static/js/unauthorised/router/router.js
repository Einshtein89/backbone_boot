define(function (require) {
    const BackboneRouteControl = require('controller');

    const Router = BackboneRouteControl.extend({
        routes: {
            '' : 'main#renderHomePage',
            'home' : 'main#renderHomePage',
            'store' : 'main#renderBooksPage',
            // 'admin': 'main#renderAdminPage',
            // 'user': 'main#renderAdminPage',
            // 'admin/:listView': 'main#renderAdminPage',
            // 'admin/:tabView': 'main#renderAdminPage',
            // 'add': 'main#showAddForm',
            // 'edit' : 'main#userEdit',
            // 'renderEmptyView' : 'main#renderEmptyView',
            'first' : 'main#getFirstPage',
            'last' : 'main#getLastPage',
            'page:id' : 'main#getCurrentPage',
            'prev': 'main#getPrevPage',
            'next': 'main#getNextPage'
        }
    });

    return Router;
});