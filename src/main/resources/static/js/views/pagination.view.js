define(function (require) {
    var Template = require('paginationTemplate');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Dust = require('dust');

    var PaginationView = Backbone.View.extend({

        el: '#paginationHolder',

        template: Template,

        initialize: function () {
            this.render();
        },

        render: function () {
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
            return this;
        },

        calculateNumberOfPages: function (data) {
            data.pages = [];
            if (this.collection.fullCollection.length ) {
                var numberOfPages = Math.ceil(this.collection.fullCollection.length / this.collection.length);
                data.pages = [];
                for (var i = 0; i < numberOfPages; i++) {
                    data.pages.push(i + 1);
                }
                data.showPaginator = true;
            }
        }
    });

    return PaginationView;
});