define(function (require) {
    const Backbone = require('backbone');
    require('jConfirm');


    const UserUtils = {};
    UserUtils.populateUserData = function(user, isExistedUser, isAdd){
        if (isExistedUser) {
            user.attributes.id = $("#id").val();
        }
        user.attributes.firstName = $("#firstName").val();
        user.attributes.lastName = $("#lastName").val();
        user.attributes.phone = $("#phone").val();
        user.attributes.sex = $("#sex").val();
        user.attributes.email = $("#email").val();
        if (isAdd) {
            user.attributes.password = $("#password").val();
            user.attributes.repeatPassword = $("#repeatPassword").val();
        }
    };

    UserUtils.updateModel = function(oldModel, newModel){
        oldModel.attributes.firstName = newModel.attributes.firstName;
        oldModel.attributes.lastName = newModel.attributes.lastName;
        oldModel.attributes.phone = newModel.attributes.phone;
        oldModel.attributes.sex = newModel.attributes.sex;
        oldModel.attributes.email = newModel.attributes.email;
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
    };

    UserUtils.bindValidation = function (view) {
        Backbone.Validation.bind(view, {
            valid: function(view, attr) {
                const $el = view.$('[name=' + attr + ']'),
                    $group = $el.closest('.form-group');

                $group.removeClass('has-error');
                $group.find('.help-block').html('').addClass('hidden');
            },
            invalid: function(view, attr, error) {
                const $el = view.$('[name=' + attr + ']'),
                    $group = $el.closest('.form-group');

                $group.addClass('has-error');
                $group.find('.help-block').html(error).removeClass('hidden');
            }
        });
    };

    return UserUtils;
});