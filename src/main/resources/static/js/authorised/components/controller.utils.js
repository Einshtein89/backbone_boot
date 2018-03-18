define(function (require) {
    const Backbone = require('backbone');
    require('jConfirm');


    const ControllerUtils = {};

    ControllerUtils.isAdmin = function(options) {
        var options = options || {};
        const ajax = $.ajax({
            url: '../isAuthorised',
            contentType: "application/json",
            success: function (response) {
                options.isAdmin = response;
            }
        });
        return ajax;
    };

    return ControllerUtils;
});