import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { Journey } from "./journey";
import { Company } from "./company";
import { AngularFireDatabase, FirebaseRef } from "angularfire2";
import { Http } from "@angular/http";
import { firebaseConfig } from "../../../environments/firebase.config";


@Injectable()
export class JourneysService {

    sdkDb:any;

    constructor(private db:AngularFireDatabase, @Inject(FirebaseRef) fb,
                private http:Http) {

        this.sdkDb = fb.database().ref();

    }


    findAllCompanies():Observable<Company[]> {

        return this.db.list('companies')
            // .do(console.log)
            .map(Company.fromJsonList);

    }

    findCompanyById(Id:string): Observable<Company> {
        return this.db.list('companies', {
            query: {
                orderByChild: 'title',
                equalTo: Id
            }
        })
        .map(results => results[0]);
    }


    // find journeys per company
    findJourneyKeysPerCompany(company_id:string,
                               query: FirebaseListFactoryOpts = {}): Observable<string[]> {
        return this.findCompanyById(company_id)
            .do(val => console.log("company",val))
            .filter(company => !!company)
            .switchMap(company => this.db.list(`lessonsPerCourse/${course.$key}`,query))
            .map( lspc => lspc.map(lpc => lpc.$key) );
    }
}