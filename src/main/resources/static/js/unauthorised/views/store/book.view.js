define(function (require) {
    var _ = require('underscore');
    var Template = require('bookTemplate');
    var BaseView = require('baseView');
    var paginationView;
    var subViews;

    var SingleView = BaseView.extend({

        className: 'bookList_tabs',

        events: {
            'click #delete': 'showDeleteDialog',
            'click #showUserInfo' : 'showUserInfo',
            'click #edit' : 'editUser'
        },

        template: Template,

        initialize: function (options) {
            subViews = [];
            paginationView = options.paginationView;
            this.template = options.template ? options.template : Template;
            this.className = options.className ? options.className : 'contactList_tabs';
            this.render(options);
        },

        render: function (options) {
            _.each(subViews, function (view) {
                view.remove();
            });
            BaseView.prototype.render.apply(this, arguments);
            return this;
        }
    });

    return SingleView;
});