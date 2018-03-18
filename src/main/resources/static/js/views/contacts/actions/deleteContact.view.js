define(function (require) {
    var Backbone =require('backbone');
    var BaseView = require('baseView');
    require('jConfirm');
    var paginationView;
    var collection;
    var userInfo;

    var DeleteContactView = BaseView.extend({

        initialize: function (options) {
            paginationView = options.paginationView;
            userInfo = options.userInfo;
            collection = this.collection;
            this.render(options);
        },

        render: function (options) {
            this.showDeleteDialog(options);
            return this;
        },

        showDeleteDialog: function(options) {
            var self = this;
            $.confirm({
                title: 'Delete Confirmation',
                content: 'Do you really want to delete '
                + '<text class="userName">' + this.model.get("firstName") + '</text>' + '?',
                draggable: false,
                closeIcon: true,
                container: '.main',
                type: 'red',
                buttons: {
                    confirm: {
                        btnClass: 'confirm-delete',
                        action: function () {
                            self.model.url = self.model.url + "/" +  self.model.id;
                            self.model.destroy({
                                success: function () {
                                    self.removeInfo();
                                    self.remove();
                                    self.renderPaginationView(options);
                                },
                                error: function () {
                                    console.log("Something went wrong...")
                                }
                            });
                        }
                    },
                    cancel: function () {
                        self.remove();
                    },
                }
            });
        },

        renderPaginationView: function (options) {
            paginationView.render(options);
            Backbone.history.navigate('page' + collection.state.currentPage, true);
            Backbone.history.navigate('admin', {trigger: false, replace: false});
        },

        removeInfo: function () {
            if (userInfo) {
                userInfo.remove();
            }
        }
    });

    return DeleteContactView;
});