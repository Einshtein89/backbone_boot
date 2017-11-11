define(function (require) {
    var Backbone = require('backbone');
    var Model = require('model');

    var UserList = Backbone.Collection.extend({

        url: "/users",

        model: Model,

        filterModels: function (searchString) {
            var filtered = this.filter(function (model) {
                return model.get("firstName").toUpperCase().indexOf(searchString.toUpperCase()) !== -1
                    || model.get("lastName").toUpperCase().indexOf(searchString.toUpperCase()) !== -1
            });
            return new UserList(filtered);
        }
    });

    return UserList;
})