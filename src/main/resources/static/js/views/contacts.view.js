define(function (require) {
    var $ = require('jquery');
    var Backbone =require('backbone');
    var SingleView = require('singleView');

    var MultiView = Backbone.View.extend({

        el: '#main',

        initialize: function () {
            this.listenTo(this.collection,'change', this.render);
        },

        render: function () {
            this.$el.empty();
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(Model, singleView) {
           singleView = new SingleView({model: Model});
           $(singleView.render().el).appendTo(this.$el);
        }
    });

    return MultiView;
});