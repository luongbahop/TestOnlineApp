import { NavController, MenuController, IonicApp } from 'ionic-angular';
import { Component } from '@angular/core';
import { LoginEmailPage } from '../login-email/login-email';
import { SignUpPage } from '../sign-up/sign-up';
import { TermsOfServicePage } from '../../terms-of-service/terms-of-service';
import { AuthProvider } from '../../../providers/auth';

import { HomePage } from '../../home/home';

@Component({
  templateUrl: 'home.html',
  selector: 'auth-home',
})

export class AuthPage {
  error: any;

  constructor(public navCtrl: NavController, public auth: AuthProvider, public menuCtrl: MenuController, public ionicApp: IonicApp) {
    this.menuCtrl.swipeEnable(false);
    this.auth.getUserData().subscribe(data => {
          if(typeof data.email !== 'undefined' && data.email !== '')this.navCtrl.push(HomePage);
      }, err => {
        this.error = err;
      });
  }

  ngOnInit() {
    
  }

  openSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

  openLoginPage() {
    this.navCtrl.push(LoginEmailPage);
  }

  openTermsOfService() {
    this.navCtrl.push(TermsOfServicePage);
  }

  loginUserWithFacebook() {
    this.auth.loginWithFacebook().subscribe(data => {
      this.navCtrl.setRoot(HomePage);
    }, err => {
      this.error = err;
    });
  }
}
