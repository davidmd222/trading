import './profile.html'
import { ReactiveVar } from 'meteor/reactive-var'

Template.profil.onCreated(function() {
});
Template.profil.onRendered(function() {
});

Template.profil.helpers({
    user: function() {
        return Meteor.users.findOne({username: FlowRouter.getParam('username')});
    },
    createdAt: () => {
        let user = Meteor.users.findOne({username: FlowRouter.getParam('username')});
        if (user){
            joined = moment(user.createdAt).format('DD.MM.YYYY');
            return joined;
        }
        return 'loading...';
    },
    thisUser: () => {
        let user = Meteor.users.findOne({username: FlowRouter.getParam('username')});
        if (user) {
            if (user._id === Meteor.userId()) {
                return true;
            }
        }
        return false;
    },
});

