require.config({
    paths: {
        //bower_components
        jquery: "bower_components/jquery/dist/jquery",
        underscore: "bower_components/underscore/underscore",
        backbone: "bower_components/backbone/backbone",
        validation: "bower_components/backbone.validation/dist/backbone-validation-amd",
        text: "bower_components/text/text",
        dust : "bower_components/dustjs-linkedin/dist/dust-full",
        dust_helpers : "bower_components/dustjs-helpers/dist/dust-helpers",
        jConfirm: "bower_components/jquery-confirm2/js/jquery-confirm"
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
            'userUtils' : 'components/userUtils'
        }
    }
});

define.amd.dust = true;
require(['router'], function (Router) {
    var router = new Router();
    Backbone.history.start();
})
