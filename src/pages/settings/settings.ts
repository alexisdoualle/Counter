import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ScoreProvider } from '../../providers/score/score';

import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public tapScoreIncrease: any;
  public pressScoreIncrease: any;
  public settings: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public scoreProvider: ScoreProvider) {

    this.getSettings();

  }

  getSettings() {
    this.scoreProvider.loadSettings()
    .then(data => {
      this.settings = data;
      this.tapScoreIncrease = this.settings.tapPoints;
      this.pressScoreIncrease = this.settings.pressPoints;
    })
  }

  updateSettings(tap, press) {
    let tapInt = parseInt(tap);
    let pressInt = parseInt(press);
    let newSettings = {"tapPoints":tapInt, "pressPoints":pressInt};

    this.scoreProvider.updateSettings(newSettings)
    .then(data => {
      console.log("tadaaa!");
    });
  }

  ionViewDidLoad() {
  }


}
