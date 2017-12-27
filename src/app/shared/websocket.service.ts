import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class WebsocketService {
  ws: WebSocket;

  constructor() { }

  createObservableSocket(url: string, id: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        this.ws.onopen = (event) => this.sendMessage({productId: id});
        return () => this.ws.close();
      }
    ).map((contents: string ) => JSON.parse(contents) );
  }

  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}
