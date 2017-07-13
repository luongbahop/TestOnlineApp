import { NavController, LoadingController,MenuController, IonicApp, AlertController  } from 'ionic-angular';
import { Component } from '@angular/core';
import { LoginEmailPage } from '../login-email/login-email';
import { AuthProvider } from '../../../providers/auth';

import { HomePage } from '../../home/home';

@Component({
  templateUrl: 'sign-up.html',
  selector: 'sign-up',
})

export class SignUpPage {
  error: any;
  form: any;

  constructor(private navCtrl: NavController,
    private auth: AuthProvider,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController, 
    private ionicApp: IonicApp,
    private alertCtrl: AlertController
  ) {
    this.menuCtrl.enable(false);
    this.form = {
      email: '',
      password: ''
    }
  }
  onPageDidEnter() {
    
  }
  onPageDidLeave() {
    this.menuCtrl.swipeEnable(true);
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Hi there',
      subTitle: 'You registered successfully, You can login now!',
      buttons: ['OK']
    });
    alert.present();
  }


  openLoginPage(): void {
    this.navCtrl.push(LoginEmailPage);
  }

  register() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.registerUser(this.form).subscribe(registerData => {
      loading.dismiss();
      this.presentAlert();
      this.openLoginPage();
    }, registerError => {
      setTimeout(() => {
        loading.dismiss();
        this.error = registerError;
      }, 1000);
    });
  }
}
