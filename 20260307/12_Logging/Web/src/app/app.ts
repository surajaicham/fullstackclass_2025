import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-fundamental-demo');
  isLoggedIn = false;
  currentUser: string | null = null;

  constructor(private loginService: LoginService) {
    console.log(this.loginService.loginStateSubject);
    var info = this.loginService.getCurrentUser();
    if(info && info.sub) {
      this.isLoggedIn = true;
      this.currentUser = info.username;
      this.loginService.loginStateSubject.next(true);
    }

    var token = this.loginService.loginStateSubject.subscribe((state) => {
      console.log("Login state changed: " + state);
      if (state) {
        this.isLoggedIn = true;
        this.currentUser = this.loginService.getCurrentUser()?.username || null;
      } else {
        this.isLoggedIn = false;
        this.currentUser = null;
      }
    });
  }
}
