import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { Topic } from '../../../models/topic';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers: [UserService, TopicService]
})
export class ListComponent {
  public page_title: string;
  public identity: any;
  public token: any;
  public topic: any;
  public listTopics: any = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = "Mis temas";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
  }

  ngOnInit() {
    this._topicService.getTopics(this.token, this.identity._id).subscribe(response => {
      if (response.topics) {
        this.listTopics = response.topics;
        
        for (let index = 0; index < this.listTopics.length; index++) {
          const element = this.listTopics[index];
          element.date = this.formatDate(element.date);
        }
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Formato de día a dos dígitos
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Formato de mes a dos dígitos
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
