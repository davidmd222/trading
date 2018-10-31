import './register.html';
import '../main/loader.html';
import { notify } from '../../../utils/notification';

import 'meteor/rajit:bootstrap3-datepicker';
import 'meteor/tap:i18n';

Template.register.onCreated(function PrikažiMeOnCreated() {
    this.loading = new ReactiveVar(false);
});
Template.register.helpers({
    loading: function() {
        return Template.instance().loading.get();
    }
});

Template.register.onRendered(function() {
    $('#birthdayPicker').datepicker({
        format: 'dd.mm.yyyy',
        startDate: '1.1.1945.',
        endDate: '-12y',
        defaultViewDate: '18.12.1997',
        autoclose: true,
    });
});

Template.register.events({
    'submit form': (event, templateInstance) => {
        event.preventDefault();
        templateInstance.loading.set(true);
        let birthday = event.target.birthday.value.split('.');
        birthday = new Date(Date.UTC(birthday[2], birthday[1] - 1, birthday[0], 0, 0, 0));
        notify(TAPi18n.__('register.notify.patience'), 'info');
        let password = event.target.password.value;
        let passwordCheck = event.target.passwordCheck.value;
        let user;
        if (password === passwordCheck) {
            user = {name: event.target.name.value,
                surname: event.target.surname.value,
                username: event.target.username.value,
                email: event.target.email.value,
                gender: event.target.sex.value,
                birthday: birthday,
                password: event.target.password.value,
                roles: [],
            };
            if (user.username.length < 6 || user.username.length > 26) {
                templateInstance.loading.set(false);
                notify(TAPi18n.__('register.notify.usernameError'), 'warning');
            }
            if (user.password.length < 6) {
                templateInstance.loading.set(false);
                notify(TAPi18n.__('register.notify.passwordError'), 'warning');
            }
            if ((user.username.length >= 6) && (user.username.length <= 26) && (user.password.length >= 6)) {
                Meteor.call('userRegister', user, (error, result) => {
                    templateInstance.loading.set(false);
                    if (error) {
                        notify(error.reason, 'warning');
                        if (error.reason !== 'Match failed') {
                            notify(error.reason, 'danger');
                        }
                    } else {
                        templateInstance.find('form').reset();
                        notify(TAPi18n.__('register.notify.registerSuccess'), 'success');
                        Meteor.setTimeout(function() {
                            FlowRouter.go('/login');
                            notify(TAPi18n.__('register.notify.registerSuccess'), 'success');
                        }, 1000);
                    }
                });
            }
        } else {
            templateInstance.loading.set(false);
            notify(TAPi18n.__('register.notify.passwordMatchError'), 'warning');
        }
    },
});
