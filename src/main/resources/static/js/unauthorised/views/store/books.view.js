define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var SingleView = require('bookView');
    var paginationView;
    var emptyView;
    var subViews;
    var singleViewTemplate;
    var className;
    var isAdmin;

    var BooksView = Backbone.View.extend({

        className: 'content_books tabcontent',

        events: {
            // 'click #deleteUsersButton': 'showDeleteDialog',
        },

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
                isAdmin = options.isAdmin;
            }
            setTimeout(function() {
                if (emptyView) {
                    self.removeViews();
                } else {
                    self.removeViews();
                    self.collection.each(self.addOne, self);
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
                    className: className,
                    isAdmin: isAdmin});
            } else {
                singleView = new SingleView({model: Model,
                    collection: this.collection,
                    paginationView: paginationView,
                    isAdmin: isAdmin});
            }
            subViews.push(singleView);
            $(singleView.$el).appendTo(this.$el);
        },

        removeViews: function() {
            this.$el.empty();
            _.each(subViews, function (view) {
                view.remove();
            });
        },

        remove: function () {
            this.$el.remove();
            this.removeViews();
        },

        enableDeleteButton: function () {
            var checkBoxes = $("input[name='idList']");
            checkBoxes.change(function () {
                $('#deleteUsersButton').prop('disabled', checkBoxes.filter(':checked').length < 1);
            });
        },

        showDeleteDialog: function (options) {
            this.removeEach(subViews, options);
        }
    });

    return BooksView;
});