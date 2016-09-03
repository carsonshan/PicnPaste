// ------------------------------ //
// ----- PUSH NOTIFICATIONS ----- //
// ------------------------------ //

chrome.gcm.register(["173857227663"], function (registrationId) {
    if (chrome.runtime.lastError) {
        // When the registration fails, handle the error and retry the
        // registration later.
        console.error("FCM Registration failed")
        return;
    }

    sendRegistrationId(function(succeed) {
        // Once the registration token is received by your server,
        // set the flag such that register will not be invoked
        // next time when the app starts up.
        if (succeed) chrome.storage.local.set({registered: true});
    });
})

function sendRegistrationId(callback) {
  // Send the registration token to your application server
  // in a secure way.
}

chrome.runtime.onStartup.addListener(function() {
  chrome.storage.local.get("registered", function(result) {
    // If already registered, bail out.
    if (result["registered"])
      return;

    // Up to 100 senders are allowed.
    var senderIds = ["173857227663"];
    chrome.gcm.register(senderIds, registerCallback);
  });
});

//Add a listener for push notifications
chrome.gcm.onMessage.addListener(function(message) {
  // A message is an object with a data property that
  // consists of key-value pairs.
});



// ---------------------------- //
// --- Normal Functionality --- //
// ---------------------------- //

// After Dom Loads, add event listeners to buttons
document.addEventListener("DOMContentLoaded", function () {
    console.log("Does this even run?", document.getElementById("copyPicButton"))
    // console.log(document, document.getElementById("copyPicButton"))
    $( "#copyPicButton" ).on("click", copyPic);

    // ----------------------------------------------- //
    // ----- Service Worker / Push Notifications ----- //
    // ----------------------------------------------- //

    var reg;
    var sub;
    var isSubscribed = false;
    var subscribeButton = document.querySelector('#subscribeButtonId');
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

    subscribeButton.addEventListener('click', function() {
      if (isSubscribed) {
        unsubscribe();
      } else {
        subscribe();
      }
    });

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

    // ----------------------------------------------- //
    // ---------------- Ajax Requests ---------------- //
    // ----------------------------------------------- //

                        // // Substitute your own sender ID here. This is the project
                        // // number you got from the Google Developers Console.
                        // var senderId = "173857227663";

                        // // Make the message ID unique across the lifetime of your app.
                        // // One way to achieve this is to use the auto-increment counter
                        // // that is persisted to local storage.

                        // // Message ID is saved to and restored from local storage.
                        // var messageId = 0;
                        // chrome.storage.local.get("messageId", function(result) {
                        //   if (chrome.runtime.lastError)
                        //     return;
                        //   messageId = parseInt(result["messageId"]);
                        //   if (isNaN(messageId))
                        //     messageId = 0;
                        // });

                        // // Sets up an event listener for send error.
                        // chrome.gcm.onSendError.addListener(sendError);

                        // // Returns a new ID to identify the message.
                        // function getMessageId() {
                        //   messageId++;
                        //   chrome.storage.local.set({messageId: messageId});
                        //   return messageId.toString();
                        // }

                        // function sendMessage() {
                        //   var message = {
                        //     messageId: getMessageId(),
                        //     destinationId: senderId + "@gcm.googleapis.com",
                        //     timeToLive: 86400,    // 1 day
                        //     data: {
                        //       "key1": "value1",
                        //       "key2": "value2"
                        //     }
                        //   };
                        //   chrome.gcm.send(message, function(messageId) {
                        //     if (chrome.runtime.lastError) {
                        //       // Some error occurred. Fail gracefully or try to send
                        //       // again.
                        //       return;
                        //     }

                        //     // The message has been accepted for delivery. If the message
                        //     // can not reach the destination, onSendError event will be
                        //     // fired.
                        //   });
                        // }

                        // function sendError(error) {
                        //   console.log("Message " + error.messageId +
                        //       " failed to be sent: " + error.errorMessage);
                        // }

    var testGetRequest = document.querySelector('#testGetRequestButton')
    // testGetRequest.addEventListener('click', sendMessage)
    testGetRequest.addEventListener('click', function(data) {
        // For more information on get/requests: https://developer.chrome.com/extensions/xhr
        console.log("Buttons working", endpoint)
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:1337/gmc/push", true)
        // xhr.open("POST", "https://android.googleapis.com/gcm/send -d "{"registration_ids":["fxtnAsXv1gw:APA91bE4ovKEiASABU0Ia-rTHtDHbxU99BvCB0XhSug54vDc53jndVnnGRbDlCljVeDxoiWEYXO6aYXfk46W91pbrGNk8eyiKFDauksJi505zx-zH4U2c2-9OuBxOn7rGiqB8dZ13gBb"]}"", true);
        xhttp.setRequestHeader("Content-type", "application/json");;
        xhr.send();
    });
});




// ------------- --- ------------- //
// ------------- DOM ------------- //
// ------------- --- ------------- //

function copyPic () {

    var picMain = document.getElementById("picMain")
    var imageData = getImageData(picMain)
    console.log(imageData);
    copyTextToClipboard(imageData)

}

function getImageData(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var imgd = canvas.toDataURL("image/png");
    return imgd;
}

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);

}


// The onClicked callback function.
function onClickHandler(info, tab) {
  if (info.menuItemId == "radio1" || info.menuItemId == "radio2") {
    console.log("radio item " + info.menuItemId +
                " was clicked (previous checked state was "  +
                info.wasChecked + ")");
  } else if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {
    console.log(JSON.stringify(info));
    console.log("checkbox item " + info.menuItemId +
                " was clicked, state is now: " + info.checked +
                " (previous state was " + info.wasChecked + ")");

  } else {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
  }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var contexts = ["page","selection","link","editable","image","video",
                  "audio"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});
    console.log("'" + context + "' item:" + id);
  }

  // Create a parent item and two children.
  chrome.contextMenus.create({"title": "Test parent item", "id": "parent"});
  chrome.contextMenus.create({"title": "Child 1", "parentId": "parent", "id": "child1"});
  chrome.contextMenus.create({"title": "Child 2", "parentId": "parent", "id": "child2"});
  console.log("parent child1 child2");


  // // Create some radio items.
  // chrome.contextMenus.create({"title": "Radio 1", "type": "radio",
  //                             "id": "radio1"});
  // chrome.contextMenus.create({"title": "Radio 2", "type": "radio",
  //                             "id": "radio2"});
  // console.log("radio1 radio2");

  // // Create some checkbox items.
  // chrome.contextMenus.create(
  //     {"title": "Checkbox1", "type": "checkbox", "id": "checkbox1"});
  // chrome.contextMenus.create(
  //     {"title": "Checkbox2", "type": "checkbox", "id": "checkbox2"});
  // console.log("checkbox1 checkbox2");

  // Intentionally create an invalid item, to show off error checking in the
  // create callback.
  // console.log("About to try creating an invalid item - an error about " +
  //     "duplicate item child1 should show up");
  // chrome.contextMenus.create({"title": "Oops", "id": "child1"}, function() {
  //   if (chrome.extension.lastError) {
  //     console.log("Got expected error: " + chrome.extension.lastError.message);
  //   }
  // });

});




