import { Component } from '@angular/core';

import { 
  NavController,
  LoadingController,
  ModalController,
  NavParams,
  App 
} from 'ionic-angular';
import {Reddit} from '../../providers/reddit';
import { DetailPage } from '../detail/detail';
import { FilterPage } from '../filter/filter';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Reddit]
})
export class HomePage {
  items: any;
  category: any;
  limit: any;
  constructor(
    public navCtrl: NavController,
    private reddit: Reddit,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public paramsCtrl: NavParams,
    public app: App,
  ){
    this.getDefaults();
  }
  ngOnInit(){
    this.getPosts(this.category,this.limit);
  }
  ionViewDidLoad() {
    this.app.setTitle('SmartApp');
  }
  getDefaults(){
    if(localStorage.getItem('category') != null ) 
      this.category = localStorage.getItem('category');
    else this.category = "sports";

    if(localStorage.getItem('limit') != null ) 
      this.limit = localStorage.getItem('limit');
    else this.limit = 10;
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
  presentFilter(){
    let modal = this.modalCtrl.create(FilterPage);
    modal.present();
    modal.onWillDismiss((data: any) => {
      if (data) {
        console.log(data,"xx");
         this.category = data.category;
         this.limit = data.limit;
         this.getPosts(this.category,this.limit);
      }
    });
  }

}
