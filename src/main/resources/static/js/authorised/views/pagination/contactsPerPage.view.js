define(function (require) {
    let Template = require('contactsPerPageTemplate');
    let $ = require('jquery');
    let Backbone = require('backbone');
    let Dust = require('dust');
    let collection;
    let multiView;
    let paginationView;
    let redirectTo;

    const ContactsPerPageView = Backbone.View.extend({

        className: 'contactPerPageHolder',

        template: Template,

        initialize: function (options) {
            collection = options.collection;
            multiView = options.multiView;
            paginationView = options.paginationView;
            redirectTo = options.redirectTo;
            this.render(options);
        },

        events: {
            'change #contactsPerPageDropdown': 'changeContactsPerPage'
        },

        render: function () {
            let output = '';
            let data = {};
            let contactsPerPage = [3, 6, 9, 12, 15];
            data.contactsPerPage = contactsPerPage;
            Dust.renderSource(this.template, data, function(err, out) {
                if (err) {
                    alert(err);
                } else {
                    output = out;
                }
            });
            this.$el.html(output);
            return this;
        },

        changeContactsPerPage: function (options) {
            collection.setPageSize(Number($('#contactsPerPageDropdown').val()), options);
            paginationView.render(options);
            $( ".pagination" ).find( "li" ).eq(2).addClass('active');
            Backbone.history.navigate('first', true);
            Backbone.history.navigate(redirectTo, {trigger: false, replace: false});
        }
    });

    return ContactsPerPageView;
});