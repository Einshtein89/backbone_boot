define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone =require('backbone');
    var SingleView = require('singleView');
    var paginationView;
    var emptyView;
    var subViews;
    var singleViewTemplate;
    var className;

    var MultiView = Backbone.View.extend({

        className: 'main',

        initialize: function (options) {
            subViews = [];
            emptyView = options.emptyView;
            paginationView = options.paginationView;
        },

        render: function (options) {
            var self = this;
            this.$el.html('<center><img src=\'../images/ajax-loader.gif\'/></center>');
            if (options) {
                singleViewTemplate = options.singleViewTemplate;
                className = options.className;
            }
            setTimeout(function() {
                if (emptyView) {
                    self.removeViews();
                } else {
                    self.removeViews();
                    self.collection.each(self.addOne, self);
                    if (className) {
                        self.$el.prepend('<button>DELETE</button>');
                        self.$el.append('<button>DELETE</button>');
                    }
                }
            }, 500);
            return this;
        },

        addOne: function(Model, singleView) {
            if (singleViewTemplate) {
                singleView = new SingleView({model: Model,
                    collection: this.collection,
                    paginationView: paginationView,
                    template: singleViewTemplate,
                    className: className});
            } else {
                singleView = new SingleView({model: Model,
                    collection: this.collection,
                    paginationView: paginationView});
            }
           subViews.push(singleView);
           $(singleView.$el).appendTo(this.$el);
        },

        removeViews: function() {
            this.$el.empty();
            _.each(subViews, function (view) {
                view.remove();
            });
        }
    });

    return MultiView;
});