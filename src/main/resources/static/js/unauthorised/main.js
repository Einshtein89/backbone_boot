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
            'paginationView' : '../authorised/views/pagination/pagination.view',
            'contactsPerPageView' : '../authorised/views/pagination/contactsPerPage.view',
            'selectViewView' : '../authorised/views/selectview/selectView.view',
            "headerView" : 'views/header/header.view',
            "homePageView" : 'views/homePage/home.page.view',
            "bookView" : 'views/store/book.view',
            "booksView" : 'views/store/books.view',
            //models
            'user' : 'models/user',
            'book' : 'models/book',
            //templates
            'contactTemplate' : 'text!templates/contacts/contactView.dust',
            'contactListTemplate' : 'text!../../authorised/templates/contacts/contactList.dust',
            'contactInfoTemplate' : 'text!templates/contacts/contactInfo.dust',
            'addUserTemplate' : 'text!templates/contacts/addContact.dust',
            'paginationTemplate' : 'text!../../../authorised/templates/pagination/pagination.dust',
            'contactsPerPageTemplate' : 'text!../../../authorised/templates/contacts/contactsPerPage.dust',
            'selectViewTemplate' : 'text!../../../authorised/templates/selectView/selectView.dust',
            "headerTemplate" : 'text!templates/header/header.dust',
            "homePageTemplate" : 'text!templates/homePage/home.dust',
            "batchDeleteForm" : 'text!templates/contacts/batchDeleteForm.dust',
            "bookTemplate" : 'text!templates/books/book.dust',
            //collections
            'contactList' : 'collections/contacts.collection',
            'booksList' : 'collections/books.collection',
            //router
            'router' : 'router/router',
            //components
            'userUtils' : 'components/user.utils',
            'controllerUtils' : '../authorised/components/controller.utils',
            //controllers
            'mainController' : 'controllers/main.controller',
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
