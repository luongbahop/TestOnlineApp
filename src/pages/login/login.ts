//import library
import { Component,ViewChild } from '@angular/core';
import { NavController,ToastController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

//import pages
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
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
    public toastCtrl: ToastController,
    public statusBar: StatusBar, 
    public storage: Storage,
    public userData: UserData
  ) {
    this.storage.get('userLogin')
      .then((userLogin) => {
          if (userLogin) {
            this.navCtrl.push(HomePage)
            .then(() => {
              const startIndex = this.navCtrl.getActive().index - 1;
              this.navCtrl.remove(startIndex, 1);
            });
          }
    });

  }
  onLogin(){
    //valid data
    if(this.login.username==''){
      let toast = this.toastCtrl.create({
        message: 'Username is not empty',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }else if(this.login.password==''){
      let toast = this.toastCtrl.create({
        message: 'Password is not empty',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }else{
      //check user existed or not
      this.userData.login(this.login.username,this.login.password).subscribe(
          data => {
              // set a userLogin storage
              this.storage.set('userLogin', data);
              this.navCtrl.push(HomePage);
              // // Or to get a key/value pair
              // this.storage.get('name').then((name) => {
              //   console.log('Your age is', name);
              // })
          },
          err => {
              let toast = this.toastCtrl.create({
                message: 'The user is not exist',
                duration: 3000,
                position: 'bottom',
              });
              toast.present();
          },
          () => console.log('Get user to login Completed')
      );
    }//end
  }
  openSignup(){
    this.navCtrl.push(SignupPage);
  }
}
