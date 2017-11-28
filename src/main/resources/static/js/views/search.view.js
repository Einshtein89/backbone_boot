define(function (require) {
    var BaseView = require('baseView');
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
        },

        renderSearch: function () {
            var input = $('#search').val();
            if (input) {
                var filteredData = this.options.multiView.collection.filterModels(input);
                var result = [];
                _.each(filteredData.models, function (model) {
                    result.push(model);
                });
                if (result.length > 0) {
                    this.options.multiView.trigger("view:search", {filteredData: result});
                }
                else {
                    this.options.multiView.trigger("view:emptySearch", {filteredData: null});
                }
            } else {
                this.options.multiView.trigger("view:resetSearch");
            }
        },

        resetSearch: function () {
            if ($('#search').val()) {
                this.options.multiView.trigger("view:resetSearch");
                $('#search').val('');
            }
        }
    });

    return SearchView;
});