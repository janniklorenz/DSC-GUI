import { Injectable } from '@angular/core';

import { ReplaySubject } from "rxjs";

import ReconnectingWebSocket from "../../node_modules/reconnectingwebsocket/reconnecting-websocket.min.js";

import { Session } from "./classes/session";

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DscApiService {

  private socket: ReconnectingWebSocket;

  // TODO
  private auth = {
    key: environment.apiKey,
  };

  // websocket connection status to dsc server
  private _connected: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  get connected() {
    return this._connected.asObservable();
  }

  // current dsc session, or null if not connected
  private _session: ReplaySubject<Session> = new ReplaySubject<Session>();
  get session() {
    return this._session.asObservable();
  }

  constructor() {
    this.socket = new ReconnectingWebSocket(environment.serverURL, "rust-websocket");

    this.socket.onopen = () => this._connected.next(true);
    this.socket.onclose = () => {
      this._connected.next(false);
      this._session.next(null);
    };
		this.socket.onmessage = (event) => {
			try {
				let data = JSON.parse(event.data);
				if (data.type == "Session") {
          this._session.next(data.session);
				}

				if (data.type == "Message") {
          console.log("set message", data)
					// if (data.log != null) {
					// 	this.logs.push(data.log);
					// 	this.show_modal_message();
					// }
				}
			}
			catch (err) {
				console.error(err)
			}
		}
  }


















  // Send given data to dsc server
  private send(data) {
    this.socket.send(JSON.stringify(data));
  }

  setNewTarget() {
    this.send({"type": "NewTarget"});
  }
  setPart(partId, forceNewPart) {
    this.send({
      "type": "SetPart",
      "name": partId,
      "forceNewPart": forceNewPart,
    });
  }
  setSessionIndex(sessionIndex) {
    // this.socket.emit("setSessionIndex", {
    // 	auth: this.auth,
    // 	sessionIndex: sessionIndex,
    // });
  }
  setSelectedSerie(index) {
    // this.socket.emit("setSelectedSerie", {
    // 	auth: this.auth,
    // 	index: index,
    // });
  }
  setSelectedShot(index) {
    // this.socket.emit("setSelectedShot", {
    // 	auth: this.auth,
    // 	index: index,
    // });
  }
  setUser(user){
    // this.socket.emit("setUser", {
    // 	auth: this.auth,
    // 	user: user,
    // });
  }
  setDisciplin(disziplin) {
    this.send({
      "type": "SetDisciplin",
      "name": disziplin,
    });
  }
  print() {
    this.send({
      "type": "Print",
    });
  }
  loadData(data) {
    // this.socket.emit("loadData", {
    // 	auth: this.auth,
    // 	data: data,
    // });
  }
  getTempToken() {
    // this.socket.emit("getTempToken", {
    // 	auth: this.auth,
    // });
  }



  //
  // function new_target() {
  // 	send({
  // 		"type": "NewTarget"
  // 	});
  // }
  //
  // function set_disciplin() {
  // 	send({
  // 		"type": "SetDisciplin",
  // 		"name": "test"
  // 	});
  // }
  //
  // function send(element) {
  // 	socket.send(JSON.stringify(element));
  // }













}
