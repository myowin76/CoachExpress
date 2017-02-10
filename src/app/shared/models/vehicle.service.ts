import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { Http } from "@angular/http";
import { AngularFireDatabase, FirebaseRef } from "angularfire2";

import { Vehicle } from "./vehicle";

@Injectable()
export class VehicleService {

	sdkDb:any;

  constructor(private db:AngularFireDatabase, @Inject(FirebaseRef) fb,
                private http:Http) {

        this.sdkDb = fb.database().ref();

    }


    findAllVehicles():Observable<Vehicle[]> {

        return this.db.list('vehicles')
            // .do(console.log)
            .map(Vehicle.fromJsonList);

    }

    findAvalibleVehicles(on_duty:string):Observable<Vehicle[]> {

        return this.db.list('companies', {
            query: {
                orderByChild: 'on_duty',
                equalTo: ! on_duty  //find not on duty
            }
        })
        .map(Vehicle.fromJsonList);

    }

}
