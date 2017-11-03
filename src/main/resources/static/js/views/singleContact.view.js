define(function (require) {
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

        this.listenTo(this.model,'change', this.render);
    },

    render: function () {
        BaseView.prototype.render.apply(this, arguments);
        return this;
    },

    showUserInfo: function () {
        var userInfo = new UserInfo({model:this.model});
    },

    showDeleteDialog: function() {
        var deleteContactView = new DeleteContactView({model:this.model, el: this.el});
    },

    editUser: function () {
        var editUserView = new EditUserView({model: this.model})
    }
    });

    return SingleView;
});