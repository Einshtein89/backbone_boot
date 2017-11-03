define(function (require) {
    var $ = require('jquery');
    var Backbone =require('backbone');
    var SingleView = require('singleView');

    var MultiView = Backbone.View.extend({

        el: '#main',

        events: {
            'click .confirm-delete': 'removeFromCollection',
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.empty();
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(Model, singleView) {
           singleView = new SingleView({model: Model});
           $(singleView.render().el).appendTo(this.$el);
        },

        removeFromCollection: function (e) {
            e.preventDefault();
            var userId = $(".id").attr('data-id');
            var user = this.collection.get(userId);
            this.collection.remove(user);
        },
    });

    return MultiView;
});