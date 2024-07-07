import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, HttpClientModule, RouterModule],
    providers: [],
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.css'
})

export class PanelComponent { }