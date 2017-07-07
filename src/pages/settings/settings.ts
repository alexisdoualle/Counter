import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ScoreProvider } from '../../providers/score/score';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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

  ionViewDidLoad() {
  }


}
