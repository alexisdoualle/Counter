import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  public players: any;

  public tap: number = 0;
  constructor(public alertCtrl: AlertController) {
    this.players = [{"prenomJoueur":"Alexis", "score":0},
                    {"prenomJoueur":"Matthias", "score":0},
                    {"prenomJoueur":"Hugo", "score":0},
                    {"prenomJoueur":"Paul", "score":0},
                    {"prenomJoueur":"JB", "score":0},
                    {"prenomJoueur":"Blandine", "score":0},
                    {"prenomJoueur":"Gaspard", "score":0},
                  ];

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

  incrementer(idJoueur) {
    this.players[idJoueur].score += 1;
  }

  decrementer(idJoueur) {
    this.players[idJoueur].score -= 1;
  }

}
