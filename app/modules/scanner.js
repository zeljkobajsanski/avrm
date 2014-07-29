define(function() {
    return {
        scan: function (success, error) {
            //success({ text: '8600115078219' });
            //success({ text: '5908309530905' });
            //return;
            cordova.plugins.barcodeScanner.scan(success, error);
        }
    };
})