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

    className: 'contactList',

    events: {
        'click #delete': 'showDeleteDialog',
        'click #showUserInfo' : 'showUserInfo',
        'click #edit' : 'editUser'
    },

    template: Template,

    initialize: function (options) {
        subViews = [];
        paginationView = options.paginationView;
    },

    render: function () {
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
        $(userInfo.render().el).appendTo("body");
    },

    showDeleteDialog: function() {
        var deleteContactView = new DeleteContactView({model:this.model,
            collection: this.collection,
            paginationView: paginationView,
            userInfo : userInfo});
    },

    editUser: function () {
        var editUserView = new EditUserView({model: this.model, collection: this.collection})
        $(editUserView.render().el).appendTo("body");
    }
    });

    return SingleView;
});