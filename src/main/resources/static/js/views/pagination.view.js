define(function (require) {
    var Template = require('paginationTemplate');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Dust = require('dust');
    var isMainPage;
    var isNewUserAdded;
    var PaginationView = Backbone.View.extend({

        el: '#paginationHolder',

        template: Template,

        initialize: function (options) {
            this.render(options);
        },

        render: function (options) {
            isMainPage = options.isMainPage;
            isNewUserAdded = options.isNewUserAdded;
            var output = '';
            var data = {};
            data.showPaginator = false;
            this.calculateNumberOfPages(data);
            Dust.renderSource(this.template, data, function(err, out) {
                if (err) {
                    alert(err);
                } else {
                    output = out;
                }
            });
            this.$el.html(output);
            if (isMainPage) {
                this.setDefaultStyles();
                $( ".pagination" ).find( "li" ).eq(2).addClass('active');
            }
            if (isNewUserAdded) {
                $( ".pagination" ).find( 'li:last' ).prev().prev().addClass('active');
            }
            return this;
        },

        calculateNumberOfPages: function (data) {
            data.pages = [];
            if (this.collection.fullCollection.length ) {
                var numberOfPages = Math.ceil(this.collection.fullCollection.length / this.collection.state.pageSize);
                data.pages = [];
                for (var i = 0; i < numberOfPages; i++) {
                    data.pages.push(i + 1);
                }
                data.showPaginator = true;
            }
        },

        setDefaultStyles: function () {
            let $firstPage = $( ".pagination" ).find( "li" ).eq(0);
            let $prevPage = $( ".pagination" ).find( "li" ).eq(1);

            $firstPage.hide();
            $prevPage.hide();
        }
    });

    return PaginationView;
});