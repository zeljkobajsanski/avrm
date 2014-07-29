define(function () {

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
        activate: function () {
            idArtikla('0766232');
            nazivArtikla('Artikallllllllll jkhgjkg hggkjjjjjjjjjjjjj hjk');
            kataloskiBroj('87487102870');
            slike.push('/images/general/1.jpg');
            slike.push('/images/general/6.jpg');
            slike.push('/images/general/2.jpg');
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