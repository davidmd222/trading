import './body.html';
import '../user/logout.js';
import '../civic/civic.js';

Template.appBody.helpers({
    user: () => {
        let user = Meteor.users.findOne({ _id: Meteor.userId() });
        return user;
    }
});

Template.appBody.onRendered(function(){
    $(document).on('click', '.navbar-collapse.in', function(e) {
        if ( $(e.target).is('a') && ( $(e.target).attr('class') !== 'dropdown-toggle' ) ) {
            $(this).collapse('hide');
        }
    });
}
);

