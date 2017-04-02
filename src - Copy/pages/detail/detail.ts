import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, NavParams} from 'ionic-angular';

//import { TabsPage } from '../tabs/tabs';
//import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
 dataDetail: any;

  constructor(
    public navCtrl: NavController,
    public paramsCtrl: NavParams
  ) {
      this.dataDetail=paramsCtrl.get('detail');
    }


}
