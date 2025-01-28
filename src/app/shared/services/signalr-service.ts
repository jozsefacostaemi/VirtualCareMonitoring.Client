import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';  // Usamos un Subject para emitir eventos

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  private fetchDataSubject = new Subject<any>(); 
  public fetchData$ = this.fetchDataSubject.asObservable(); 

  constructor() {}

  // Método para iniciar la conexión de SignalR
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:9753/eventhub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Conexión SignalR establecida'))
      .catch((err) =>
        console.log('Error al iniciar la conexión SignalR: ' + err)
      );
  };
  public listenForFetchData(eventName: string)  {
    this.hubConnection.on(eventName, (payload: any) => {
      this.fetchDataSubject.next({ eventName, payload });
    });
  };
}
