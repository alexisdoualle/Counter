import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { HelpPage } from '../help/help';

import { ScoreProvider } from '../../providers/score/score';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public scoreBoard: any;
  public settings: any;

  public round: any;
  public reorderBool: any;

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public scoreProvider: ScoreProvider) {

    this.getPlayers();
    this.getSettings();
    this.round = 0;
    this.reorderBool = false;

  }

  getPlayers() {
    this.scoreProvider.loadPlayers()
    .then(data => {
      this.scoreBoard = data;
    })
  }

  getSettings() {
    this.scoreProvider.loadSettings()
    .then(data => {
      this.settings = data;
    })
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }

  goToHelp() {
    console.log("HelpPage");
    this.navCtrl.push(HelpPage);
  }

  addPlayer() {
    let prompt = this.alertCtrl.create({
     title: 'Nouveau joueur',
     message: "Entrez le prénom:",
     inputs: [
       {
         name: 'prenomJoueur',
         placeholder: 'Prénom'
       },
     ],
     buttons: [
       {
         text: 'Cancel',
         handler: data => {
           console.log('Cancel clicked');
         }
       },
       {
         text: 'Save',
         handler: data => {
           // inclure une promesse?
           this.scoreBoard.push({"prenomJoueur":prompt.data.inputs[0].value, "score":0});
           this.scoreProvider.updateScoreBoard(this.scoreBoard);
         }
       }
     ]
   });
   prompt.present();
  }

  supprimerJoueur(idJoueur) {
    this.scoreBoard.splice(idJoueur,1);
    this.scoreProvider.updateScoreBoard(this.scoreBoard);
  }

  changerNom(idJoueur) {
    let prompt = this.alertCtrl.create({
     title: 'Nouveau prénom',
     message: "Entrez le prénom:",
     inputs: [
       {
         name: 'nouveauNom',
         placeholder: 'Prénom'
       },
     ],
     buttons: [
       {
         text: 'Cancel',
         handler: data => {
           console.log('Cancel clicked');
         }
       },
       {
         text: 'Save',
         handler: data => {
         this.scoreBoard[idJoueur].prenomJoueur = prompt.data.inputs[0].value;
         this.scoreProvider.updateScoreBoard(this.scoreBoard);
         }
       }
     ]
    });
    prompt.present();

  }

  changerScore(idJoueur: any, positif: Boolean, tap: Boolean) {
    if(positif){
      if(tap){
        this.scoreBoard[idJoueur].score += this.scoreProvider.settings.tapPoints;
      } else {
        this.scoreBoard[idJoueur].score += this.scoreProvider.settings.pressPoints;
      }
    } else {
      if(tap){
        this.scoreBoard[idJoueur].score -= this.scoreProvider.settings.tapPoints;
      } else {
        this.scoreBoard[idJoueur].score -= this.scoreProvider.settings.pressPoints;
      }
    }

  }


  reorderItems(indexes) {
    let element = this.scoreBoard[indexes.from];
    this.scoreBoard.splice(indexes.from, 1);
    this.scoreBoard.splice(indexes.to, 0, element);
  }

}
