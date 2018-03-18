define(function (require) {
    const Backbone = require('backbone');

    const Model = Backbone.Model.extend({

        url:"/users",

        validation: {
            firstName: [
                {
                    required: true,
                    msg: "First Name is required"
                },
                {
                    rangeLength: [2, 20],
                    msg: 'First name should have 2 to 20 characters'
                },
                {
                    pattern:  /^[a-zA-Z]+$/im,
                    msg: "First Name must contain only letters"
                }
            ],
            lastName: [
                {
                    required: true,
                    msg: "Last Name is required"
                },
                {
                    rangeLength: [2, 20],
                    msg: 'Last name should have 2 to 20 characters'
                },
                {
                    pattern:  /^[a-zA-Z]+$/im,
                    msg: "Last Name must contain only letters"
                }
            ],
            phone: {
                required: true,
                pattern:  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                msg: 'Phone is invalid. Please use pattern: XXXXXXXXXX'
            },
            email: {
                required: true,
                pattern:  'email',
                msg: 'Email format is invalid. Please update'
            },
            password: {
                minLength: 5
            },
            repeatPassword: {
                equalTo: 'password',
                msg: 'The passwords does not match'
            },
        }
    });

    return Model;
})