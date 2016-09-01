app.controller('HomeController', function ($scope, ImageFactory, loggedInUser) {


    $scope.picTaken = false;
    $scope.loggedInUser = loggedInUser
    $scope.imageToSend = {
        user: $scope.loggedInUser._id
    }


    // ------------------------------- //
    // --------SERVICE WORKERS-------- //
    // ------------------------------- //

    var reg;
    var sub;
    var isSubscribed = false;
    var subscribeButton = document.getElementById('subscribeButton');

    if (isSubscribed) $scope.subscribedOrUnsubscribed = "Subscribed"
    else $scope.subscribedOrUnsubscribed = "Unsubscribed"

    if ('serviceWorker' in navigator) {
      console.log('Service Worker is supported');
      navigator.serviceWorker.register('sw.js').then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(serviceWorkerRegistration) {
        reg = serviceWorkerRegistration;
        subscribeButton.disabled = false;
        console.log('Service Worker is ready :^)', reg);
      }).catch(function(error) {
        console.log('Service Worker Error :^(', error);
      });
    }

    $scope.subscribeButtonFunction = function() {
      if (isSubscribed) {
        unsubscribe();
      } else {
        subscribe();
      }
    };

    function subscribe() {
      reg.pushManager.subscribe({userVisibleOnly: true}).
      then(function(pushSubscription){
        sub = pushSubscription;
        console.log('Subscribed! Endpoint:', sub.endpoint);
        subscribeButton.textContent = 'Unsubscribe';
        isSubscribed = true;
      });
    }

    function unsubscribe() {
      sub.unsubscribe().then(function(event) {
        subscribeButton.textContent = 'Subscribe';
        console.log('Unsubscribed!', event);
        isSubscribed = false;
      }).catch(function(error) {
        console.log('Error unsubscribing', error);
        subscribeButton.textContent = 'Subscribe';
      });
    }



    // ------------------------------- //
    // --------Image Execution-------- //
    // ------------------------------- //

    var desiredWidth;
    $(document).ready(function() {
        console.log('onReady');
        $("#cameraInput").on("change",gotPic);

        desiredWidth = screen.width || window.innerWidth;

        if(!("url" in window) && ("webkitURL" in window)) {
            window.URL = window.webkitURL;
        }

    });



    function getImageData(img) {
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        var dataURL = canvas.toDataURL("image/png");

        return dataURL
    }

    //Credit: https://www.youtube.com/watch?v=EPYnGFEcis4&feature=youtube_gdata_player
    function gotPic(event) {
        if(event.target.files.length == 1 &&
           event.target.files[0].type.indexOf("image/") == 0) {
            $("#yourimage").attr("src",URL.createObjectURL(event.target.files[0]));
            $scope.imageToSend.name = event.target.files[0].name
            console.log($scope.imageToSend)
            $scope.picTaken = true
            $scope.$digest()
        }

    }

    $scope.sendToChrome = function () {

        console.log("This", this)
        //Grab the Image
        var imagediv = document.getElementById('yourimage');

        //Get the DataURL for the image (this will be sent to db)
        var imageToSend = getImageData(imagediv)
        $scope.imageToSend.image = imageToSend

        console.log("RAN", $scope.imageToSend)
        ImageFactory.createImage($scope.imageToSend)
    }

    $scope.loadImages = function () {
        ImageFactory.getAllImages()
    }



    // // Check for the various File API support.
    // if (window.File && window.FileReader && window.FileList && window.Blob) {
    //   // Great success! All the File APIs are supported.
    // } else {
    //   alert('The File APIs are not fully supported in this browser.');
    // }


    // function hasGetUserMedia() {
    //     console.log(!!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia))
    //     return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    //             navigator.mozGetUserMedia || navigator.msGetUserMedia);
    // }

    // if (hasGetUserMedia()) {
    //   // Good to go!
    // } else {
    //   alert('getUserMedia() is not supported in your browser');
    // }

    // navigator.getUserMedia  = navigator.getUserMedia ||
    //                           navigator.webkitGetUserMedia ||
    //                           navigator.mozGetUserMedia ||
    //                           navigator.msGetUserMedia;

    // var video = document.querySelector('imageCanvas');

    // if (navigator.getUserMedia) {
    //   navigator.getUserMedia({video: true}, function(stream) {
    //     video.src = window.URL.createObjectURL(stream);
    //   }, errorCallback);
    // } else {
    //   video.src = 'somevideo.webm'; // fallback.
    // }


    // window.onload = document.getElementById('stateButtons').addEventListener('change', handleFileSelect, false);








})
