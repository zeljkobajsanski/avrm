define(['durandal/system'], function(sys) {
    return {
        send: function (imageData, subject, body) {
            try {
                //window.plugins.emailComposer.showEmailComposerWithCallback(function (e) { alert(e); }, subject, body, null, null, null, false, null, [['slika.png', imageData]]);
                window.plugins.emailComposer.showEmailComposerWithCallback(null, subject, body, null, null, null, false, null, [['Slika.png', imageData]]);
            } catch (exc) {
                alert(exc);
            }
            
        }
    };
})