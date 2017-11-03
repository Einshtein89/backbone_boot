define(function (require) {
    var $ = require('jquery');
    var Backbone =require('backbone');
    var BaseView = require('baseView');
    var UserInfo = require('userInfo');

    var DeleteContactView = BaseView.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.showDeleteDialog();
            return this;
        },

        showDeleteDialog: function() {
            var self = this;
            $.confirm({
                title: 'Delete Confirmation',
                content: 'Do you really want to delete '
                + '<text class="userName">' + this.model.get("firstName") + '</text>' + '?',
                draggable: false,
                closeIcon: true,
                container: '#main',
                type: 'red',
                buttons: {
                    confirm: {
                        btnClass: 'confirm-delete',
                        action: function () {
                            self.removeInfo();
                            self.model.url = self.model.url + "/" +  self.model.id;
                            self.model.destroy({
                                success: function () {
                                    self.$el.remove();
                                },
                                error: function () {
                                    console.log("Something went wrong...")
                                }
                            });
                        }
                    },
                    cancel: function () {
                    },
                }
            });
        },

        removeInfo: function () {
            // UserInfo.prototype.remove.call(this, arguments);
            var userInfoEl = UserInfo.prototype.el;
            $(userInfoEl).empty();
            $(userInfoEl).animate({
                opacity: 0,
                top: "-50px",
            }, 0 );
        }
    });

    return DeleteContactView;
});