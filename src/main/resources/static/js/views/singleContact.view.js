define(function (require) {
    var $ = require('jquery');
    var Template = require('contactTemplate');
    var BaseView = require('baseView');
    var EditUserView = require('editUserView');
    var UserInfo = require('userInfo');
    var DeleteContactView = require('deleteContactView');
    require('jConfirm');


    var SingleView = BaseView.extend({

    className: 'contactList',

    events: {
        'click #delete': 'showDeleteDialog',
        'click #showUserInfo' : 'showUserInfo',
        'click #edit' : 'editUser'
    },

    template: Template,

    initialize: function () {
        this.userInfoViews = [];
        this.deleteDialogViews = [];
        // this.userInfoViews.push(new UserInfo({model:this.model}));
        // this.deleteDialogViews.push(new DeleteContactView({model:this.model}));

        this.listenTo(this.model,'change', this.render);
    },

    render: function () {
        BaseView.prototype.render.apply(this, arguments);
        return this;
    },

    showUserInfo: function () {
        var userInfo = new UserInfo({model:this.model});
        // if (!this.userInfoViews.length) {
        //     this.userInfoViews.push(new UserInfo({model:this.model}));
        // }
        // _(this.userInfoViews).each(function (view) {
        //    view.render();
        // }, this);
    },

    showDeleteDialog: function() {
        // _(this.deleteDialogViews).each(function (view) {
        //     view.render();
        // }, this);
        var deleteContactView = new DeleteContactView({model:this.model, el: this.el});
    },

    editUser: function () {
        var editUserView = new EditUserView({model: this.model})
    }
    });

    return SingleView;
});