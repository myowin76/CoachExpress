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

    findCompanyById(Id:string): Observable<Company> {
        return this.db.list('companies', {
            query: {
                orderByChild: 'name',
                equalTo: Id
            }
        })
        .map(results => results[0]);
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


    // find journeys per company
    findJourneyKeysPerCompany(company_id:string,
                               query: FirebaseListFactoryOpts = {}): Observable<string[]> {
        return this.findCompanyById(company_id)
            .do(val => console.log("company",val))
            .filter(company => !!company)
            .switchMap(company => this.db.list(`companyJourneys/${company.$key}`,query))
            .map( lspc => lspc.map(lpc => lpc.$key) );
    }
    
    // findJourneyById(id:string):Observable<Journey> {
        
    //     return this.findAllJourneys()
    //         .do(val => console.log("journey",val))
    //         // .filter(course => !!course)
    //         .switchMap(course => this.db.list(`lessonsPerCourse/${course.$key}`,query))
    //         .map( lspc => lspc.map(lpc => lpc.$key) );
        
    // }

    

    
    // findJourneysByCompany

    // findLessonByCompany(url:string):Observable<Journey> {
    //     return this.db.list('journeys', {
    //         query: {
    //             orderByChild: 'company_id',
    //             equalTo: company_id
    //         }
    //     })
    //     .filter(results => results && results.length > 0)
    //     .map(results => Journey.fromJson(results[0]))
    //     .do(console.log);
    // }


    // loadNextJourney(tripId:string, journeyId:string):Observable<Journey> {
    //     return this.db.list(`journeyPerCompany/${companyId}`, {
    //         query: {
    //             orderByKey:true,
    //             startAt: journeyId,
    //             limitToFirst: 2
    //         }
    //     })
    //     .filter(results => results && results.length > 0) 
    //     .map(results => results[1].$key)
    //     .switchMap(journeyId => this.db.object(`journeys/${journeyId}`))
    //     .map(Journey.fromJson);
    // }


    // loadPreviousLesson(courseId:string, lessonId:string):Observable<Journey> {
    //     return this.db.list(`lessonsPerCourse/${courseId}`, {
    //         query: {
    //             orderByKey:true,
    //             endAt: lessonId,
    //             limitToLast: 2
    //         }
    //     })
    //     .filter(results => results && results.length > 0)
    //     .map(results => results[0].$key)
    //     .switchMap(lessonId => this.db.object(`lessons/${lessonId}`))
    //     .map(Journey.fromJson);

    // }

    createNewJourney(companyId:string, journey:any): Observable<any> {

        const journeyToSave = Object.assign({}, journey, {companyId});

        const newJourneyKey = this.sdkDb.child('journeys').push().key;

        let dataToSave = {};

        dataToSave["journeys/" + newJourneyKey] = journeyToSave;
        dataToSave[`companyJourneys/${companyId}/${newJourneyKey}`] = true;


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


    saveLesson(journeyId:string, journey): Observable<any> {

        const journeyToSave = Object.assign({}, journey);
        delete(journeyToSave.$key);

        let dataToSave = {};
        dataToSave[`journey/${journeyId}`] = journeyToSave;

        return this.firebaseUpdate(dataToSave);


    }


    deleteLesson(journeyId:string): Observable<any> {

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