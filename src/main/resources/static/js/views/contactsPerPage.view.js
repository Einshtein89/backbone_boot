define(function (require) {
    var Template = require('contactsPerPageTemplate');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Dust = require('dust');
    var collection;
    var multiView;
    var paginationView;

    var ContactsPerPageView = Backbone.View.extend({

        el: '#contactPerPageHolder',

        template: Template,

        initialize: function (options) {
            collection = options.collection;
            multiView = options.multiView;
            paginationView = options.paginationView;
            this.render(options);
        },

        events: {
            'change #contactsPerPageDropdown': 'changeContactsPerPage'
        },

        render: function (options) {
            var output = '';
            var data = {};
            var contactsPerPage = [3, 6, 9, 12, 15];
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
        }
    });

    return ContactsPerPageView;
});