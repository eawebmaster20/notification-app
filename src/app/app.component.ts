import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'notificationApp';



  token:string ='';
  apiEndpoint:string = '';
  message: any;
  currentMessage = new BehaviorSubject(null);

  constructor(
    private api:HttpClient,
    private socket: WebSocketService,
  ) {}

  ngOnInit(): void {
    this.socket.on('message', (msg: string) => {
      console.log(msg)
    });
  }

  sendMessage(): void {
    this.socket.emit('message', 'this.message');
  }
}

