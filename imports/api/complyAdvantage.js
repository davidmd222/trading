Meteor.methods({
    'checkUser'() {
        let userData = Meteor.users.findOne({ _id: this.userId });
        let baseUrl = 'https://api.complyadvantage.com/searches';
        let data = {
            'search_term': {
                'last_name': userData.profile.surname,
                'first_name': userData.profile.name
            },
            'fuzziness': 0.6,
            'filters': {
                'types': ['sanction', 'warning'],
                // 'birth_year': '1924'
            },
            'share_url': 1
        };
        let options = {
            url: 'https://api.complyadvantage.com/searches',
            headers: {
                'Authorization': 'Token ' + Meteor.settings.private.complyAdvantage.key,
                'Content-Type': 'application/json'
            },
            data: data
        };
        let value = HTTP.post(baseUrl, options);
        Meteor.users.update(this.userId, {
            $set: {
                'services.complyAdvantage.data': value.data,
            }
        });
        return value;
    },
    'checkGivenUser'(userId) {
        check(userId, String);
        if (this.userId && Roles.userIsInRole( this.userId, [ 'admin' ])) {
            let userData = Meteor.users.findOne({ _id: userId });
            let baseUrl = 'https://api.complyadvantage.com/searches';
            let data = {
                'search_term': {
                    'last_name': userData.profile.surname,
                    'first_name': userData.profile.name
                },
                'fuzziness': 0.6,
                'filters': {
                    'types': ['sanction', 'warning'],
                // 'birth_year': '1924'
                },
                'share_url': 1
            };
            let options = {
                url: 'https://api.complyadvantage.com/searches',
                headers: {
                    'Authorization': 'Token ' + Meteor.settings.private.complyAdvantage.key,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            let value = HTTP.post(baseUrl, options);
            Meteor.users.update(userId, {
                $set: {
                    'services.complyAdvantage.data': value.data,
                }
            });
            return value.data.status;
        }
        throw new Meteor.Error('This can only be done by the Administrators.');
    }
});
