define(function (require) {
    var _ = require('underscore');
    var Template = require('contactTemplate');
    var BaseView = require('baseView');
    var EditUserView = require('editUserView');
    var UserInfo = require('userInfo');
    var DeleteContactView = require('deleteContactView');
    var paginationView;
    var subViews;
    var userInfo;

    var SingleView = BaseView.extend({

    className: 'contactList_tabs',

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
    },

    showUserInfo: function () {
        _.each(subViews, function (view) {
            view.remove();
        });
        userInfo = new UserInfo({model:this.model});
        subViews.push(userInfo);
        $(userInfo.$el).appendTo("body");
    },

    showDeleteDialog: function() {
        var deleteContactView = new DeleteContactView({model:this.model,
            collection: this.collection,
            paginationView: paginationView,
            userInfo : userInfo});
    },

    editUser: function () {
        var editUserView = new EditUserView({model: this.model, collection: this.collection, isEdit:true})
        $(editUserView.$el).appendTo("body");
    }
    });

    return SingleView;
});