define(function (require) {
    const BackboneRouteControl = require('controller');

    const Router = BackboneRouteControl.extend({
        routes: {
            //admin and user pages
            '' : 'main#renderHomePage',
            'home' : 'main#renderHomePage',
            'admin': 'main#renderAdminPage',
            'user': 'main#renderAdminPage',
            'admin/:listView': 'main#renderAdminPage',
            'admin/:tabView': 'main#renderAdminPage',
            'add': 'main#showAddForm',
            'edit' : 'main#userEdit',
            'renderEmptyView' : 'main#renderEmptyView',
            'first' : 'main#getFirstPage',
            'last' : 'main#getLastPage',
            'page:id' : 'main#getCurrentPage',
            'prev': 'main#getPrevPage',
            'next': 'main#getNextPage'
        }
    });

    return Router;
});