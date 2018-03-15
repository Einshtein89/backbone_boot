define(function (require) {
    var BackboneRouteControl = require('controller');

    var Router = BackboneRouteControl.extend({
        routes: {
            '' : 'main#renderHomePage',
            'home' : 'main#renderHomePage',
            'admin': 'main#renderAdminPage',
            'user': 'main#renderUserPage',
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