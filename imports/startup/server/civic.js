import { check } from 'meteor/check';

const civicSip = require('civic-sip-api');

const civicClient = civicSip.newClient({
    appId: Meteor.settings.public.civic.appId,
    prvKey: Meteor.settings.private.civic.privateSigning,
    appSecret: Meteor.settings.private.civic.secret,
});

Meteor.methods({
    'civic.request'(jwtToken) {
        check(jwtToken, String)
        if (this.userId) {
            civicClient.exchangeCode(jwtToken)
                .then((userData) => {
                    Meteor.users.update(this.userId, {
                        $set: {
                            'services.civic.data': userData.data,
                            'services.civic.userId': userData.userId,
                        }
                    });
                    Meteor.call('checkUser', function(error, success) {
                        if (error) {
                            console.log('error', error);
                        }
                        if (success) {
                            console.log('Result', success);
                        }
                    });
                }).catch((error) => {
                    throw new Meteor.Error('civic-error', 'Civic error, more details:', error);
                });
            return 'success';
        }
        throw new Meteor.Error(530, 'Not logged in', 'Please, login first.');
    },
    'civic.checkRegistration'() {
        var user = Meteor.users.findOne(this.userId)
        if (user.services.civic) {
            return true;
        }
        throw new Meteor.Error(405, 'civic-not-registered', 'You are not registered with civic, please register now.');
    }
});
