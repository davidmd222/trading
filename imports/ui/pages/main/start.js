import './start.html';
import { notify } from '../../../utils/notification.js';
import { ReactiveVar } from 'meteor/reactive-var';

Template.startPage.onCreated(function() {
    this.registeredWithCivic = new ReactiveVar(false);
});

Template.startPage.helpers({
    registeredCivic: function() {
        this.templateInstance = Template.instance();
        Meteor.call('civic.checkRegistration', (error, result) => {
            if (result) {
                this.templateInstance.registeredWithCivic.set(true);
            } else if (error) {
                notify(error.details, 'warning');
            }
        });
        return Template.instance().registeredWithCivic.get();
    }
});
