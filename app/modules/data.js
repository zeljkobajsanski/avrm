define(['plugins/http'], function(http) {
    //var url = 'http://192.168.1.2/MobileAVR/Data/';
    var url = 'http://46.165.252.195/AVRM/Data/';
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
        }
        
    };
})