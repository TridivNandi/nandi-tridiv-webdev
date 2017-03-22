/**
 * Created by Tridiv on 21-03-2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);

    var key = "9337265fcd1a9fb064c7246e35885777";
    var secret = "37579bc1ed6cbac6";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){

        var api = {
            searchPhotos : searchPhotos
        };
        return api;



        function searchPhotos(searchTerm){
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();
