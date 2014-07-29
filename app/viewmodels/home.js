define(['plugins/http'], function (http) {

    var slike = ko.observableArray([]),
        idArtikla = ko.observable(''),
        nazivArtikla = ko.observable(''),
        kataloskiBroj = ko.observable(''),
        brend = ko.observable('');

    var viewModel = {
        slike: slike,
        idArtikla : idArtikla,
        nazivArtikla: nazivArtikla,
        brend: brend,
        kataloskiBroj: kataloskiBroj,
        prikaziDetaljeArtikla: function(data, event) {
            $(event.currentTarget).parent().find('.toggle-content').toggle(100);
            $(event.currentTarget).toggleClass('toggle-1-active');
            return false;
        },
        skeniraj: function() {
            try {
                
                cordova.plugins.barcodeScanner.scan(function (result) {
                    if (result.text) {
                        http.get('http://192.168.1.2/MobileAVR/api/Artikli/893201').done(function (artikal) {
                            idArtikla(artikal.Id);
                            nazivArtikla(artikal.Naziv);
                            kataloskiBroj(artikal.KataloskiBroj);
                            brend(artikal.Brend);
                        }).fail(function () {
                            $(".tap-dismiss-notification").fadeIn();
                        });
                    }
                }, function (error) {
                    $(".tap-dismiss-notification").fadeIn();
                });
            } catch (e) {
                $(".tap-dismiss-notification").fadeIn();
            }
        },
        slikaj: function() {
            try {
                navigator.camera.getPicture(function (imageData) {
                    slike.push('data:image/png;base64,' + imageData);
                }, function (error) {
                    $(".tap-dismiss-notification").fadeIn();
                }, {
                    quality: 50,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    destinationType: Camera.DestinationType.DATA_URL,
                    encodingType: Camera.EncodingType.PNG,
                    correctOrientation: true
                });
            } catch (e) {
                $(".tap-dismiss-notification").fadeIn();
            }
        },
        activate: function () {
        },
        attached: function () {
            var owl = $(".slider-controls");
            // Custom Navigation Events
            $(".next-slider").click(function () {
                owl.trigger('owl.next');
                return false;
            });
            $(".prev-slider").click(function () {
                owl.trigger('owl.prev');
                return false;
            });
            $(".tap-dismiss-notification").hide();
            $('.tap-dismiss-notification').click(function () {
                $(this).fadeOut();
                return false;
            });
        }
    };

    return viewModel;
})