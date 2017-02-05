import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { TripsService } from '../shared/models/trips.service';
import { Trip } from '../shared/models/trip';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  trips$: Observable<Trip[]>

  // constructor(af: AngularFire) {
  constructor(private tripsService: TripsService) {
  	

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

}
