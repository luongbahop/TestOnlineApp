//import library
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler,LoadingController, } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCZZGVdty7x_zgzsDcDsdnAYjAmGAqC23E",
  authDomain: "luongbahop1993.firebaseapp.com",
  databaseURL: "https://luongbahop1993.firebaseio.com",
  projectId: "luongbahop1993",
  storageBucket: "luongbahop1993.appspot.com",
  messagingSenderId: "250214590235"
};

// Providers
import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

//import pages
import { MyApp } from './app.component';

import { AuthPage } from '../pages/auth/home/home';
import { ForgotPasswordPage } from '../pages/auth/forgot-password/forgot-password';
import { LoginEmailPage } from '../pages/auth/login-email/login-email';
import { SignUpPage } from '../pages/auth/sign-up/sign-up';

import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ProfilePage } from '../pages/profile/profile';
import { DetailPage } from '../pages/detail/detail';
import { FilterPage } from '../pages/filter/filter';

@NgModule({
  declarations: [
    MyApp,
    ForgotPasswordPage,
    AuthPage,
    LoginEmailPage,
    SignUpPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TutorialPage,
    ProfilePage,
    DetailPage,
    FilterPage,
    TermsOfServicePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ForgotPasswordPage,
    AuthPage,
    LoginEmailPage,
    SignUpPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TutorialPage,
    ProfilePage,
    DetailPage,
    FilterPage,
    TermsOfServicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler , useClass: IonicErrorHandler},
    DataProvider, 
    AuthProvider,
  ]
})
export class AppModule {}
