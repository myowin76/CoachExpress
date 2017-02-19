import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { Journey } from "./journey";
import { Company } from "./company";
import { AngularFireDatabase, FirebaseRef } from "angularfire2";
import { Http } from "@angular/http";
import { firebaseConfig } from "../../../environments/firebase.config";
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";



@Injectable()
export class JourneysService {

    sdkDb:any;

    constructor(private db:AngularFireDatabase, @Inject(FirebaseRef) fb,
                private http:Http) {

        this.sdkDb = fb.database().ref();

    }


    findAllJourneys():Observable<Journey[]> {

        return this.db.list('journeys')
            // .do(console.log)
            .map(Journey.fromJsonList);

    }

    //     

    // findJourneysByDate
    findJourneysByDate(date:string): Observable<Journey> {
        return this.db.list('journeys', {
            query: {
                orderByChild: 'depart_date',
                equalTo: date
            }
        })
        .map(results => results[0]);
    }

    findJourneyById(Id:string): Observable<Journey> {
        return this.db.object('journeys/'+Id)
        // .do(console.log)
        // .map(results => results[0]);
    }

    findCompanyById(Id:string): Observable<Company> {
        return this.db.object('companies/'+Id)
        .do(console.log);
        // .map(results => results[0]);
    }

    findJourneysByCompany(companyId:string): Observable<Journey[]> {
        return this.db.list('journeys', {
            query: {
                orderByChild: 'company_id',
                equalTo: companyId
            }
        })
        .do(console.log);
    }

    // 
    findJourneysByDateTime(date:string): Observable<Journey[]> {
        return this.db.list('journeys', {
            query: {
                orderByChild: 'date',
                equalTo: date
            }
        })
        .do(console.log);
    }


    // find journeys per company
    findJourneyKeysPerCompany(company_id:string): Observable<string[]> {
        // return this.findCompanyById(company_id)
        //     .do(val => console.log("company1",val))
        //     .filter(company => !!company)
        //     .switchMap(company => this.db.list(`companyJourneys/${company.$key}`,query))
        //     .map( lspc => lspc.map(lpc => lpc.$key) );

        return this.db.list('company-journeys/' + company_id)
            .map(lspc => lspc.map(lpc => lpc.$key))
            // .map(lpc => lpc)
        // .do(console.log);
    }

    findJourneysForJourneyKeys(journeyKeys$: Observable<string[]>) :Observable<Journey[]> {
        return journeyKeys$
            .map(lspc => lspc.map(journeyKeys$ => this.db.object('journeys/' + journeyKeys$)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs) )

    }
    
     findAllJourneysForCompany(company_id:string):Observable<Journey[]> {
        return this.findJourneysForJourneyKeys(this.findJourneyKeysPerCompany(company_id));
    }

    createNewJourney(company_id:string, journey:any): Observable<any> {

        const journeyToSave = Object.assign({}, journey, {company_id});

        const newJourneyKey = this.sdkDb.child('journeys').push().key;

        let dataToSave = {};

        dataToSave["journeys/" + newJourneyKey] = journeyToSave;
        dataToSave[`company-journeys/${company_id}/${newJourneyKey}`] = true;


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


    updateJourney(journeyId:string, journey): Observable<any> {

        const journeyToUpdate = Object.assign({}, journey);
        delete(journeyToUpdate.$key);

        let dataToSave = {};
        dataToSave[`journeys/${journeyId}`] = dataToSave;

        return this.firebaseUpdate(dataToSave);


    }


    deleteJourney(journeyId:string): Observable<any> {

        const url = firebaseConfig.databaseURL + '/journeys/' + journeyId + '.json';

        return this.http.delete(url);
    }


    // requestLessonDeletion(lessonId:string, courseId:string) {
    //     this.sdkDb.child('queue/tasks').push({lessonId,courseId})
    //         .then(
    //             () => alert('lesson deletion requested !')
    //         );
    // }
}