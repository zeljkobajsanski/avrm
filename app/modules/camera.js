define(function() {
    return {
        capture: function(successCallback, error) {
            navigator.camera.getPicture(function (image) {
                successCallback(image);
            }, function (e) {
                error(e);
            },
            {
                quality: 50,
                sourceType: Camera.PictureSourceType.CAMERA,
                destinationType: Camera.DestinationType.DATA_URL,
                encodingType: Camera.EncodingType.PNG,
                correctOrientation: false
            });
        }
    };
});