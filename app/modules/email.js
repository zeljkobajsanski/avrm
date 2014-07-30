define(function() {
    return {
        send: function (callback, imageData, subject, body) {
            var img = imageData.toString();
            window.plugins.emailComposer.showEmailComposerWithCallback(callback,
                subject, body, null, null, null, false, null, [['slika.png', imageData]]);
            
        }
    };
})