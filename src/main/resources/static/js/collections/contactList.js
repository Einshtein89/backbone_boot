define(function (require) {
    var Backbone = require('backbone');
    var Model = require('model');

    var UserList = Backbone.Collection.extend({

        url: "/users",

        model: Model,
    });

    return UserList;
})