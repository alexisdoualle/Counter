import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { HelpPage } from '../help/help';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  public players: any;
  public round: any;
  public reorderBool: any;

  @Input('tapScoreIncrease') tapScoreIncrease: number;

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController) {

    this.players = [{"prenomJoueur":"Alexis", "score":0},
                    {"prenomJoueur":"Matthias", "score":0},
                    {"prenomJoueur":"Hugo", "score":0},
                    {"prenomJoueur":"Paul", "score":0},
                    {"prenomJoueur":"JB", "score":0},
                    {"prenomJoueur":"Blandine", "score":0},
                    {"prenomJoueur":"Gaspard", "score":0},
                  ];
    this.round = 0;
    this.reorderBool = false;

  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }

  goToHelp() {
    console.log("HelpPage");
    this.navCtrl.push(HelpPage);
  }

  ajouterJoueur() {
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
           this.players.push({"prenomJoueur":prompt.data.inputs[0].value, "score":0});
         }
       }
     ]
   });
   prompt.present();

  }

  supprimerJoueur(idJoueur) {
    this.players.splice(idJoueur,1);

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
         this.players[idJoueur].prenomJoueur = prompt.data.inputs[0].value;
         }
       }
     ]
    });
    prompt.present();

  }

  incrementer(idJoueur) {
    this.players[idJoueur].score += this.tapScoreIncrease;
  }

  incrementerBeaucoup(idJoueur) {
    this.players[idJoueur].score += 10;
  }


  decrementer(idJoueur) {
    this.players[idJoueur].score -= 1;
  }

  decrementerBeaucoup(idJoueur) {
    this.players[idJoueur].score -= 10;
  }

  reorderItems(indexes) {
    let element = this.players[indexes.from];
    this.players.splice(indexes.from, 1);
    this.players.splice(indexes.to, 0, element);
  }

}
