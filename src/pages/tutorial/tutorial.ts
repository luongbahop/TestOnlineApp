import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Slides } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  showSkip = true;

	 slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "http://toeicbuilding.com/uploads/administrator1/image/slide/slider-1.jpg",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "http://toeicbuilding.com/uploads/administrator1/image/slide/slider-2.jpg",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "http://toeicbuilding.com/uploads/administrator1/image/slide/slider-2.jpg",
    }
  ];


  constructor(public navCtrl: NavController) { 

  }
  startApp() {
    this.navCtrl.push(TabsPage).then(() => {
      //this.storage.set('hasSeenTutorial', 'true');
    })
  }




}
