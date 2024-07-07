import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Topic } from '../../../models/topic';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  providers: [UserService]
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
    private _userService: UserService
  ) {
    this.page_title = "Crear nuevo tema";
    this.identity = this._userService.getIdentity();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
  }

  ngOnInit() {}

  onSubmit(form: any) {
    console.log(this.topic);
  }
}
