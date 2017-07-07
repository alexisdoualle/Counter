import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

/*
  Generated class for the ScoreProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ScoreProvider {
  players: any;
  settings: any;
  constructor(public http: Http,
              public storage: Storage,
              public platform: Platform,) {
    //this.storage.clear();
    //this.initialize();
    //console.log();
  }
  // obtient la liste des joueurs
  loadPlayers() {
    this.players = [];
    return new Promise(resolve => {
      this.storage.get("data")
      .then(data => {
          this.players = data.scoreBoard;
          resolve(this.players);
      });
    });
  }
  // pour les paramètres:
  loadSettings() {
    this.settings = [];
    return new Promise(resolve => {
      this.storage.get("data")
      .then(data => {
          this.settings = data.settings;
          resolve(this.settings);
      });
    });
  }

  updateSettings(newSettings) {
    this.platform.ready()
    .then((readySource) => {
      this.storage.set("data", "true")
      .then(data => {
        console.log("added: " + dt);
      });
    })
  }

  initialize() {
    this.platform.ready()
    .then((readySource) =>{
      this.storage.set("data", {scoreBoard: [{"prenomJoueur": "Aliosha", "score":0},
                                          {"prenomJoueur": "Matthias", "score":0}],
                                settings: {"tapPoints":2,
                                           "pressPoints":11}
                              })
    })
    .then(data => {

    });
  }


}
