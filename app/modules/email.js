define(function() {
    return {
        send: function(callback, imageData, subject, body) {
            window.plugins.emailComposer.showEmailComposerWithCallback(callback,
                subject, body, null, null, null, false, null, [['slika.png', imageData]]);
        }
    };
})