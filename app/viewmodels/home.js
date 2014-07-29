define(['plugins/http', 'modules/scanner'], function (http, scanner) {

    var slike = ko.observableArray([]),
        idArtikla = ko.observable(''),
        nazivArtikla = ko.observable(''),
        kataloskiBroj = ko.observable(''),
        brend = ko.observable(''),
        isBusy = ko.observable(false);

    var viewModel = {
        slike: slike,
        idArtikla : idArtikla,
        nazivArtikla: nazivArtikla,
        brend: brend,
        isBusy: isBusy,
        kataloskiBroj: kataloskiBroj,
        prikaziDetaljeArtikla: function(data, event) {
            $(event.currentTarget).parent().find('.toggle-content').toggle(100);
            $(event.currentTarget).toggleClass('toggle-1-active');
            return false;
        },
        skeniraj: function() {
            scanner.scan(function (result) {
                if (result.text) {
                    isBusy(true);
                    http.get('http://192.168.1.2/MobileAVR/Data/VratiArtikal/' + result.text).done(function (artikal) {
                        if (artikal) {
                            idArtikla(artikal.Id);
                            nazivArtikla(artikal.Naziv);
                            kataloskiBroj(artikal.KataloskiBroj);
                            brend(artikal.Brend);
                        } else {
                            idArtikla('');
                            nazivArtikla('');
                            kataloskiBroj('');
                            brend('');
                        }
                    }).fail(function () {
                        $(".tap-dismiss-notification").fadeIn();
                    }).always(function () {
                        isBusy(false);
                    });
                }
            }, function () {
                $(".tap-dismiss-notification").fadeIn();
            });
        },
        slikaj: function() {
            try {
                navigator.camera.getPicture(function (imageData) {
                    slike.push({ ArtikalId: idArtikla(), Url: 'data:image/png;base64,' + imageData, IsNew : true });
                }, function (error) {
                    $(".tap-dismiss-notification").fadeIn();
                }, {
                    quality: 50,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    destinationType: Camera.DestinationType.DATA_URL,
                    encodingType: Camera.EncodingType.PNG,
                    correctOrientation: false
                });
            } catch (e) {
                $(".tap-dismiss-notification").fadeIn();
            }
        },
        sacuvaj: function () {
            if (!idArtikla()) {
                alert('Artikal nije izabran');
                return;
            }
            var slike = slike();
            for (var i = 0; i < slike.length; i++) {
                if (slike[i].IsNew) {
                    isBusy(true);
                    $.ajax({
                        url: 'http://192.168.1.2/MobileAVR/Data/SacuvajSliku',
                        dataType: 'json',
                        type: 'POST',
                        crossDomain: true,
                        data: slike[i]
                    }).done(function() {
                        isBusy(false);
                    });
                }
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