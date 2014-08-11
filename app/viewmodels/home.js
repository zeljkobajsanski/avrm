define(['plugins/http', 'modules/scanner', 'modules/camera', 'modules/data', 'modules/email'], function (http, scanner, camera, data, email) {

    var slike = ko.observableArray([]),
        idArtikla = ko.observable(''),
        maticniBroj = ko.observable(''),
        nazivArtikla = ko.observable(''),
        kataloskiBroj = ko.observable(''),
        brend = ko.observable(''),
        isBusy = ko.observable(false),
        notBusy = function() { isBusy(false); },
        showError = function() {
            $(".tap-dismiss-notification").fadeIn().fadeOut(4000);
        },
        detaljiArtiklaNaslov = ko.computed(function() {
            return nazivArtikla() ? nazivArtikla() : 'Artikal nije izabran';
        }),
        sacuvajSliku = function(slika) {
            isBusy(true);
            try {
                data.sacuvajSliku(slika).done(function (status) {
                    if (status != "ok") {
                        showError();
                        if (confirm(status + '. Da li želite da ponovite snimanje?')) {
                            sacuvajSliku(slika);
                        }
                    }
                    slika.IsNew = false;
                }).fail(function (err) {
                    showError();
                    if (confirm('Da li želite da ponovite snimanje?')) {
                        sacuvajSliku(slika);
                    }
                }).always(notBusy);
            } catch (e) {
                showError();
            }
        };

    var viewModel = {
        slike: slike,
        idArtikla: idArtikla,
        maticniBroj: maticniBroj,
        nazivArtikla: nazivArtikla,
        detaljiArtiklaNaslov : detaljiArtiklaNaslov,
        brend: brend,
        kataloskiBroj: kataloskiBroj,
        isBusy: isBusy,
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
                            maticniBroj(artikal.MaticniBroj);
                            nazivArtikla(artikal.Naziv);
                            kataloskiBroj(artikal.KataloskiBroj);
                            brend(artikal.Brend);
                            data.vratiSlikeArtikla(artikal.Id).done(function (slikeArtikla) {
                                slike($.map(slikeArtikla, function(s) {
                                    return { ArtikalId: s.ArtikalId, IsDefault: ko.observable(s.IsDefault), Url: s.Url };
                                }));
                            }).always(function() {
                                notBusy();
                            });
                        } else {
                            idArtikla('');
                            maticniBroj('');
                            nazivArtikla('');
                            kataloskiBroj('');
                            brend('');
                            slike([]);
                            notBusy();
                            alert('Artikal nije pronađen. Pokušajte ponovo');
                        }
                    }).fail(function () {
                        notBusy();
                        showError();
                    }).always(function () {
                        //isBusy(false);
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
                var slika = { ArtikalId: idArtikla(), Url: 'data:image/png;base64,' + imageData, IsNew: true, IsDefault: ko.observable(false) };
                slike.push(slika);
                sacuvajSliku(slika);
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
        posaljiEmail: function (s, el) {
            email.send(s.Url, nazivArtikla(), 'Šaljemo vam željenu sliku artikla. Vaš Nineks');
        },
        postaviDefaultSliku: function (s) {
            isBusy(true);
            data.postaviDefaultSliku(s).done(function (result) {
                //$.each(slike, function(i, slika) {
                //    slika.IsDefault(false);
                //});
                if (result != "ok" && confirm("Default slika nije postavljena. Želite da pokušate ponovo?")) {
                    postaviDefaultSliku(s);
                    return;
                }
                s.IsDefault(true);
                return;
            }).fail(function() {
                
            }).always(function() {
                isBusy(false);
            });
        },
        activate: function () {
            
        },
        attached: function () {
            //var owl = $(".slider-controls");
            // Custom Navigation Events
            //$(".next-slider").click(function () {
            //    owl.trigger('owl.next');
            //    return false;
            //});
            //$(".prev-slider").click(function () {
            //    owl.trigger('owl.prev');
            //    return false;
            //});
            $(".tap-dismiss-notification").hide();
            //$('.tap-dismiss-notification').click(function () {
            //    $(this).fadeOut();
            //    return false;
            //});
        }
    };

    return viewModel;
})