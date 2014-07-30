define(function() {
    return {
        send: function (callback, imageData, subject, body) {
            var img = imageData.toString();
            window.plugins.emailComposer.showEmailComposerWithCallback(callback,
                subject, body, null, null, null, false, null, [['slika.png', img]]);
            //var subs5 = img.substring(5),
            //    subs4 = img.substring(4),
            //    subs6 = img.substring(6);
            //window.plugins.emailComposer.showEmailComposerWithCallback(callback,
            //    subject, subs4, null, null, null, false, null, [['slika.png', subs4]]);
            //window.plugins.emailComposer.showEmailComposerWithCallback(callback,
            //    subject, subs5, null, null, null, false, null, [['slika.png', subs5]]);
            //window.plugins.emailComposer.showEmailComposerWithCallback(callback,
            //    subject, subs6, null, null, null, false, null, [['slika.png', subs6]]);
        }
    };
})