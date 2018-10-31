import { Meteor } from 'meteor/meteor';

import '../imports/startup/server/_utility.js'; // startup utility
import '../imports/startup/server/civic.js'; // startup utility
import '../imports/api/emailTemplates.js';
import '../imports/api/users.js';
import '../imports/api/onLogin.js';
import '../imports/api/publish.js';
import '../imports/api/complyAdvantage.js'; // Comply Advantage


Meteor.startup(() => {
});
