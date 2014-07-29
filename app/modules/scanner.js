define(function() {
    return {
        scan: function (success, error) {
            //success({ text: '86001150782191' });
            //return;
            cordova.plugins.barcodeScanner.scan(success, error);
        }
    };
})