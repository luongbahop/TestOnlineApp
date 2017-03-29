//import library
import { Component,ViewChild } from '@angular/core';
import { NavController,ToastController,Platform,LoadingController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

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
  isLogged=false;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public statusBar: StatusBar, 
    public userData: UserData,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public nav: NavController
  ) {
    if(localStorage.getItem('loginApp')!=null){
      this.navCtrl.push(HomePage)
        .then(() => {
          const startIndex = this.navCtrl.getActive().index - 1;
          this.navCtrl.remove(startIndex, 1);
        });
    }
  }
  ionViewWillEnter() {
    console.log("I'm alive!");
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
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      //check user existed or not
      this.userData.login(this.login.username,this.login.password).subscribe(
          data => {
              localStorage.setItem('loginApp',data.username);
              localStorage.setItem('userAvatar',data.avatar);
              localStorage.setItem('userEmail',data.email);
              localStorage.setItem('userFullname',data.fullname);
              this.isLogged=true;
                this.nav.setRoot(HomePage);
              
              setTimeout(() => {
                this.isLogged=true;
                this.navCtrl.push(HomePage,{data:true})
                .then(() => {
                  const startIndex = this.navCtrl.getActive().index - 1;
                  this.navCtrl.remove(startIndex, 1);
                });
                
                loading.dismiss();
              }, 1000);
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
