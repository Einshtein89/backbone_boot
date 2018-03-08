define(function (require) {
    var Template = require('selectViewTemplate');
    var Backbone = require('backbone');
    var BaseView = require('baseView');
    var multiView;
    var SelectViewView = Backbone.View.extend({

        className: 'selectViewHolder',

        template: Template,

        initialize: function (options) {
            multiView = options.multiView;
            this.render(options);
        },

        events: {
            'click .tabs_view' : 'renderTabsView',
            'click .list_view' : 'renderListView'
        },

        render: function () {
            BaseView.prototype.render.apply(this, arguments);
            return this;
        },

        renderListView: function () {
            multiView.trigger("view:listView", {});
        },

        renderTabsView: function () {
            multiView.trigger("view:tabsView", {});
        },
    });

    return SelectViewView;
});