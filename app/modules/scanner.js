﻿define(function() {
    return {
        scan: function (success, error) {
            cordova.plugins.barcodeScanner.scan(success, error);
        }
    };
})