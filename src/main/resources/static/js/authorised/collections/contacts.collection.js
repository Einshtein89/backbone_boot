define(function (require) {
    const Model = require('user');
    const PageableCollection = require('paginator');

    const UserList = PageableCollection.extend({

        url: "/users",

        state: {
            firstPage: 1,
            currentPage: 1,
            totalRecords: 200
        },

        queryParams: {
            currentPage: "current_page",
            pageSize: "page_size"
        },

        mode: "client",

        model: Model,

        filterModels: function (searchString) {
            let filtered = this.fullCollection.filter(function (model) {
                return model.get("firstName").toUpperCase().indexOf(searchString.toUpperCase()) !== -1
                    || model.get("lastName").toUpperCase().indexOf(searchString.toUpperCase()) !== -1
            });
            return new UserList(filtered);
        }
    });

    return UserList;
})