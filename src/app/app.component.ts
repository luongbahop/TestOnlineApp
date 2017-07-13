//import library
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import pages
import { AuthPage } from '../pages/auth/home/home';
import { LoginEmailPage } from '../pages/auth/login-email/login-email';
import { SignUpPage } from '../pages/auth/sign-up/sign-up';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { ProfilePage } from '../pages/profile/profile';

//import  providers
import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';


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

  isAppInitialized: boolean = false;
  user: any;
  rootPage: any = AuthPage;


  testData: any;
  isLogged = false;
  userLogin: string;
  avatarLogin: string;
  fullNameLogin: string;
  appPages: PageInterface[] = [
    { title: 'Home', component: TabsPage, tabComponent: HomePage, icon: 'home' },
    { title: 'About', component: TabsPage, tabComponent: AboutPage, index: 1, icon: 'contacts' },
    { title: 'Contact', component: TabsPage, tabComponent: ContactPage, index: 2, icon: 'map' },
  ];
  loggedOutPages = [
    { title: 'Login', component: AuthPage, icon: 'log-in' },
    { title: 'Signup', component: SignUpPage, icon: 'person-add' }
  ];
  constructor(
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: Events,
    private platform: Platform,
    private alertCtrl: AlertController,
    private data: DataProvider,
    private auth: AuthProvider) {


  }

  /*
    - Check that user is logging or not
  */
  ngOnInit() {

    this.platform.ready().then(() => {
      this.auth.getUserData().subscribe(data => {
        if (!this.isAppInitialized) {
          this.nav.setRoot(HomePage);
          this.isAppInitialized = true;
          if (typeof data.email !== 'undefined' && data.email !== '') this.user = data;
          else this.nav.setRoot(AuthPage);
        }
      }, err => {
        this.nav.setRoot(AuthPage);
      });
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.events.subscribe('user:login', () => {
        this.auth.getUserData().subscribe(data => {
          if (typeof data.email !== 'undefined' && data.email !== '') {
            this.user = data;
            this.nav.setRoot(HomePage);
          } else {
            alert('faild');
          }
        }, err => {
          this.nav.setRoot(AuthPage);
        });
      });
    });
  }
  onPageDidEnter() {

  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);

  }
  openLogin() {
    this.nav.setRoot(LoginEmailPage);
  }
  openProfile() {
    this.nav.setRoot(ProfilePage);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Good bye',
      subTitle: 'See you in the next time',
      buttons: ['OK']
    });
    alert.present();
  }
  logout() {
    this.auth.logout();
    this.isLogged = false;
    this.events.publish('user:logout');
    this.presentAlert();
    this.nav.setRoot(AuthPage);

  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.isLogged = true;
      alert('ok');


    });

    this.events.subscribe('user:signup', () => {
      //this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.isLogged = false;
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
