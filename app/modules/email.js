define(['durandal/system'], function(sys) {
    return {
        send: function (imageData, subject, body) {
            try {
                window.plugins.emailComposer.showEmailComposerWithCallback(function (e) { alert(e); }, subject, body, null, null, null, false, [], [['slika.png', $.toJSON(imageData)]]);
            } catch (exc) {
                alert(exc);
            }
            
        }
    };
})