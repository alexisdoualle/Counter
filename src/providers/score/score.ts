import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

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
      this.storage.get("scoreBoard")
      .then(data => {
          this.players = data;
          resolve(this.players);
      });
    });
  }
  // met à jour les joueurs et le score:
  updateScoreBoard(newScoreBoard) {
    return(
      this.platform.ready()
      .then((readySource) => {
        this.storage.set("scoreBoard", newScoreBoard)
        .then(data => {
          console.log("maj scoreBoard");
        });
      })
  )
  }

  // pour les paramètres:
  loadSettings() {
    this.settings = [];
    return new Promise(resolve => {
      this.storage.get("settings")
      .then(data => {
          this.settings = data;
          resolve(this.settings);
      });
    });
  }

  updateSettings(newSettings) {
    return(
    this.platform.ready()
    .then((readySource) => {
      this.storage.set("settings", newSettings)
      .then(data => {
        this.settings = newSettings;
      });
    })
  )}

  initialize() {
    this.platform.ready()
    .then((readySource) =>{
      this.storage.set("scoreBoard", [{"prenomJoueur": "Player 1", "score":0},
                                          {"prenomJoueur": "Player 2", "score":0}]);
      this.storage.set("settings", {"tapPoints":1, "pressPoints":5})
    })
    .then(data => {

    });
  }


}
