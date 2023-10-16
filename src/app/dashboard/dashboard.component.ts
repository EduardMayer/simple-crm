import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service'; // Passe den Pfad entsprechend an

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: any;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData().subscribe((response) => {
      this.data = response; // Die empfangenen Daten in data speichern
      console.log('Empfangene Daten:', this.data);
    });
  }
}