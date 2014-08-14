define(['plugins/http'], function(http) {
    var url = 'http://109.111.228.3/AVRM/Data/';
    return {
        vratiArtikal: function(barkod) {
            return http.get(url + "VratiArtikal/" + barkod);
        },
        vratiSlikeArtikla : function(id) {
            return http.get(url + "VratiSlikeArtikla/" + id);
        },
        sacuvajSliku : function(slika) {
            return $.ajax({
                url: url + 'SacuvajSliku',
                dataType: 'json',
                type: 'POST',
                crossDomain: true,
                data: slika
            });
        },
        postaviDefaultSliku : function(slika) {
            return $.ajax({
                url: url + 'PostaviDefaultSliku',
                dataType: 'json',
                type: 'POST',
                crossDomain: true,
                data: slika
            });
        }
        
    };
})