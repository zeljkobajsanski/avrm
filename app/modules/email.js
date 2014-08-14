define(['durandal/system'], function(sys) {
    return {
        send: function (imageData, subject, body) {
            try {
                window.plugins.emailComposer.showEmailComposerWithCallback(null, subject, body, null, null, null, false, null, [['Slika.png', imageData.substring(22)]]);
            } catch (exc) {
                alert(exc);
            }
            
        }
    };
})