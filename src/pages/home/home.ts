import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Reddit} from '../../providers/reddit';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Reddit]
})
export class HomePage {
  items: any;
  constructor(
    public navCtrl: NavController,
    private reddit: Reddit
  ){

  }
  ngOnInit(){
    this.getPosts('sports',10);
  }
  getPosts(category,limit){
    this.reddit.getPosts(category,limit).subscribe(response=>{
      this.items = response.data.children;
      console.log(response);
    })
  }

}
