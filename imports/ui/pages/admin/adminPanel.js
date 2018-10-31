import './adminPanel.html';
import { notify } from '../../../utils/notification.js';


Template.adminPanel.helpers({
    users: () => {
        var users = Meteor.users.find().fetch();
        console.log(users);
        return users;
    },
    getRiskLevelColor(level) {
        switch (level) {
        case 'low' : {
            return 'warning';
        }
        case 'medium' : {
            return 'warning';
        }
        case 'high' : {
            return 'danger';
        }
        case 'unknown' : {
            return 'success';
        }
        default : {
            return 'info';
        }
        }
    }
});

const newLocal = 'userid';
Template.adminPanel.events({
    'click .js-complyAdvantageSearch': (event, templateInstance) => {
        event.preventDefault();
        $(function(){
            $('.js-complyAdvantageSearch').attr('disabled', true);
        });

        let userId = event.currentTarget.getAttribute('userid');
        Meteor.call('checkGivenUser', userId, function(error, responseStatus) {
            $(function(){
                $('.js-complyAdvantageSearch').attr('disabled', false);
            });
            if (error) {
                console.log('error', error);
                notify('Error while searching that name in ComplyAdvantage database: ' + error, 'danger');
            }
            if (responseStatus === 'success') {
                notify('ComplyAdvantage search was successful.', 'info');
            } else {
                notify(responseStatus, 'info');
            }
        });
    },
});
