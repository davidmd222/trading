import './login.html';
import '../main/loader.html';
import { notify } from '../../../utils/notification';
import { ReactiveVar } from 'meteor/reactive-var'

Template.login.onCreated( function(){
    this.loading = new ReactiveVar(false);
});

Template.login.helpers({
    loading: function() {
        return Template.instance().loading.get();
    }
});

Template.login.events({
    'submit form': (event, templateInstance) => {
        event.preventDefault();
        templateInstance.loading.set(true);
        let username = event.target.username.value;
        let password = event.target.password.value;
        Meteor.loginWithPassword(username, password, (error) => {
            templateInstance.loading.set(false);
            if (error) {
                notify(error.reason, 'danger');
            } else {
                notify(TAPi18n.__('login.welcome'), 'success');
                FlowRouter.go('/');
            }
        });
    },
});
