require.config({
    paths: {
        //bower_components
        jquery: "../bower_components/jquery/dist/jquery.min",
        underscore: "../bower_components/underscore/underscore-min",
        backbone: "../bower_components/backbone/backbone-min",
        controller: "../bower_components/backbone-route-control/backbone-route-control",
        validation: "../bower_components/backbone.validation/dist/backbone-validation-amd-min",
        text: "../bower_components/text/text",
        dust : "../bower_components/dustjs-linkedin/dist/dust-full",
        dust_helpers : "../bower_components/dustjs-helpers/dist/dust-helpers",
        jConfirm: "../bower_components/jquery-confirm2/dist/jquery-confirm.min",
        paginator: "../bower_components/backbone.paginator/lib/backbone.paginator.min"
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
            "headerView" : 'views/header/header.view',
            "homePageView" : 'views/homePage/home.page.view',
            //models
            'user' : 'models/user',
            //templates
            'contactTemplate' : 'text!templates/contacts/contactView.dust',
            'contactListTemplate' : 'text!templates/contacts/contactList.dust',
            'contactInfoTemplate' : 'text!templates/contacts/contactInfo.dust',
            'addUserTemplate' : 'text!templates/contacts/addContact.dust',
            'paginationTemplate' : 'text!templates/pagination/pagination.dust',
            'contactsPerPageTemplate' : 'text!templates/contacts/contactsPerPage.dust',
            'selectViewTemplate' : 'text!templates/selectView/selectView.dust',
            "headerTemplate" : 'text!templates/header/header.dust',
            "homePageTemplate" : 'text!templates/homePage/home.dust',
            "batchDeleteForm" : 'text!templates/contacts/batchDeleteForm.dust',
            //collections
            'contactList' : 'collections/contacts.collection',
            //router
            'router' : 'router/router',
            //components
            'userUtils' : 'components/user.utils',
            'controllerUtils' : 'components/controller.utils',
            //controllers
            'mainController' : 'controllers/main.controller'
        }
    }
});

define.amd.dust = true;
require(['router', 'mainController'], function (Router, MainController) {
    new Router({
        controllers: {
            main: new MainController(),
        }
    });
    Backbone.history.start();
});