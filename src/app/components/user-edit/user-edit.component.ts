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
          console.log("RESPONSE: " + response.status);
          if (response && response.status == 'success') {
            this.status = "successFoto";
            this.user.image = response.image;
            this.fileName = response.image;
            console.log("Nombre de la imagen: " + response.image);
            //localStorage.setItem('identity', JSON.stringify(this.identity));
          }
          else {
            this.status = 'errorFoto';
          }
          console.log("Respuesta: " + response.image);
        }
      );
    }
  }

  ngOnInit(): void {
    
  }

  onSubmit(form: any) {}

}
