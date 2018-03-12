function checkPasswordMatch() {
    var password = $("#password").val();
    var confirmPassword = $("#passwordagain").val();

    if (password != confirmPassword)
        $("#divCheckPasswordMatch").html("Passwords do not match!");
    else
        $("#divCheckPasswordMatch").html("Passwords match.");
}

$(document).ready(function () {
    $("#txtNewPassword, #txtConfirmPassword").keyup(checkPasswordMatch);
    $("#submitButton").prop("disabled", true);
    $("#passwordagain").on('keyup',function() {
        if($(this).val() == $("#password").val()) {
                $("#submitButton").removeAttr('disabled');
            }
        else{
            $("#submitButton").prop("disabled", true)
        }
    });
    $("#password").on('keyup',function() {
        if($(this).val() == $("#passwordagain").val()) {
            $("#submitButton").removeAttr('disabled');
        }
        else{
            $("#submitButton").prop("disabled", true)
        }
    });
});


