require.config({
    paths: {
        //bower_components
        jquery: "bower_components/jquery/dist/jquery.min",
        underscore: "bower_components/underscore/underscore-min",
        backbone: "bower_components/backbone/backbone-min",
        controller: "bower_components/backbone-route-control/backbone-route-control",
        validation: "bower_components/backbone.validation/dist/backbone-validation-amd-min",
        text: "bower_components/text/text",
        dust : "bower_components/dustjs-linkedin/dist/dust-full",
        dust_helpers : "bower_components/dustjs-helpers/dist/dust-helpers",
        jConfirm: "bower_components/jquery-confirm2/dist/jquery-confirm.min",
    },
    map : {
        "*" : {
            'multiView' : 'views/contacts.view',
            'singleView' : 'views/singleContact.view',
            'baseView': 'views/base.view',
            'userInfo' : 'views/userInfo.view',
            'deleteContactView' : 'views/deleteContact.view',
            'addUserView' : 'views/addUser.view',
            'editUserView' : 'views/editUser.view',
            'searchView' : 'views/search.view',
            //models
            'model' : 'models/model',
            //templates
            'contactTemplate' : 'text!templates/contact.dust',
            'contactInfoTemplate' : 'text!templates/contactInfo.dust',
            'addUserTemplate' : 'text!templates/addUser.dust',
            //collections
            'contactList' : 'collections/contactList',
            //router
            'router' : 'router/router',
            //components
            'userUtils' : 'components/userUtils',
            //controllers
            'mainController' : 'controllers/mainController'
        }
    }
});

define.amd.dust = true;
require(['router', 'mainController'], function (Router, MainController) {
    var router = new Router({
        controllers: {
            main: new MainController()
        }
    });
    Backbone.history.start();
})
