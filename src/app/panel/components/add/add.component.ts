import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Topic } from '../../../models/topic';
import { FormsModule } from '@angular/forms';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  providers: [UserService, TopicService]
})
export class AddComponent {
  public page_title: any;
  public topic: any;
  public identity: any;
  public token: any;
  public status: any

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = "Crear nuevo tema";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
  }

  ngOnInit() {
    console.log(this._topicService.prueba());
  }

  onSubmit(form: any) {
    console.log(this.topic);
    this._topicService.addTopic(this.token, this.topic).subscribe(
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
