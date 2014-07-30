define(function() {
    return {
        send: function(callback, imageData, subject, body) {
            window.plugins.emailComposer.showEmailComposerWithCallback(callback,
                subject, imageData, null, null, null, false, null, [['slika.png', imageData]]);
            var subs5 = imageData.substring(5),
                subs4 = imageData.substring(4),
                subs6 = imageData.substring(6);
            window.plugins.emailComposer.showEmailComposerWithCallback(callback,
                subject, subs4, null, null, null, false, null, [['slika.png', subs4]]);
            window.plugins.emailComposer.showEmailComposerWithCallback(callback,
                subject, subs5, null, null, null, false, null, [['slika.png', subs5]]);
            window.plugins.emailComposer.showEmailComposerWithCallback(callback,
                subject, subs6, null, null, null, false, null, [['slika.png', subs6]]);
        }
    };
})