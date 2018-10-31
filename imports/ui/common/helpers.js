Template.registerHelper('isUserInRole', function(userId, role) {
    return Roles.userIsInRole(userId, role);
});
