define(function (require) {
    let $ = require('jquery');
    let Backbone = require('backbone');
    let HomePageView = require('homePageView');
    let homePageView;

    let MainController = function(options) {
        return {
            //rendering actions
            renderHomePage: function () {
                var options = options || {};
                this.createHomePageView(options);
            },
            //creating views
            createHomePageView: function (options) {
                if (!homePageView){
                    homePageView = new HomePageView(options);
                }
                $(homePageView.$el).insertBefore(".footer");
            },
        }
    };

    return MainController;
});