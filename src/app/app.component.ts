import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
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


  token:string ='';
  apiEndpoint:string = '';
  message: any;
  currentMessage = new BehaviorSubject(null);

  constructor(private api:HttpClient) {}

  ngOnInit(): void {
    getToken(this.messaging, {vapidKey: environment.vapidKey}).then((currentToken) => {
      if (currentToken) {
        this.token = currentToken;
        this.requestPermission()
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });

    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
    });
    this.requestPermission();

    onBackgroundMessage(this.messaging, (res)=>{
      console.log(res);
    })
  }




  requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        onMessage(this.messaging, (payload) => {
          console.log('Message received. ', payload);
        });
      }
    })
  }

  sendToken(){
    this.api.post(this.apiEndpoint, {token: this.token})
    .subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>console.log(err)
    })
  }
}

