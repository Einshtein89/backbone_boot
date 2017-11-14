define(function (require) {
    var Backbone = require('backbone');
    var Model = require('model');
    var PageableCollection = require('paginator');

    var UserList = PageableCollection.extend({

        url: "/users",

        state: {
            firstPage: 0,
            currentPage: 0,
            totalRecords: 200
        },

        queryParams: {
            currentPage: "current_page",
            pageSize: "page_size"
        },

        mode: "client",

        model: Model,

        filterModels: function (searchString) {
            var filtered = this.fullCollection.filter(function (model) {
                return model.get("firstName").toUpperCase().indexOf(searchString.toUpperCase()) !== -1
                    || model.get("lastName").toUpperCase().indexOf(searchString.toUpperCase()) !== -1
            });
            return new UserList(filtered);
        }
    });

    return UserList;
})