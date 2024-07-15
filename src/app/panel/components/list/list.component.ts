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
  public status: string;

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
    this.status = '';
  }

  ngOnInit() {
    this.getTopics();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Formato de día a dos dígitos
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Formato de mes a dos dígitos
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  contiene(): boolean {
    if (this.listTopics.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  getTopics() {
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

  cerrarModal() {
    const closeButton = document.querySelector<HTMLButtonElement>('button.btn-close');
    
    // Verificar que el botón existe
    if (closeButton) {
        // Pulsar el botón programáticamente
        closeButton.click();
    } else {
        console.log('No se encontró ningún botón con la clase "btn-close".');
    }
  }

  quitarFondoNegro() {
    const backdrops = document.querySelectorAll<HTMLDivElement>('div.modal-backdrop');
    
    // Iterar sobre la lista de elementos y eliminarlos del DOM
    backdrops.forEach(backdrop => {
        if (backdrop.parentNode) {
            backdrop.parentNode.removeChild(backdrop);
        }
    });
  }

  deleteTopic(idTopic: any) {
    this._topicService.deleteTopic(this.token, idTopic).subscribe( response => {
      if (response.topic) {
        this.status = 'success';
        this.getTopics();

        this.cerrarModal();
        
      }
      else {
        this.status = 'error';
        alert('Error en el borrado');
        this.cerrarModal();
      }
    });
  }
}
