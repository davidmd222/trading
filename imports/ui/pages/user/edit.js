import { notify } from '../../../utils/notification.js';
import './edit.html';
import '../main/loader.html';

Template.userSettings.onCreated( function(){
    this.loading = new ReactiveVar(false);
});

Template.userSettings.onRendered(function() {
    $('#birthdayPicker').datepicker({
        format: 'dd.mm.yyyy',
        startDate: '1.1.1945.',
        endDate: '-12y',
        autoclose: true,
    });
});

Template.userSettings.helpers({
    loading: function() {
        return Template.instance().loading.get();
    },
    user: () => {
        return Meteor.users.findOne({_id: Meteor.userId()});
    },
    userBirthday: () => {
        var user = Meteor.users.findOne({_id: Meteor.userId()});
        var birthday = user.profile.birthday;
        var stringBDay = birthday.getDate() + '.' + (birthday.getMonth() + 1) + '.' +  birthday.getFullYear()
        $('#birthdayPicker').datepicker('setDate', birthday);
        return stringBDay;
    }
});
Template.userSettings.events({
    'click .cancel': (event, templateInstance) => {
        Router.go('/');
    },
    'submit #mainForm': (event, templateInstance) => {
        event.preventDefault();
        templateInstance.loading.set(true);
        const name =  event.target.name.value;
        const surname = event.target.surname.value;
        const gender = event.target.sex.value;
        const occupation = event.target.occupation.value;
        let birthday = event.target.birthday.value.split('.');
        birthday = new Date(Date.UTC(birthday[2], birthday[1] - 1, birthday[0], 0, 0, 0));
        const edits = {
            name,
            surname,
            gender,
            birthday,
            occupation
        };
        Meteor.call('userEdit', edits, (error, result) => {
            templateInstance.loading.set(false);
            if (result) {
                notify('Your profile has been updated successfully.', 'success');
            } else if (error) {
                notify(error.reason, 'danger');
            }
        });
    },
    'submit #emailForm': (event, templateInstance) => {
        event.preventDefault();
        templateInstance.loading.set(true);

        const email = event.target.email.value;
        if (email !== '') {
            Meteor.call('emailEdit', email, (error, result) => {
                templateInstance.loading.set(false);
                if (result) {
                    notify('Your email has been changed successfully. Please, check your email inbox and verify it.', 'success');
                } else {
                    notify('That email address already is in our database.', 'warning');
                }
            });
        }
    },
    'submit #usernameForm': (event, templateInstance) => {
        event.preventDefault();
        templateInstance.loading.set(true);

        const username = event.target.username.value;
        if (username !== '') {
            Meteor.call('usernameEdit', username, (error, result) => {
                templateInstance.loading.set(false);
                if (error) {
                    notify(error.reason, 'warning');
                } else {
                    notify('Your username has been changed successfully.', 'success');
                    Meteor.setTimeout(function() {
                        Router.go('/user/' + username);
                    }, 800);
                }
            });
        }
    },
    'click .js-passwordReset': (event, templateInstance) => {
        event.preventDefault();
        $(function(){
            $('.js-passwordReset').attr('disabled', true);
        });
        Meteor.call('passwordReset', Meteor.userId(), (error) => {
            $(function(){
                $('.js-passwordReset').attr('disabled', false);
            });
            if (error) {
                notify('Woops...' + error.reason, 'danger');
            } else {
                notify('Link for password change has been sent to your email.', 'warning');
            }
        });
    },
    //  Change profile image
    'change #userProfilePicture': (event, templateInstance) => {
        event.preventDefault();
        $(function(){
            $('#userProfilePicture').attr('disabled', true);
        });
        notify('Uploading... Please wait wile we upload and show your new picture. :)', 'info');
        let reader = new FileReader();
        file = event.currentTarget.files[0];
        reader.readAsDataURL(file);

        reader.onload = () => {
            imageString = reader.result.split(',')[1]; // this removes data:image/png;base64, part that we've got from reader.result
            Meteor.call('postPicture', imageString, (error, result) => {
                $(function(){
                    $('#userProfilePicture').attr('disabled', false);
                });
                if (error) {
                    notify(error.reason, 'danger');
                }
                if (result !== undefined) {
                    notify(result, 'success');
                }
            });
        };
    },
    'click .verifyButton': (event, templateInstance) => {
        event.preventDefault()
        $(function(){
            $('.verifyButton').attr('disabled', true);
        });
        Meteor.call('mailVerificationResend', (error, result) => {
            $(function(){
                $('.verifyButton').attr('disabled', false);
            });
            if (error) {
                notify( 'Woops...' + error.reason, 'danger');
            }
            if (result !== undefined) {
                notify('Email has been sent.', 'success');
            }
        });
    },
});
