import { Routes } from '@angular/router';
import { AppConfig } from './config/app.config';
import { ProjectListComponent } from './project-list/project-list.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { Error404Component } from './error-404/error-404.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'contact', component: ContactComponent },
    { path: AppConfig.routes.projects, component: ProjectListComponent, title: "My Projects" },
    { 
      path: 'projects/:id', 
      component: ProjectDetailComponent, 
      canActivate: [AuthGuard],
      pathMatch: 'full', 
      title: "Project Detail"
    },
    { path: AppConfig.routes.error404, component: Error404Component },
    { path: '**', redirectTo: '/' + AppConfig.routes.error404 }
];