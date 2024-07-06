import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
  providers: [UserService],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit{
  public page_title;
  public status;
  public user: User;
  public identity: User;
  public token: any;
  public afuConfig: any;
  public url: string;
  public selectedFile: any;
  public fileName: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Ajustes de usuario';
    this.status = '';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;
    this.fileName = "";
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const timestamp = new Date().getTime();
      this.fileName = `${timestamp}_${this.selectedFile.name}`;
    }
    console.log(event.target.files[0]);
    console.log("selectedFile: " + this.selectedFile);
  }

  uploadAvatar() {
    if (!this.selectedFile) {
      return;
    }

    if (this.selectedFile) {
      this._userService.uploadUserImage(this.selectedFile, this.fileName, this.token).subscribe(
        response => {
          console.log("RESPONSE: " + response.message);
          if (response) {
            this.status = "successFoto";
            this.user.image = response.file_name;
            this.identity.image = response.file_name;
            this.fileName = response.file_name;
            localStorage.setItem('identity', JSON.stringify(this.identity))
            console.log("Nombre de la imagen: " + response.file_name);
            //localStorage.setItem('identity', JSON.stringify(this.identity));
          }
          else {
            this.status = 'errorFoto';
            console.log('Error foto');
          }
          console.log("Respuesta: " + response.file_name);
        }
      );
    }
  }

  ngOnInit(): void {
    
  }

  onSubmit(form: any) {
    this._userService.update(this.user).subscribe(
      response => {
        if (response) {
          this.status = response.status;
          if (this.status == 'success') {
            this.user = response.user;
            localStorage.setItem('identity', JSON.stringify(this.user));
          }
        }
        else {
          this.status = 'error';
        }
      }
    );
  }

}
