import './logout.html';

Template.logout.events({
    'click #Logout': (event) => {
        Meteor.logout();
    }
});
