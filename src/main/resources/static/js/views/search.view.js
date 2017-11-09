define(function (require) {
    var BaseView = require('baseView');
    var Backbone = require('backbone');
    var _ = require('underscore');

    var SearchView = BaseView.extend({

        el: '.searchHolder',

        events: {
            'keyup' : 'renderSearch',
            'click #reset' : 'resetSearch'
        },

        initialize: function (options) {
            this.options = options;
            $(document).on('keyup', this.keyup);
            this.render();
        },

        render: function () {
            return this;
        },

        renderSearch: function () {
            var input = $('#search').val();
            var filteredData = this.options.multiView.collection.filterModels(input);
            var result = [];
            _.each(filteredData.models, function (model) {
                result.push(model);
            })
            if (result.length > 0) {
                this.options.multiView.trigger("view:search", {filteredData: result});
            }
            else {
                Backbone.history.navigate('resetSearch', true);
            }
        },

        resetSearch: function () {
            Backbone.history.navigate('resetSearch', true);
            $('#search').val('');
        }
    });

    return SearchView;
});