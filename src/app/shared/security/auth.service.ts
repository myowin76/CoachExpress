import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs/Rx";
import { AngularFire, AngularFireDatabase, AngularFireAuth, FirebaseAuthState } from "angularfire2";
import { AuthInfo } from "./auth-info";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {


  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);


  constructor(public af: AngularFire, private db:AngularFireDatabase, private auth: AngularFireAuth, private router:Router) {

  }


    login(email, password):Observable<FirebaseAuthState> {

        return this.fromFirebaseAuthPromise(this.af.auth.login({email: email, password: password}));
    }

    signUp(email, password) {
        return this.fromFirebaseAuthPromise(this.auth.createUser({email, password}));
    }

    /*
     *
     * This is a demo on how we can 'Observify' any asynchronous interaction
     *
     *
     * */

    fromFirebaseAuthPromise(promise):Observable<any> {
        
        const subject = new Subject<any>();

        promise
            .then(res => {
                    this.af.auth.subscribe( user => {
                      const authInfo = new AuthInfo(user.uid);
                      this.authInfo$.next(authInfo);
                      subject.next(res);
                      subject.complete();  
                    })
                },
                err => {
                    this.authInfo$.error(err);
                    subject.error(err);
                    subject.complete();
                });

        return subject.asObservable();
    }


    logout() {
        this.af.auth.logout();
        this.authInfo$.next(AuthService.UNKNOWN_USER);
        this.router.navigate(['/login']);

    }

}