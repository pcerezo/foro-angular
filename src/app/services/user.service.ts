import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";

@Injectable()
export class UserService {
    public url: string;
    public identity: any;
    public token: any;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

    prueba() {
        return "User service";
    }

    register(user: any): Observable<any> {
        // Convertir el objeto del usuario en JSON string
        let params = JSON.stringify(user);

        // Definir las cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // Hacer peticion ajax
        return this._http.post(this.url + 'register', params, {headers: headers});
    }

    signup(user: any, gettoken: any = null): Observable<any> {
        // Comprobar si llega el gettoken
        if (gettoken != null) {
          user.gettoken = 'true';
        }
    
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
        return this._http.post(this.url + 'login', params, {headers: headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity')!);
    
        if (identity) {
          this.identity = identity;
        }
        else {
          this.identity = null;
        }
    
        return this.identity;
    }
    
    getToken(){
        let token = localStorage.getItem('token');
    
        if (token) {
          this.token = token;
        }
        else {
          this.token = null;
        }
    
        return this.token;
    }

    uploadUserImage(file: File, filename: string, token: string): Observable<any> {
      let headers = new HttpHeaders().set('Authorization', token);
      const formData = new FormData();

      formData.append("file0", file, filename);
      console.log("Filename: " + filename);

      return this._http.post(this.url + "upload-avatar", formData, {headers: headers});
    }
}