//import library
import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

//import pages
import { SignupPage } from '../signup/signup';
// import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html',
  providers: [UserData]
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public statusBar: StatusBar, 
    public userData: UserData
  ) {

  }
  onLogin(){
    //valid data
    if(this.login.username==''){
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Username is not empty',
      });
      alert.present();
    }else if(this.login.password==''){
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Password is not empty',
      });
      alert.present();
    }
    //check user existed or not
    this.userData.login(this.login.username,this.login.password).subscribe(
        data => {
            console.log(data);
        },
        err => {
            let alert = this.alertCtrl.create({
              title: 'Warning',
              subTitle: 'The user is not exist',
            });
            alert.present();
        },
        () => console.log('Get user to login Completed')
    );
  }
  openSignup(){
    this.navCtrl.push(SignupPage);
  }
}
