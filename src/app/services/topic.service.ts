import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { global } from "./global";
import { Observable } from "rxjs";

@Injectable()
export class TopicService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    prueba() {
        return "TopicService";
    }

    addTopic(token: any, topic: any): Observable<any> {
        let params = JSON.stringify(topic);
        console.log("params: " + params);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this._http.post(this.url + 'topic/save', params, {headers: headers});
    }

    editTopic(token: any, topic: any): Observable<any> {
        let params = JSON.stringify(topic);
        console.log("params: " + params);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this._http.put(this.url + 'topic/' + topic._id, params, {headers: headers});
    }

    getTopics(token: any, user_id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this._http.get(this.url + 'topic/user-topics/' + user_id, {headers: headers});
    }

    getTopic(topic_id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'topic/' + topic_id, {headers: headers});
    }

    deleteTopic(token: any, topic_id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this._http.delete(this.url + 'topic/' + topic_id, {headers: headers});
    }
}