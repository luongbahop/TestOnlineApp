import { Component } from '@angular/core';

import { NavController,LoadingController } from 'ionic-angular';
import {Reddit} from '../../providers/reddit';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Reddit]
})
export class HomePage {
  items: any;
  constructor(
    public navCtrl: NavController,
    private reddit: Reddit,
    public loadingCtrl: LoadingController,
  ){

  }
  ngOnInit(){
    this.getPosts('sports',10);
  }
  getPosts(category,limit){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.reddit.getPosts(category,limit).subscribe(response=>{
      this.items = response.data.children;
      setTimeout(() => {
        loading.dismiss();
      }, 1000);



      console.log(response);
    })
  }
  viewItem(item){
    this.navCtrl.push(DetailPage,{
      detail:item
    })
  }

}
