define(function (require) {
    var Template = require('paginationTemplate');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Dust = require('dust');
    require('dust_helpers');
    var isMainPage;
    var isNewUserAdded;
    var initialNumberOfVisiblePages = 5;

    var PaginationView = Backbone.View.extend({

        className: 'paginationHolder',

        template: Template,

        render: function (options) {
            isMainPage = options.isMainPage;
            isNewUserAdded = options.isNewUserAdded;
            var output = '';
            var data = {};
            data.showPaginator = false;
            this.preparePageSection(data);
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
            }
            if (isNewUserAdded) {
                this.setNewUserAddedStyles();
            }
            return this;
        },

        preparePageSection: function (data) {
            var currentPage = this.collection.state.currentPage;
            var collectionLength = this.collection.fullCollection.length;
            var pageSize = this.collection.state.pageSize;
            if (collectionLength) {
                var numberOfPages = Math.ceil(collectionLength / pageSize);
                data.pages = [];
                for (var i = 0 ; i < numberOfPages; i++) {
                    if ((i <= currentPage && currentPage >= initialNumberOfVisiblePages)
                        || i < initialNumberOfVisiblePages){
                        data.pages.push(i + 1);
                        continue;
                    }
                    if (i >= initialNumberOfVisiblePages) {
                        data.pages.push("..");
                    }

                    if (i === numberOfPages -1) {
                        data.pages.push(numberOfPages);
                    }
                }

                var i = 0;
                if (currentPage > initialNumberOfVisiblePages) {
                    while (i < currentPage - 2) {
                        data.pages.splice(0, 1);
                        i++;
                    }
                    data.pages.unshift(".. ");
                    data.pages.unshift("1");
                }

                data.pages = _.uniq(data.pages);
                data.showPaginator = true;
            }
        },

        setDefaultStyles: function () {
            let $firstPage = this.$el.find( "li" ).eq(0);
            let $prevPage = this.$el.find( "li" ).eq(1);

            $firstPage.hide();
            $prevPage.hide();

            this.$el.find( "li" ).eq(2).addClass('active');
        },

        setNewUserAddedStyles: function () {
            this.$el.find( 'li:last' ).prev().prev().addClass('active');
            this.$el.find( 'li:last' ).hide();
            this.$el.find( 'li:last' ).prev().hide();
        }
    });

    return PaginationView;
});