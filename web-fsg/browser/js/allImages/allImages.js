app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('allImages', {
        url: '/allImages',
        controller: 'allImagesController',
        templateUrl: 'js/allImages/allImages.html',
        resolve: {
            loggedInUser: function (AuthService){
                return AuthService.getLoggedInUser()
            },
            allImages: function (ImageFactory, loggedInUser){
                return ImageFactory.getAllImages(loggedInUser._id)
                .then(function(images){
                    return images.reverse()
                    console.log("Resolve Images:", images)
                })
            }
        }
    });

});

