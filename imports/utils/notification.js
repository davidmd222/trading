export const notify = function(text, classSet) {
    $('.notification-wrap').remove();

    switch (classSet) {
    case 'success':
        notifyClass = 'alert-success';
        break;
    case 'info':
        notifyClass = 'alert-info';
        break;
    case 'warning':
        notifyClass = 'alert-warning';
        break;
    case 'danger':
        notifyClass = 'alert-danger';
        break;
    default:
        notifyClass = 'alert-info';
    }

    let container = document.getElementById('cont');
    container || ((container = document.createElement('div')).id = 'cont', container.classList.add('cont'), document.body.appendChild(container));

    let $div = $('<div class=\'notif alert ' + notifyClass + '\'> <div>' + text + '</div></div>')
        .click(function() {
            $div.remove();
        })
        .appendTo(container);

    setTimeout(function() {
        $div
            .animate({
                top: '-300px'
            }, 1500,
            function() {
                $div.remove();
            });
    }, 2500);
};

