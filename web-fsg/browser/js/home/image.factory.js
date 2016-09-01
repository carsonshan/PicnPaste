app.factory('ImageFactory', function($http){

    var ImageFactory = {}

    ImageFactory.createImage = function (picture) {
        console.log("Home Factory Picture", picture)
        return $http.post('/api/images', picture)
        .then(function(res){
            return res.data
        })
    }
    ImageFactory.getAllImages = function (userId) {
        console.log("getAllImages Ran")
        return $http.get('/api/images/' + userId)
        .then(function(res){
            return res.data
        })
    }

    return ImageFactory;

})
