import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Common } from './common';

@Injectable({
  providedIn: 'root'
})
export class MainSocketService {

  public socket = io(Common.socketBaseUrl)
  public sid = '';

  constructor() {
    this.socket.on('connect', () => {
      this.sid = this.socket.id;
    })

    this.socket.on('disconnect', () => {
      console.log("Disconnect");
    })
  }


  emit(service: any, data: any) {
    this.socket.emit(service, data);
  }

  on(service: any, data: Function) {
    this.socket.on(service, data);
  }


}
