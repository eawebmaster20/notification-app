import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'notificationApp';
  firebaseConfig = {
    apiKey: "AIzaSyCKkAtneINITnfsqmoVVnWsJ6Mll77c-qU",
    authDomain: "dt-service-center-monitor.firebaseapp.com",
    projectId: "dt-service-center-monitor",
    storageBucket: "dt-service-center-monitor.firebasestorage.app",
    messagingSenderId: "961578844672",
    appId: "1:961578844672:web:71bec2c721490dccf5cee5",
    measurementId: "G-8TGR5P213V"
  }
  app = initializeApp(this.firebaseConfig);
  messaging = getMessaging(this.app);

  ngOnInit(): void {
    getToken(this.messaging, {vapidKey: 'BKe_ShDB4q9RAO3PdPR5NNRcOfp5WpnvXlSttvkKl_Prv6xS9v00cn9Pju4IDhH8V82FvGUNBRCZVvTQNc05qnQ'}).then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    })
  }
}
