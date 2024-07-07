import { Routes } from "@angular/router";
import { MainComponent } from "./components/main/main.component";
import { ListComponent } from "./components/list/list.component";
import { AddComponent } from "./components/add/add.component";
import { EditComponent } from "./components/edit/edit.component";

export const panelRoutes: Routes = [
    {path: 'panel', component: MainComponent}, 
        //children: [
           // {path: '', component: ListComponent},
            {path: 'panel/listado', component: ListComponent},
            {path: 'panel/crear', component: AddComponent},
            {path: 'panel/editar/:id', component: EditComponent}
        //]
    //}
];