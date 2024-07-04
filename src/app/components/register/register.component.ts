import { Component } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [UserService]
})
export class RegisterComponent {
  public page_title: string;
  public user: User;
  public status: string;

  constructor(private _userService: UserService) {
    this.page_title = 'Regístrate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
    this.status = '';
  }

  ngOnInit() {
    console.log(this._userService.prueba());
  }

  onSubmit(form: any) {
    console.log('User: ' + this.user);
    this._userService.register(this.user).subscribe(response => {
      if (response.user && response.user._id) {
        this.status = 'success';
        form.reset();
      }
      else {
        this.status = 'error';
      }
      console.log(this.status);
    });
  }
}
