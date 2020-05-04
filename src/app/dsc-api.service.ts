import { Injectable } from '@angular/core';

import { ReplaySubject } from "rxjs";

import ReconnectingWebSocket from "../../node_modules/reconnectingwebsocket/reconnecting-websocket.min.js";

import { Session, DSCConfig, DisciplinePart } from "./classes/session";

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
  private currentSession: Session;
  private _session: ReplaySubject<Session> = new ReplaySubject<Session>();
  get session() {
    return this._session.asObservable();
  }
  
  private _config: ReplaySubject<DSCConfig> = new ReplaySubject<DSCConfig>();
  get config() {
    return this._config.asObservable();
  }

  constructor() {
    this.socket = new ReconnectingWebSocket(environment.serverURL);
    // this.socket = new ReconnectingWebSocket("ws://" + location.host + "/socket/");

    this.socket.onopen = () => {
      this._connected.next(true);
      window.status = "ready";
    };
    this.socket.onclose = () => {
      this._connected.next(false);
      this._session.next(null);
    };
		this.socket.onmessage = (event) => {
			try {
				let data = JSON.parse(event.data);
        if (data.type == "Config") {
          this._config.next(data.config);
				}
				if (data.type == "Session") {
          this._session.next(data.session);
          this.currentSession = data.session;
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
  
  private getDisciplinePart(session: Session, type: String): DisciplinePart {
    return session.discipline.parts.find(part => part.id == type);
  }
  
  

  setNewTarget() {
    this.send({"type": "NewTarget"});
  }
  setPart(partId, forceNewPart) {
    this.send({
      "type": "SetPart",
      "name": partId,
      "force_new_part": forceNewPart,
    });
  }
  togglePart() {
    const session = this.currentSession;
    if (session == null) return;
    const disciplineParts = session.discipline.parts;
    const activePart = session.parts[session.active_part];
    const activeDisciplineParts = this.getDisciplinePart(session, activePart.part_type);
    const currentIndex = disciplineParts.indexOf(activeDisciplineParts);
    
    // Jump to the first disciplin part if we are at the end
    if (currentIndex + 1 >= disciplineParts.length) {
      this.setPart(disciplineParts[0].id, false);
    }
    // Jump to the nex disciplin part
    else {
      this.setPart(disciplineParts[currentIndex+1].id, false);
    }
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
