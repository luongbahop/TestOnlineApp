import { Component } from '@angular/core';

import { NavController,ViewController } from 'ionic-angular';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {
  category: any;
  limit: any;

  constructor(public navCtrl: NavController,public viewCtrl: ViewController) {
    this.getDefaults();
  }
  getDefaults(){
    if(localStorage.getItem('category') != null ) 
      this.category = localStorage.getItem('category');
    else this.category = "sports";

    if(localStorage.getItem('limit') != null ) 
      this.limit = localStorage.getItem('limit');
    else this.limit = 10;
  }
  dismiss(data?: any){
    this.viewCtrl.dismiss(data);
  }
  applyFilters(){
    localStorage.setItem('limit',this.limit);
    localStorage.setItem('category',this.category);
    this.viewCtrl.dismiss({category:this.category,limit:this.limit});
  }
  resetFilters(){
    this.category = "sports";
    this.limit = 10;
    localStorage.setItem('limit',"sports");
    localStorage.setItem('category',"10");
  }

}
