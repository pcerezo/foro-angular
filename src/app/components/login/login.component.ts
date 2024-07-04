import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { error } from 'jquery';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService]
})
export class LoginComponent {
  public page_title: string;
  public user: User;
  public status: string;
  public identity: User | null;
  public token: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Inicia sesión';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
    this.identity = new User('', '', '', '', '', '', 'ROLE_USER');
    this.status = '';
  }

  ngOnInit() {}

  onSubmit(form: any) {
    console.log(this.user);
    this._userService.signup(this.user).subscribe( response => {
      if (response.usuario) {
        // Se guarda el usuario identificado
        this.identity = response.usuario;
        console.log("Identity: ", this.identity);
        localStorage.setItem('identity', JSON.stringify(this.identity));

        // Obtener el token del usuario identificado
        
        this._userService.signup(this.user, 'true').subscribe( response2 => {
          if (response2.token) {
            this.token = response2.token;
            localStorage.setItem('token', this.token);
            this.status = 'success';
            this._router.navigate(['/inicio']);
          }
          else {
            this.status = 'error';
            console.log("error");
          }

          form.reset();
        });
      }
      else {
        this.status = 'error';
        console.log("error, response: " + response.user);
        form.reset();
      }
    },
    error => {
      this.status = 'error';
      console.log("error: ", error);
      form.reset();
    });
  }
}
