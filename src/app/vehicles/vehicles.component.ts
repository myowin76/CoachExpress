import {Component, OnInit, ViewChild, Input, EventEmitter, Output} from '@angular/core';
import { VehiclesService } from '../shared/models/vehicles.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap';

import { Vehicle } from '../shared/models/vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

	@ViewChild('childModal') public childModal: ModalDirective;

  vehicles$: Observable<Vehicle[]>
	newForm:FormGroup;
	companyId = '-KaiKfnmWpBYseUOaDxu';

	selectedVehicle: Vehicle;
	selectedVehicleId: string;
  vehicleLoaded: boolean = false;
  

  @ViewChild('newModal') public newModal: ModalDirective;
  modal: any;

  constructor(private fb:FormBuilder,
    private vehiclesService: VehiclesService) {
  		this.newForm = this.fb.group({
          number: ['',Validators.required],
          driver: ['',Validators.required],
          company_id: this.companyId
      });
    }

  ngOnInit() {
    this.vehicles$ = this.vehiclesService.findAllVehicles();
  }

  viewVehicleDetails(key:string){
    this.selectedVehicleId = key;

    this.vehiclesService.findVehicleById(key)
      .subscribe(vehicle => {
            this.selectedVehicle = vehicle
            console.log(this.selectedVehicle);  

            this.vehicleLoaded = true;
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
        this.vehiclesService.createNewVehicle(form.value)
            .subscribe(
                () => {
                    console.log("vehicle created succesfully. Create another vehicle ?");
                    form.reset();
                    this.newModal.hide();
                },
                err => alert(`error creating journey ${err}`)
            );

    }

  isErrorVisible(field:string, error:string) {

      return this.newForm.controls[field].dirty
              && this.newForm.controls[field].errors &&
              this.newForm.controls[field].errors[error];

  }
}
