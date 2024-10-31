import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-creation',
  standalone: true,
  templateUrl: './ticket-creation.component.html',
  styleUrls: ['./ticket-creation.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class TicketCreationComponent {
  
  description: string = '';
  priority: string = 'Normal';
  assignedTo: number | null = null; 
  priorities = ['Faible', 'Normal', 'Élevé'];
  users: { id: number, name: string }[] = [];  

  constructor(private http: HttpClient, private router: Router) {
    this.loadUsers();  
  }

  loadUsers() {
    this.http.get<{ id: number, name: string }[]>('http://localhost:3000/users', 
    )
    .subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs', error);
      }
    });
  }

  createticket() {
    const ticketData = {
      description: this.description,
      priority: this.priority,
      assignedTo: this.assignedTo  
    };

    this.http.post('http://localhost:3000/createtickets', ticketData)
    .subscribe({
      next: (response) => {
        console.log('Ticket créé');
        this.router.navigate(['/tickets']);
      },
      error: (error) => {
        console.error('Erreur lors de la création du ticket', error);
      }
    });
  }
}
