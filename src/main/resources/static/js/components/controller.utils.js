define(function (require) {
    var Backbone = require('backbone');
    require('jConfirm');


    var ControllerUtils = {};

    ControllerUtils.isAdmin = function(options) {
        var options = options || {};
        var ajax = $.ajax({
            url: '../isAdmin',
            contentType: "application/json",
            success: function (response) {
                options.isAdmin = response;
            }
        });
        return ajax;
    };

    return ControllerUtils;
});