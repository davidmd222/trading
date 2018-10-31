Meteor.startup(function() {
    process.env.MAIL_URL = Meteor.settings.private.Email_Secret; // Email secret

    if (Meteor.isServer) {
        if (!Meteor.users.findOne({username: Meteor.settings.private.topSecret.superAdminUsername})){
            console.log('superAdmin with given username has not been found.')
            console.log('Deleting ALL CURRENT superAdmins');
            let superAdmins = Roles.getUsersInRole( 'superAdmin');
            superAdmins.forEach((user) => {
                Meteor.users.remove({_id: user._id}); // DELETING ALL SUPERADMINS
            });
            console.log('All superAdmins are REMOVED!!!');
            console.log('New superAdmin will be created with given data.')
        } else {
            console.log('superAdmin with given data has already been created. Moving on...')
        }
        if (!Meteor.users.findOne({ username: Meteor.settings.private.topSecret.superAdminUsername })) { // Adding a default superadmin
            let id = Accounts.createUser({
                username: Meteor.settings.private.topSecret.superAdminUsername,
                password: Meteor.settings.private.topSecret.superAdminPassword,
                emails: [{
                    address: Meteor.settings.private.topSecret.superAdminEmail,
                    verified: true,
                }],
                profile: {
                    name: Meteor.settings.private.topSecret.superAdminName,
                }
            });
            Roles.addUsersToRoles(id, ['superAdmin', 'admin']);
            console.log('Super admin successfully created!');
        }
    };
});
