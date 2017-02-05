import { Component, Input, OnInit } from '@angular/core';
import { Journey } from '../shared/models/journey';


@Component({
  selector: 'journey-form',
  templateUrl: './journey-form.component.html',
  styleUrls: ['./journey-form.component.scss']
})
export class JourneyFormComponent implements OnInit {

	@Input() 
	journey: Journey;

  constructor() { }

  ngOnInit() {

  	
  }


}
