import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { Page404Component } from './page404/page404.component';
import { utilisateurConnecteGuard } from './services/utilisateur-connecte.guard';
import { TicketCreationComponent } from './ticket-creation/ticket-creation.component';


export const routes: Routes = [
  {
    path: 'tickets',
    component: AccueilComponent,
    canActivate: [utilisateurConnecteGuard],
  },
  {
    path: 'createtickets',
    component: TicketCreationComponent,
    canActivate: [utilisateurConnecteGuard],
  },
  { path: 'connexion', component: ConnexionComponent },
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];