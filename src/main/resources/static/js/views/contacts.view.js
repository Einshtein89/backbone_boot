define(function (require) {
    var $ = require('jquery');
    var Backbone =require('backbone');
    var SingleView = require('singleView');
    var paginationView;

    var MultiView = Backbone.View.extend({

        el: '#main',

        initialize: function (options) {
            var emptyView = options.emptyView;
            this.listenTo(this.collection,'change', this.render(emptyView));
            paginationView = options.paginationView;
        },

        render: function (emptyView) {
            if (emptyView) {
                this.$el.empty();
            } else {
                this.$el.empty();
                this.collection.each(this.addOne, this);
            }
            return this;
        },

        addOne: function(Model, singleView) {
           singleView = new SingleView({model: Model, collection: this.collection, paginationView: paginationView});
           $(singleView.render().el).appendTo(this.$el);
        }
    });

    return MultiView;
});