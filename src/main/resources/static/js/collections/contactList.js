define(function (require) {
    var Backbone = require('backbone');
    var Model = require('model');

    var UserList = Backbone.Collection.extend({

        url: "/users",

        model: Model,

        filterModels: function (searchString) {
            var filtered = this.filter(function (model) {
                return model.get("firstName").toUpperCase() === searchString.toUpperCase()
                    || model.get("lastName").toUpperCase() === searchString.toUpperCase()
            });
            return new UserList(filtered);
        }
    });

    return UserList;
})