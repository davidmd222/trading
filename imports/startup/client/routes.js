import '../../ui/pages/main/start.js';
import '../../ui/pages/main/noRights.html';
import '../../ui/pages/main/notFound.html';
import '../../ui/pages/main/notVerified.html';
import '../../ui/pages/main/verifying.html';
import '../../ui/pages/main/footer.html';
import '../../ui/pages/main/nav.html';

// landing
import '../../ui/pages/main/landing/landing.js';

import '../../ui/pages/user/login.js';
import '../../ui/pages/user/register.js';
import '../../ui/pages/user/edit.js';
import '../../ui/pages/user/forgotPass.js';
import '../../ui/pages/user/passReset.js';
import '../../ui/pages/user/profile.js';
import {notify} from '../../utils/notification.js';

// import admin panel
import '../../ui/pages/admin/adminPanel.js';

// triggers
const blockUnauthorizedAdmin = ( context, redirect ) => {
    if ( !Meteor.userId() || Roles.userIsInRole( Meteor.userId(), 'admin' ) === false ) {
        FlowRouter.go('/no_rights');
    }
};
const notLoggedIn = ( context, redirect ) => {
    if ( !Meteor.userId()) {
        FlowRouter.go('/no_rights');
    }
};
const notRegisteredCivic = ( context, redirect ) => {
    Meteor.call('civic.checkRegistration', (error, result) => {
        if (result && Meteor.userId()) {

        } else if (error) {
            notify(error.details, 'warning');
            FlowRouter.go('/no_rights');
        }
    });
};
// ------------------------------

FlowRouter.subscriptions = function() {
    this.register('userList', Meteor.subscribe('userList'));
};

// ADMIN GROUP
const adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',
    triggersEnter: [ blockUnauthorizedAdmin ]
});

adminRoutes.route( '/panel', {
    name: 'admin.panel',
    action: function() {
        BlazeLayout.render('appBody', {
            top: 'navBar',
            main: 'adminPanel',
            footer: 'footerTempl',
            isPublic: false
        });
    }
});
// END ADMIN GROUP

// Landing
const basicRoutes = FlowRouter.group({
    name: 'basicRoute',
});

basicRoutes.route('/', {
    name: 'main',
    action: function() {
        BlazeLayout.render('appBody', {
            top: 'navLanding',
            main: 'mainLanding',
            footer: 'navFooter',
            isPublic: true
        });
    }
});

// APP GROUP!
const appRoute = FlowRouter.group({
    prefix: '/app',
    name: 'app',
});

appRoute.route('/', {
    name: 'main',
    action: function() {
        BlazeLayout.render('appBody', {
            top: 'navBar',
            main: 'startPage',
            footer: 'footerTempl',
            isPublic: true
        });
    }
});

appRoute.route('/register', {
    name: 'register',
    action: function() {
        BlazeLayout.render('appBody', {
            main: 'register',
            top: 'navBar',
            footer: 'footerTempl',
            isPublic: true
        });
    }
});
appRoute.route('/login', {
    name: 'login',
    action: function() {
        BlazeLayout.render('appBody', {
            main: 'login',
            top: 'navBar',
            footer: 'footerTempl',
            isPublic: true
        });
    }
});
appRoute.route('/user/:username', {
    name: 'profile',
    action: function(params, queryParams) {
        BlazeLayout.render('appBody', {
            main: 'profil',
            top: 'navBar',
            footer: 'footerTempl',
            isPublic: true
        });
    },
});
appRoute.route('/user/:username/settings', {
    name: 'userSettings',
    triggersEnter: [ notLoggedIn ],
    action: function() {
        BlazeLayout.render('appBody', {
            main: 'userSettings',
            top: 'navBar',
            footer: 'footerTempl',
            isPublic: true
        });
    },
});
appRoute.route('/verification/:token', {
    name: 'verification',
    action: function(params, queryParams) {
        BlazeLayout.render('appBody', {
            main: 'verifying',
            top: 'navBar',
            footer: 'footerTempl',
            isPublic: true
        });
        Accounts.verifyEmail(params.token, (error) => {
            if (error) {
                notify(error.reason, 'danger');
            } else {
                notify('Awesome! Email verified! Thanks!', 'success');
                Meteor.setTimeout(function() {
                    FlowRouter.go('/');
                }, 1000);
            }
        });
    },
});
appRoute.route('/resetPassword/:token', {
    name: 'passReset',
    action: function() {
        BlazeLayout.render('appBody', {
            main: 'passReset',
            top: 'navBar',
            footer: 'footerTempl',
            isPublic: true
        });
    }
});
appRoute.route('/forgotPassword', {
    name: 'forgotPass',
    action: function() {
        BlazeLayout.render('appBody', {
            main: 'forgotPass',
            top: 'navBar',
            footer: 'footerTempl',
            isPublic: true
        });
    }
});
// END BASIC GROUP

// ===============================
FlowRouter.route('/no_rights', {
    name: 'noRights',
    action: function() {
        BlazeLayout.render('appBody', {
            main: 'noRights',
            top: 'navBar',
            footer: 'footerTempl',
            isPublic: true
        });
    }
});

FlowRouter.route('/not_found', {
    name: 'notFound',
    action: function() {
        BlazeLayout.render('appBody', {
            main: 'notFound',
            top: 'navBar',
            footer: 'footerTempl',
            isPublic: true
        });
    }
});

FlowRouter.route('/not_verified', {
    name: 'notVerified',
    action: function() {
        BlazeLayout.render('appBody', {
            main: 'notVerified',
            top: 'navBar',
            footer: 'footerTempl',
            isPublic: true
        });
    }
});
// ===============================
