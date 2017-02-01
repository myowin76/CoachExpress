import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form:FormGroup;
	thisUser = {};

	  constructor(private fb:FormBuilder, private authService: AuthService,
	                private router:Router) {

	      this.form = this.fb.group({
	          email: ['',Validators.required],
	          password: ['',Validators.required]
	      });


	  }

	  ngOnInit() {

	  }


	  login() {

	      const formValue = this.form.value;

	      this.authService.login(formValue.email, formValue.password)
	          .subscribe(
	              user => {
	              	// console.log(user.uid);
	              	this.thisUser = user;
	              	// this.router.navigate(['/dashboard']);
	              } 
	          );


	  }

}
