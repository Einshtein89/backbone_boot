define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var SingleView = require('singleView');
    var deleteFormTemplate = require('batchDeleteForm');
    var paginationView;
    var emptyView;
    var subViews;
    var singleViewTemplate;
    var className;

    var MultiView = Backbone.View.extend({

        className: 'main',

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
            }
            setTimeout(function() {
                if (emptyView) {
                    self.removeViews();
                } else {
                    self.removeViews();
                    self.collection.each(self.addOne, self);
                    if (className) {
                        self.$el.prepend(deleteFormTemplate);
                        self.enableDeleteButton();
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
        },

        removeEach: function (subViews, options) {
            var self = this;
            var checkedCheckboxes = $("input[name='idList']").filter(':checked');
            checkedCheckboxes.each(function () {
                var contact = self.collection.findWhere({
                    id: Number($( this ).val())
                });
                contact.url = contact.url + "/" +  contact.id;
                contact.destroy();
                _.each(subViews, function (view) {
                    if (view.model.id === contact.id) {
                        view.remove();
                    }
                });
            });
            paginationView.render(options);
            Backbone.history.navigate('page' + self.collection.state.currentPage, true);
            Backbone.history.navigate('admin', {trigger: true, replace: true});
        }
    });

    return MultiView;
});