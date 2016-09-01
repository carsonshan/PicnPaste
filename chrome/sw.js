console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
    console.log('Push message received', event);
    var title = 'Push message';
    event.waitUntil(
        self.registration.showNotification(title, {
          body: 'The Message',
          icon: '/bar_icon_camera.png',
          tag: 'my-tag'
    }));
});

// This code will check all window clients for this service worker: if the requested URL is already open in a tab, focus on it - otherwise open a new tab for it.
self.addEventListener('notificationclick', function(event) {

    console.log('Notification click: tag ', event.notification.tag);

    //Android doesn’t close the notification when you click it. That’s why we need event.notification.close();.
    event.notification.close();

    // The URL you want to open when you click the notification (This should be changed for production):
    var url = 'http://localhost:1337';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
