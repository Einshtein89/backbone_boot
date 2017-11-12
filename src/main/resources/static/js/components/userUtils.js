define(function (require) {
    require('jConfirm');

    var UserUtils = {};
    UserUtils.populateUserData = function(user, isExistedUser){
        if (isExistedUser) {
            user.attributes.id = $("#id").val();
        }
        user.attributes.firstName = $("#firstName").val();
        user.attributes.lastName = $("#lastName").val();
        user.attributes.phone = $("#phone").val();
        user.attributes.sex = $("#sex").val();
    };

    UserUtils.updateModel = function(currentModel, newModel, isExistedUser){
        if (isExistedUser) {
            currentModel.set("id", newModel.attributes.id);
        }
        currentModel.set("firstName", newModel.attributes.firstName);
        currentModel.set("lastName", newModel.attributes.lastName);
        currentModel.set("phone", newModel.attributes.phone);
        currentModel.set("sex", newModel.attributes.sex);
    };

    UserUtils.renderMessage = function (message, addErrorDiv) {
        $.confirm({
            title: '',
            content: message,
            draggable: false,
            closeIcon: true,
            type: 'red',
            buttons: {
                ok: function () {
                },
            }
        });
        if (addErrorDiv) {
            $('#messages').html("");
            $('<div id="messages"></div>').insertBefore($('#registerform'));
            $("#messages").html(message);
        }
    };

    UserUtils.clearErrors = function () {
        $("div[class$='_error']").empty();
    }

    return UserUtils;
});