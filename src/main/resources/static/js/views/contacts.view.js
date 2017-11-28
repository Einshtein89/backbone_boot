define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone =require('backbone');
    var SingleView = require('singleView');
    var paginationView;
    var emptyView;
    var subViews;

    var MultiView = Backbone.View.extend({

        className: 'main',

        initialize: function (options) {
            subViews = [];
            emptyView = options.emptyView;
            paginationView = options.paginationView;
        },

        render: function () {
            var self = this;
            this.$el.html('<center><img src=\'images/ajax-loader.gif\'/></center>');
            setTimeout(function() {
                if (emptyView) {
                    self.$el.empty();
                    _.each(subViews, function (view) {
                        view.remove();
                    });
                } else {
                    self.$el.empty();
                    _.each(subViews, function (view) {
                        view.remove();
                    });
                    self.collection.each(self.addOne, self);
                }
            }, 500);
            return this;
        },

        addOne: function(Model, singleView) {
           singleView = new SingleView({model: Model,
               collection: this.collection,
               paginationView: paginationView});
           subViews.push(singleView);
           $(singleView.render().el).appendTo(this.$el);
        }
    });

    return MultiView;
});