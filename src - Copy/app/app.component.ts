//import library
import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import pages
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  testData: any;
  isLogged=false;
  userLogin: string;
  avatarLogin: string;
  fullNameLogin:string;
  appPages: PageInterface[] = [
    { title: 'Home', component: TabsPage, tabComponent: HomePage, icon: 'home' },
    { title: 'About', component: TabsPage, tabComponent: AboutPage, index: 1, icon: 'contacts' },
    { title: 'Contact', component: TabsPage, tabComponent: ContactPage, index: 2, icon: 'map' },
  ];
  loggedOutPages = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events,) {
    //console.log(localStorage.getItem('loginApp'),123);
      if(localStorage.getItem('loginApp')!=null){
        this.isLogged=true;
        this.avatarLogin=localStorage.getItem('userAvatar');
        this.fullNameLogin=localStorage.getItem('userFullname');
      }
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        this.rootPage =TutorialPage;
    
        console.log(this.rootPage);
 
    });
    this.listenToLoginEvents();
    
  }
  ionViewWillEnter() {
    console.log("I'm alive!");
  }
  ngOnInit(){
  }
  
  openTutorial() {
    this.nav.setRoot(TutorialPage);

  }
  openLogin() {
    this.nav.setRoot(LoginPage);
  }
  openProfile() {
    this.nav.setRoot(ProfilePage);
  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.isLogged=true;
      this.avatarLogin=localStorage.getItem('userAvatar');
      this.fullNameLogin=localStorage.getItem('userFullname');
    });

    this.events.subscribe('user:signup', () => {
      //this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.isLogged=false;
    });
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    
  }
}
