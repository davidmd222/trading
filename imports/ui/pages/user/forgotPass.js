import { notify } from '../../../utils/notification.js';
import './forgotPass.html';

Template.forgotPass.events({
    'submit form': (event, templateInstance) => {
        event.preventDefault();
        var options = {};
        var email = event.target.email.value;
        options.email = email;
        Accounts.forgotPassword(options, (error) => {
            if (error) {
                notify('Error!' + error.reason, 'warning');
            } else {
                notify('Awesome! Check your inbox :)', 'success');
                Meteor.setTimeout(function() {
                    Router.go('/');
                }, 1000);
            }
        });
    }
});
