import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController,Events } from 'ionic-angular';

import { HomePage } from '../home/home';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  isLogged: any;

  username = localStorage.getItem('loginApp');
  userFullname = localStorage.getItem('userFullname');
  userAvatar = localStorage.getItem('userAvatar');
  userEmail = localStorage.getItem('userEmail');

  constructor(public navCtrl: NavController,public events: Events) {}
  logout(){
    localStorage.removeItem('loginApp');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userFullname');
    this.isLogged=false;
    this.events.publish('user:logout');
    this.navCtrl.push(HomePage)
      .then(() => {
        const startIndex = this.navCtrl.getActive().index - 1;
        this.navCtrl.remove(startIndex, 1);
      });

  }


}
