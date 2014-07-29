﻿define(function () {

    var slike = ko.observableArray([]),
        idArtikla = ko.observable(''),
        nazivArtikla = ko.observable(''),
        kataloskiBroj = ko.observable('');

    var viewModel = {
        slike: slike,
        idArtikla : idArtikla,
        nazivArtikla: nazivArtikla,
        kataloskiBroj: kataloskiBroj,
        prikaziDetaljeArtikla: function(data, event) {
            $(event.currentTarget).parent().find('.toggle-content').toggle(100);
            $(event.currentTarget).toggleClass('toggle-1-active');
            return false;
        },
        skeniraj: function() {
            try {
                cordova.plugins.barcodeScanner.scan(function (result) {
                    alert(result.text);
                }, function (error) {
                    alert("Error");
                });
            } catch (e) {
                alert(e);
            }
        },
        slikaj: function() {
            try {
                navigator.camera.getPicture(function (imageData) {
                    alert(imageData);
                    slike.push('data:image/jpeg;base64,' + imageData);
                }, function (error) {
                    alert(error);
                }, {
                    sourceType: Camera.PictureSourceType.CAMERA,
                    destinationType: Camera.DestinationType.DATA_URL,
                });
            } catch (e) {
                alert(e);
            }
        },
        activate: function () {
            idArtikla('0766232');
            nazivArtikla('Artika');
            kataloskiBroj('87487102870');
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
        }
    };

    return viewModel;
})