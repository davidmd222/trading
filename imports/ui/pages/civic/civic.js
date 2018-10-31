import './civic.html';
import { jQuery } from 'meteor/jquery';
import { notify } from '../../../utils/notification.js';

Template.civicLogin.onRendered(function() {
    let sarma = $.getScript('https://hosted-sip.civic.com/js/civic.sip.min.js', function(data, textStatus, jqxhr) {
        var civicSip = new civic.sip({ appId: Meteor.settings.public.civic.appId });
        var button = document.querySelector('#civicSignupButton');
        if (button) {
            button.addEventListener('click', function() {
                civicSip.signup({
                    style: 'popup',
                    scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP
                });
            });
            civicSip.on('auth-code-received', function(event) {
                var jwtToken = event.response;
                Meteor.call('civic.request', jwtToken, (error, result) => {
                    if (result) {
                        notify('Awesome.', 'success');
                        Meteor.setTimeout(function() {
                            location.reload();
                        }, 1000)
                    } else if (error) {
                        notify(error.reason, 'danger');
                    }
                });
            });

            civicSip.on('user-cancelled', function(event) {
                notify(event.event, 'warning');
            });

            civicSip.on('read', function(event) {
                notify(event, 'success');
            });

            civicSip.on('civic-sip-error', function(error) {
                notify('Error type = ' + error.type, 'danger');
                notify('Error type = ' + error.type, 'danger');
            });
        }
    });
});
