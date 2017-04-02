import { Component } from '@angular/core';

import { 
  NavController,
  LoadingController,
  ModalController,
  NavParams,
  AlertController,
  ActionSheetController,
  App 
} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


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
  songs: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    private reddit: Reddit,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public paramsCtrl: NavParams,
    public app: App,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    af: AngularFire
  ){
    this.getDefaults();
    this.songs = af.database.list('/songs');
    console.log(this.songs,"song");
  }
  addSong(){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'author',
          placeholder: 'Author'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.songs.push({
              title: data.title,
              author: data.author
            });
          }
        }
      ]
    });
    prompt.present();
  }
  showOptions(songId, songTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeSong(songId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  updateSong(songId, songTitle){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: songTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.songs.update(songId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }
  removeSong(songId: string){
    this.songs.remove(songId);
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
