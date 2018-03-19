define(function (require) {
    const Backbone = require('backbone');

    const Model = Backbone.Model.extend({

        url:"/books",

    });

    return Model;
});