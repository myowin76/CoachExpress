import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My app works!';

  // trips: FirebaseListObservable<any[]>;

  constructor (private af: AngularFire){
  	const trips$ : FirebaseListObservable<any[]> = af.database.list('trips');

  	trips$.subscribe(
  		// val => console.log(val)
  	);
  	
  }
}
