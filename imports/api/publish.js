import { roles } from 'meteor/alanning:roles';

if (Meteor.isServer) {
    Meteor.publish('userList', function() {
        // Admins
        if (this.userId && Roles.userIsInRole( this.userId, [ 'admin' ])) {
            return Meteor.users.find();
        }
        // Non-Admins
        return Meteor.users.find({}, {fields: {
            profile: 1,
            emails: 1,
            username: 1,
            createdAt: 1
        }});
    });
}
