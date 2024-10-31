import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';  

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  tickets: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.http.get<any[]>('http://localhost:3000/tickets')  
      .subscribe(
        (data) => {
          this.tickets = data;
        },
        (error) => {
          console.error('Error fetching tickets:', error);
        }
      );
  }

}
