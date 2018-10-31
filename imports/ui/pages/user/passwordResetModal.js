import { notify } from '../../../utils/notification.js';
import './passwordResetModal.html'

Template.passwordResetModalonEdit.events({
    'click #resetPassword': function(event, templateInstance) {
        Meteor.call('passwordReset', Meteor.userId(), (error) => {
            if (error) {
                notify('Woops...' + error.reason, 'danger');
            } else {
                notify('Link for password change has been sent to your email.', 'warning');
            }
        });
    }
});
