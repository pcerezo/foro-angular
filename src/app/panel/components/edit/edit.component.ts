import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Topic } from '../../../models/topic';
import { FormsModule } from '@angular/forms';
import { param } from 'jquery';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: '../add/add.component.html',
  styleUrl: '../add/add.component.css',
  providers: [UserService, TopicService]
})
export class EditComponent {
  public page_title: any;
  public topic: any;
  public identity: any;
  public token: any;
  public status: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = "Editar tema";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
  }

  ngOnInit() {
    this.getTopic();
  }

  getTopic() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._topicService.getTopic(id).subscribe(response => {
        if (response.topic){
          this.topic = response.topic;
        }
        else {
          this._router.navigate(['/panel']);
        }
      },
      error => {
        console.log(error);
        this._router.navigate(['/panel']);
      });
    });
  }

  onSubmit(form: any) {
    console.log(this.topic);
    this._topicService.editTopic(this.token, this.topic).subscribe(
      response => {
        if (response.topic) {
          this.status = 'success';
          this.topic = response.topic;
          this._router.navigate(['/panel']);
        }
        else {
          this.status = 'error';
        }
      }
    );
  }
}
