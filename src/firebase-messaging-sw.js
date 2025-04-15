// // firebase-messaging-sw.js
// importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging.js');

// const firebaseConfig = {
//   apiKey: "AIzaSyCKkAtneINITnfsqmoVVnWsJ6Mll77c-qU",
//   authDomain: "dt-service-center-monitor.firebaseapp.com",
//   projectId: "dt-service-center-monitor",
//   storageBucket: "dt-service-center-monitor.firebasestorage.app",
//   messagingSenderId: "961578844672",
//   appId: "1:961578844672:web:71bec2c721490dccf5cee5",
//   measurementId: "G-8TGR5P213V"
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
