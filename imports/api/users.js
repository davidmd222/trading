// import { utility } from '../imports/_utility.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { roles } from 'meteor/alanning:roles';
import { HTTP } from 'meteor/http';

Meteor.methods({
    /* ********** */
    'userRegister'(user) {
        check(user, UserSchema);
        id = Accounts.createUser({
            username: user.username,
            password: user.password,
            emails: [{
                address: user.email,
                verified: false,
            }],
            profile: {
                name: user.name,
                surname: user.surname,
                gender: user.gender,
                birthday: user.birthday,
            }
        });
        Meteor.call('mailVerification', id);
        return 'Account has been created successfully.';
    },
    /* ********** */
    'userEdit'(edits) {
        // Make sure the user is loggedin
        if (!this.userId) {
            throw new Meteor.Error('You are not logged in.');
        }
        check(edits, EditUserSchema);

        // Saving
        let blank = 0;
        for (let i in edits) {
            if (edits[i] !== '') {
                switch (i) {
                case 'name':
                    Meteor.users.update(this.userId, {
                        $set: {
                            'profile.name': edits[i]
                        }
                    });
                    break;
                case 'surname':
                    Meteor.users.update(this.userId, {
                        $set: {
                            'profile.surname': edits[i]
                        }
                    });
                    break;
                case 'gender':
                    Meteor.users.update(this.userId, {
                        $set: {
                            'profile.gender': edits[i]
                        }
                    });
                    break;
                case 'birthday':
                    Meteor.users.update(this.userId, {
                        $set: {
                            'profile.birthday': edits[i]
                        }
                    });
                    break;
                case 'occupation':
                    Meteor.users.update(this.userId, {
                        $set: {
                            'profile.occupation': edits[i]
                        }
                    });
                    break;
                default:
            // do nothing
                }
            } else {
                blank++;
                if (blank === 4) {
                    throw new Meteor.Error('Form is empty');
                }
            }
        }
        return true;
    },
    // Email edit
    'emailEdit'(email) {
        check(email, String);
        if (this.userId) {
            let emailAlreadyExist = Meteor.users.find({
                'emails.address': email
            }, {
                limit: 1
            }).count() > 0;
            if (emailAlreadyExist === true) {
                throw new Meteor.Error('192', 'email is already in our database');
            }
            if (email !== '' && !emailAlreadyExist) {
                Meteor.users.update(this.userId, {
                    $set: {
                        emails: [{
                            address: email,
                            verified: false,
                        }]
                    }
                });
                Meteor.call('mailVerification', this.userId);
            }
            return true;
        }
        throw new Meteor.Error(1, 'You are not logged in');
    },
    'usernameEdit'(newUsername) {
        check(newUsername, String);
        Accounts.setUsername(this.userId, newUsername, (error, result) => {
        });
    },
    // Mail verification
    'mailVerification'(userId) {
        check(userId, String);
        return Accounts.sendVerificationEmail(userId);
    },
    'mailVerificationResend'() {
        return Accounts.sendVerificationEmail(this.userId);
    },
    // Reset password
    'passwordReset'(userId) {
        check(userId, String);
        return Accounts.sendResetPasswordEmail(userId);
    },
    'user.delete'(id) {
        check(id, String);

        if (id === Meteor.userId()) {
            throw new Meteor.Error('cannot-delete-self');
        } else {
            Meteor.users.remove(id);
        }
    },
    // Change profile picture
    'postPicture'(image) {
        check(image, String);
        HTTP.post('https://api.imgur.com/3/image', {
            headers: {
                'Authorization': Meteor.settings.private.Imgur_Authorization
            },
            data: {
                image: image
            }
        }, (error, result) => {
            if (!error) {
                Meteor.users.update(this.userId, {
                    $set: {
                        'profile.profileImage': result.data.data.link
                    }
                });
                return result;
            }
            return error;
        });
    }
});


// Schemas
UserSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'First Name',
        max: 50,
        optional: false
    },
    surname: {
        type: String,
        label: 'Last Name',
        max: 50,
        optional: false
    },
    username: {
        type: String,
        label: 'Username',
        min: 6,
        max: 26,
        optional: false
    },
    email: {
        type: String,
        label: 'Email',
        max: 60,
        optional: false
    },
    gender: {
        type: String,
        label: 'Gender',
        max: 6,
        optional: false
    },
    birthday: {
        type: Date,
        label: 'Date of birth',
        max: 20,
        optional: false
    },
    password: {
        type: String,
        label: 'Password',
        min: 6,
        optional: false
    },
    occupation: {
        type: String,
        label: 'Occupation',
        optional: true
    },
    roles: {
        type: [Object],
        label: 'Roles',
        max: 0,
        optional: false,
    },
});
// +++++++++++++
EditUserSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'First Name',
        max: 50,
        optional: true
    },
    surname: {
        type: String,
        label: 'Last Name',
        max: 50,
        optional: true
    },
    gender: {
        type: String,
        label: 'Gender',
        max: 6,
        optional: true
    },
    birthday: {
        type: Date,
        label: 'Date of birth',
        max: 20,
        optional: true
    },
    occupation: {
        type: String,
        label: 'Occupation',
        optional: true
    },
});
// ++++++++++++
