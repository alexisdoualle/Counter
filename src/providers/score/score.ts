import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ScoreProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ScoreProvider {

  constructor(public http: Http,
              ) {
    console.log('Hello ScoreProvider Provider');
  }
/*
  this.platform.ready()
  .then((readySource) =>{
    this.storage.set(players, {"prenomJoueur": "Aliosha", "score":34})
  })
*/
}
