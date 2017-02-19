import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My app works!';
  user = {};
  // trips: FirebaseListObservable<any[]>;

  constructor (private af: AngularFire){
  	// const trips$ : FirebaseListObservable<any[]> = af.database.list('trips');

  	// trips$.subscribe(
  	// 	val => console.log(val)
  	// );

  	
  }
  ngOnInit(){
    // this.af.auth.subscribe(
    //   user => {
    //     if(user) {
    //       // user logged in
    //       this.user = user;
    //       console.log('USER2 ' + user.uid);
    //     }
    //     else {
    //       // user not logged in
    //       this.user = {};
    //     }
    //   }
    // )
  }

}
