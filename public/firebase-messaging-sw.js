/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyBJ0Q6ZLIEPk9aHuLQyP3UwgNv6TyDNypo",
  authDomain: "fir-project-705cf.firebaseapp.com",
  databaseURL:
    "https://fir-project-705cf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-project-705cf",
  storageBucket: "fir-project-705cf.appspot.com",
  messagingSenderId: "61855830217",
  appId: "1:61855830217:web:86dccf62c366d3f67b3d18",
  measurementId: "G-QSNHTRHKFX",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notification = JSON.parse(payload.data.notification);
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
