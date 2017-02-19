import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	users = {};

  constructor (private af: AngularFire){
  	
	}

  ngOnInit() {
  	const users$ : FirebaseListObservable<any[]> = this.af.database.list('user-profile');

  	users$.subscribe(
  		val => {
  			this.users = val;
  			console.log(val);
  		}
  	);
  }

}
