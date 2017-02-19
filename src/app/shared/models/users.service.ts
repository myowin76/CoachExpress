import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { AngularFireDatabase } from "angularfire2";
import { User } from "./user";

@Injectable()
export class UsersService {

  constructor(private db:AngularFireDatabase) { }


  getCurrentUserProfile(user_id:string): Observable<User> {
        return this.db.object('user-profile/'+ user_id)
        // .do(console.log)
        // .map(results => results[0]);
    }

}
