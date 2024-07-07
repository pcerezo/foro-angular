import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { global } from './services/global';
import { PanelComponent } from './panel/panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent, LoginComponent, RouterLink, HttpClientModule, UserEditComponent, PanelComponent],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, DoCheck{
  title = 'foro-angular';
  public identity: any;
  public token: any;
  public url: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }
  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log(this.identity);
    console.log(this.token);
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this.token = null;

    this._router.navigate(['/inicio']);
  }
}
