Accounts.onLogin((user) => {
    user = user.user;
    let date = moment(new Date()).format('DD.MM.YYYY');
    Meteor.users.update(user._id, { $set: { 'profile.lastSeen': date } });
});
