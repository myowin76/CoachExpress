import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
// import {AuthService} from "../shared/security/auth.service";
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form:FormGroup;
	thisUser = {};

	  // constructor(private fb:FormBuilder, private authService: AuthService,
	  //               private router:Router) {

	  //     this.form = this.fb.group({
	  //         email: ['',Validators.required],
	  //         password: ['',Validators.required]
	  //     });


	  // }
	  constructor(public af: AngularFire) {
	    this.af.auth.subscribe(auth => console.log(auth));
	  }
	  login() {
	  	    const formValue = this.form.value;
	    this.af.auth.login(formValue.email, formValue.password);
	  }

	  ngOnInit() {

	  }


	  // login() {

	  //     const formValue = this.form.value;

	  //     this.authService.login(formValue.email, formValue.password)
	  //         .subscribe(
	  //             user => {
	  //             	// console.log(user.uid);
	  //             	this.thisUser = user;
	  //             	// this.router.navigate(['/dashboard']);
	  //             } 
	  //         );


	  // }

}
