define(function (require) {
    var Backbone = require('backbone');
    var validation = require('validation');

    var Model = Backbone.Model.extend({

        url:"/users",

        validate: function(attrs, options) {
            var phoneCorrectness = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            var nameCorrectness = /^[a-zA-Z']+$/
            var errors = [];
            if (!nameCorrectness.test(attrs.firstName)) {
                errors.push({name: 'firstName', error: "The first name must consist of a-z, A-Z"})
                $('.firstName_error').html("The first name must consist of a-z, A-Z");
            } else {
                $('.firstName_error').html("");
            }

            if (!nameCorrectness.test(attrs.lastName)) {
                errors.push({name: 'lastName', error: "The last name must consist of a-z, A-Z"})
                $('.lastName_error').html("The last name must consist of a-z, A-Z");
            } else {
                $('.lastName_error').html("");
            }

            if (!phoneCorrectness.test(attrs.phone)) {
                errors.push({name: 'phone', error: "Phone is invalid. Please use pattern: XXXXXXXXXX"})
                $('.phone_error').html("Phone is invalid. Please use pattern: XXXXXXXXXX");
            } else {
                $('.phone_error').html("");
            }

            return errors.length > 0 ? errors : false;
        },


        validation: {
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            phone: {
                pattern: 'phone'
            }
        }
    });

    return Model;
})