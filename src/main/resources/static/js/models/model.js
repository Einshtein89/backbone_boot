define(function (require) {
    var Backbone = require('backbone');
    var Validation = require('validation');

    var Model = Backbone.Model.extend({

        url:"/users",

        // validate: function(attrs, options) {
        //     var phoneCorrectness = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        //     var nameCorrectness = /^[a-zA-Z']+$/
        //     var errors = [];
        //     var error;
        //     if (!nameCorrectness.test(attrs.firstName)) {
        //         error = "The first name must consist of a-z, A-Z";
        //         errors.push({name: 'firstName', error: error})
        //         $('.firstName_error').html(error);
        //     } else {
        //         $('.firstName_error').html("");
        //     }
        //
        //     if (!nameCorrectness.test(attrs.lastName)) {
        //         error = "The last name must consist of a-z, A-Z";
        //         errors.push({name: 'lastName', error: error})
        //         $('.lastName_error').html(error);
        //     } else {
        //         $('.lastName_error').html("");
        //     }
        //
        //     if (!phoneCorrectness.test(attrs.phone)) {
        //         error = "Phone is invalid. Please use pattern: XXXXXXXXXX";
        //         errors.push({name: 'phone', error: error})
        //         $('.phone_error').html(error);
        //     } else {
        //         $('.phone_error').html("");
        //     }
        //
        //     return errors.length > 0 ? errors : false;
        // },

        validation: {
            firstName: {
                required: true,
                msg: "The first Name is required"
            },
            lastName: {
                required: true,
                msg: "The last Name is required"
            },
            // phone: {
            //     pattern: 'phone'
            // }
        }
    });

    return Model;
})