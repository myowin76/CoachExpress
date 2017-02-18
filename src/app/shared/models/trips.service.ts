import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { AngularFireDatabase, FirebaseRef } from "angularfire2";
import { Http } from "@angular/http";
import { firebaseConfig } from "../../../environments/firebase.config";
import { Trip } from "./trip";


@Injectable()
export class TripsService {

    sdkDb:any;

    constructor(private db:AngularFireDatabase, @Inject(FirebaseRef) fb,
                private http:Http) {

        this.sdkDb = fb.database().ref();

    }


    findAllTrips():Observable<Trip[]> {

        return this.db.list('trips')
            // .do(console.log)
            .map(Trip.fromJsonList);

    }

    findTripById(Id:string): Observable<Trip> {
        return this.db.object('trips/'+Id)
        // .do(console.log)
        // .map(results => results[0]);
    }

    // findCompanyById(Id:string): Observable<User> {
    //     return this.db.list('companies', {
    //         query: {
    //             orderByChild: 'name',
    //             equalTo: Id
    //         }
    //     })
    //     .map(results => results[0]);
    // }

    createNewTrip(trip:any): Observable<any> {

        const tripToSave = Object.assign({}, trip);

        const newTripKey = this.sdkDb.child('trips').push().key;

        let dataToSave = {};

        dataToSave["trips/" + newTripKey] = newTripKey;

        return this.firebaseUpdate(dataToSave);
    }

    firebaseUpdate(dataToSave) {
        const subject = new Subject();

        this.sdkDb.update(dataToSave)
            .then(
                val => {
                    subject.next(val);
                    subject.complete();

                },
                err => {
                    subject.error(err);
                    subject.complete();
                }
            );

        return subject.asObservable();
    }


    
}