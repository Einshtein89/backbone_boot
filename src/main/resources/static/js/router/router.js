define(function (require) {
    var BackboneRouteControl = require('controller');

    var Router = BackboneRouteControl.extend({
        routes: {
            '': 'main#renderAllUsers',
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