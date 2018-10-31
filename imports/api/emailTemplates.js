Accounts.emailTemplates.siteName = 'Cryptoplate';
Accounts.emailTemplates.from = 'Cryptoplate team <admin@cryptoplate.com>';

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
    return 'Welcome to Cryptoplate!' +
     'To activate your account, pleas press on this link::\n\n' +
     url;
};

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return '[Cryptoplate] Verify your email address';
    },
    text(user, url) {
        let emailAddress = user.emails[0].address;
        let urlWithoutHash = url.replace('#/verify-email', 'verification');
        let supportEmail = 'support@cryptoplate.com';
        let emailBody = `To verify your email address (${emailAddress}) visit this link:\n\n${urlWithoutHash}\n\n If you did not request this email please ignore it. If you think that something is wrong, contact us as fast as possible.: ${supportEmail}.`;

        return emailBody;
    }
};

Accounts.urls.resetPassword = (token) => {
    return Meteor.absoluteUrl('resetPassword/' + token);
};

Accounts.emailTemplates.resetPassword = {
    subject(user) {
        return 'Reset your password on Cryptoplate';
    },
    text(user, url) {
        return `Hello!
                Click on following link to reset your password.
                ${url}
                If you have not requested this email ignore it.
                Thank you,
                Cryptoplate team
                `;
    },
    html(user, url) {
    }
};
