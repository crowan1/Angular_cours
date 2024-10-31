import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  

interface Utilisateur {
  id: number;  
  email: string;
  isBlocked: boolean;
}

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {
  utilisateurs: Utilisateur[] = [];
  http: HttpClient = inject(HttpClient);

  ngOnInit() {
    this.fetchUtilisateurs();
  }

  fetchUtilisateurs() {
    this.http
      .get<Utilisateur[]>('http://localhost:3000/administration')
      .subscribe({
        next: (utilisateurs: Utilisateur[]) => {
          this.utilisateurs = utilisateurs;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des utilisateurs:', err);
        }
      });
  }

  toggleBlockUser(userId: number, isBlocked: boolean) {
    const newStatus = isBlocked ? 0 : 1;  
    this.http
      .put(`http://localhost:3000/administration/${userId}`, { isBlocked: newStatus })  
      .subscribe({
        next: () => {
          this.fetchUtilisateurs();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du statut de l\'utilisateur:', err);
        }
      });
  }

  trackByFn(index: number, item: Utilisateur) {
    return item.id;
  }
}
