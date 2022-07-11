import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TokenStorageService } from './_services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit{
  private role: number;
  public isLoggedIn = false;
  username: string;

  selectedLanguage: string;
  languages: {id: string, title: string}[] = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tokenStorageService: TokenStorageService,
    private translateService: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.tokenStorageService.getToken() != null;

    let locale = window.sessionStorage.getItem('LOCALE');

    if(!locale){
      locale = environment.defaultLocale;
    }

    this.translateService.use(locale);
    this.selectedLanguage = locale;

    this.translateService.get(environment.locales.map(x => `LANGUAGES.${x.toUpperCase()}`))
      .subscribe(translations => {
        this.languages = environment.locales.map(x => {
          return {
            id: x,
            title: translations[`LANGUAGES.${x.toUpperCase()}`],
          };
        });
      });

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      console.log(user);
      this.role = user.roleId;
      this.username = user.email;
    }
  }

  changeLocale() {
    window.sessionStorage.setItem('LOCALE', this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  public isChainAdmin(): boolean{
    return this.role === 1;
  }

  public isRestaurantAdmin(): boolean{
    console.log(this.role);
    return this.role=== 2;
  }

  public isChef(): boolean{
    return this.role === 3;
  }
}
