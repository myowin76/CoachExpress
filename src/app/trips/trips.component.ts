import {Component, OnInit, ViewChild, Input, EventEmitter, Output} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { TripsService } from '../shared/models/trips.service';
import { Trip } from '../shared/models/trip';

import { ModalDirective } from 'ng2-bootstrap';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;

  trips$: Observable<Trip[]>
  newForm:FormGroup;

  @ViewChild('newModal') public newModal: ModalDirective;
  modal: any;

  selectedTrip: Trip;
  selectedTripId: string;
  tripLoaded: boolean = false;

  // constructor(af: AngularFire) {
  constructor(private fb:FormBuilder,
    private tripsService: TripsService) {
  	  

      this.newForm = this.fb.group({
          title: ['',Validators.required]
      });

  	// const trips$ : FirebaseListObservable<any> = af.database.list('trips')

  	// trips$.subscribe(
  	// 	val => console.log(val)
  	// )

		// const trip$ = af.database.object('trips/-KaiFyJAU_mvt3XYRbcn');
		// trip$.subscribe(console.log)

  }

  ngOnInit() {
    this.trips$ = this.tripsService.findAllTrips();
  }

  viewTripDetails(key:string){
    this.selectedTripId = key;

    this.tripsService.findTripById(key)
      .subscribe(trip => {
            this.selectedTrip = trip
            console.log(this.selectedTrip);  

            this.tripLoaded = true;
            this.childModal.show();
        });
    
  }

  public showNewMoal(): void{
    this.newModal.show();
  }
  public hideNewModal(): void {
      this.newModal.hide();
  }

  public hideChildModal(): void {
      this.childModal.hide();
  }

  save(form) {
        this.tripsService.createNewTrip(form.value)
            .subscribe(
                () => {
                    console.log("trip created succesfully. Create another trip ?");
                    form.reset();
                    this.newModal.hide();
                },
                err => alert(`error creating trip ${err}`)
            );

    }

  isErrorVisible(field:string, error:string) {

      return this.newForm.controls[field].dirty
              && this.newForm.controls[field].errors &&
              this.newForm.controls[field].errors[error];

  }

}
