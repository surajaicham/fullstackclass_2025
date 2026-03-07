import { Routes } from '@angular/router';
import { LoginDemoComponent } from './login/login.component';
import { ActorComponent } from './actor/actor.component';
import { ActorDetailComponent } from './actor/actor-detail.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginDemoComponent },
  { path: 'actor', component: ActorComponent, canActivate: [authGuard] },
  { path: 'actor-detail', component: ActorDetailComponent, canActivate: [authGuard] },
  { path: 'actor-detail/:id', component: ActorDetailComponent, canActivate: [authGuard] },
  // {
  //   path: 'routing',
  //   component: RoutingDemoComponent,
  //   children: routingDemoRoutes,
  // },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
