import { notify } from '../../../utils/notification.js';
import './passReset.html';

Template.passReset.events({
    'submit form': (event, templateInstance) => {
        event.preventDefault();
        var pass = event.target.resPass.value;
        var passCheck = event.target.resPassConfirm.value;
        if (pass === passCheck) {
            Accounts.resetPassword(FlowRouter.getParam('token'), pass, (error, result) => {
                if (error) {
                    notify('Woops..' + error.reason, 'danger');
                } else {
                    notify('HURAAY! Your password is reseted!', 'success');
                    Meteor.setTimeout(function() {
                        FlowRouter.go('/');
                    }, 1000);
                }
            });
        } else {
            notify('Passwords do not match!', 'danger');
        }
    }
});
