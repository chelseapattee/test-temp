import { Routes } from '@angular/router';
import { AppConfig } from './config/app.config';
import { ProjectListComponent } from './project-list/project-list.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { Error404Component } from './error-404/error-404.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    //{path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: AppConfig.routes.projects, component: ProjectListComponent, title: "My Projects"},
    {path: 'projects/:id', component: ProjectDetailComponent, pathMatch: 'full', title: "Project Detail"},
    {path: AppConfig.routes.error404, component: Error404Component},
    // otherwise redirect to 404
    {path: '**', redirectTo: '/' + AppConfig.routes.error404}
];
