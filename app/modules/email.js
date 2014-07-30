define(function() {
    return {
        send: function (callback, imageData, subject, body) {
            try {
                window.plugins.emailComposer.showEmailComposerWithCallback(callback,
                            subject, body, null, null, null, false, null, [['slika.png', imageData]]);
            } catch (e) {
                alert(e);
            }
            
        }
    };
})