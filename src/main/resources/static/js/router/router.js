define(function (require) {
    var BackboneRouteControl = require('controller');

    var Router = BackboneRouteControl.extend({
        routes: {
            '': 'main#renderAllUsers',
            'add': 'main#showAddForm',
            'edit' : 'main#userEdit',
            'resetSearch' : 'main#resetCollection',
            'first' : 'main#getFirstPage',
            'last' : 'main#getLastPage',
            'page:id' : 'main#getCurrentPage',
            'prev': 'main#getPrevPage',
            'next': 'main#getNextPage'
        }
    });

    return Router;
});