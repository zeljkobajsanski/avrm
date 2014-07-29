define(['plugins/http', 'modules/scanner', 'modules/camera', 'modules/data'], function (http, scanner, camera, data) {

    var slike = ko.observableArray([]),
        idArtikla = ko.observable(''),
        nazivArtikla = ko.observable(''),
        kataloskiBroj = ko.observable(''),
        brend = ko.observable(''),
        isBusy = ko.observable(false),
        notBusy = function() { isBusy(false); },
        showError = function () { $(".tap-dismiss-notification").fadeIn(); },
        detaljiArtiklaNaslov = ko.computed(function() {
            return nazivArtikla() ? nazivArtikla() : 'Artikal nije izabran';
        });

    var viewModel = {
        slike: slike,
        idArtikla : idArtikla,
        nazivArtikla: nazivArtikla,
        detaljiArtiklaNaslov : detaljiArtiklaNaslov,
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
                    data.vratiArtikal(result.text).done(function (artikal) {
                        if (artikal) {
                            idArtikla(artikal.Id);
                            nazivArtikla(artikal.Naziv);
                            kataloskiBroj(artikal.KataloskiBroj);
                            brend(artikal.Brend);
                            isBusy(true);
                            data.vratiSlikeArtikla(artikal.Id).done(function(slikeArtikla) {
                                slike(slikeArtikla);
                            }).always(notBusy);
                        } else {
                            idArtikla('');
                            nazivArtikla('');
                            kataloskiBroj('');
                            brend('');
                            slike([]);
                        }
                    }).fail(function () {
                        showError();
                    }).always(function () {
                        isBusy(false);
                    });
                }
            }, function () {
                showError();
            });
        },
        slikaj: function() {
            camera.capture(function (imageData) {
                if (!idArtikla()) {
                    return;
                }
                var slika = { ArtikalId: idArtikla(), Url: 'data:image/png;base64,' + imageData, IsNew: true };
                slike.push(slika);
                isBusy(true);
                data.sacuvajSliku(slika).done(function() {
                    slika.IsNew = false;
                }).fail(function() {
                    showError();
                }).always(notBusy);
            }, 
            function(error) {
                showError();
            });
        },
        sacuvaj: function () {
            var s = slike();
            for (var i = 0; i < s.length; i++) {
                if (s[i].ArtikalId && s[i].IsNew) {
                    isBusy(true);
                    data.sacuvajSliku(s[i]).done(function () {
                        s[i].IsNew = false;
                    }).always(function() {
                        isBusy(false);
                    }).fail(showError);
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