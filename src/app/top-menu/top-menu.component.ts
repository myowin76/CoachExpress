import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/security/auth.service";
import { AuthInfo } from "../shared/security/auth-info"; 
import { User } from "../shared/models/user"; 
import { UsersService } from "../shared/models/users.service";
import { Router } from "@angular/router";

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';



@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

	authInfo: AuthInfo;

  constructor(private authService:AuthService, private usersService:UsersService, private af:AngularFire , private router:Router) { }
  user = {};
  profile: User;
  email = '';
  ngOnInit() {
  	// this.authService.authInfo$.subscribe(authInfo =>  {
   //      this.authInfo = authInfo;
   //  }); 
   //  console.log('Top menu ' + this.authInfo.$uid);
    // console.log("user Info"  + AuthInfo);

    this.af.auth.subscribe(
      user => {
        if(user) {
          // user logged in
          this.user = user;
          console.log('USER2 ' + this.user);
          this.usersService.getCurrentUserProfile(user.auth.uid)
            .subscribe( profile => {
              this.profile = profile;
              // console.log('Profile' + profile.company)
            })
          
        }
        else {
          // user not logged in
          this.user = {};
        }
      }
    )

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
