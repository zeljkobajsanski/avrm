define(function() {
    return {
        send: function (imageData, subject, body) {
            try {
                window.plugins.emailComposer.showEmailComposer(subject, body, null, null, null, false, null, [['slika.png', imageData]]);
            } catch (e) {
                alert(e);
            }
            
        }
    };
})