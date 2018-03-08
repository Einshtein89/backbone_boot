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
        paginator: "bower_components/backbone.paginator/lib/backbone.paginator.min"
    },
    map : {
        "*" : {
            'multiView' : 'views/contacts/contacts.view',
            'singleView' : 'views/contacts/contact.view',
            'baseView': 'views/base.view',
            'userInfo' : 'views/contacts/contactInfo.view',
            'deleteContactView' : 'views/contacts/actions/deleteContact.view',
            'addUserView' : 'views/contacts/actions/addContact.view',
            'editUserView' : 'views/contacts/actions/editContact.view',
            'searchView' : 'views/search/search.view',
            'paginationView' : 'views/pagination/pagination.view',
            'contactsPerPageView' : 'views/pagination/contactsPerPage.view',
            'selectViewView' : 'views/selectview/selectView.view',
            //models
            'model' : 'models/model',
            //templates
            'contactTemplate' : 'text!templates/contactView.dust',
            'contactListTemplate' : 'text!templates/contactList.dust',
            'contactInfoTemplate' : 'text!templates/contactInfo.dust',
            'addUserTemplate' : 'text!templates/addContact.dust',
            'paginationTemplate' : 'text!templates/pagination.dust',
            'contactsPerPageTemplate' : 'text!templates/contactsPerPage.dust',
            'selectViewTemplate' : 'text!templates/selectView.dust',
            //collections
            'contactList' : 'collections/contacts.collection',
            //router
            'router' : 'router/router',
            //components
            'userUtils' : 'components/userUtils.component',
            //controllers
            'mainController' : 'controllers/main.controller'
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
});
