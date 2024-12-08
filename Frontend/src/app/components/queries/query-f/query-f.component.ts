import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';

// Icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-query-f',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './query-f.component.html',
  styleUrl: './query-f.component.css'
})
export class QueryFComponent {

  results: Observable<QueryFResponse>;
  sortedColumn: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  // Icons
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  constructor(private ApiService: ApiService){
    this.results = this.ApiService.QueryF();
  }

  refreshResults(){
    this.results = this.ApiService.QueryF();
  }

  // General sorting function, can sort any column based on string or number type
  sortByColumn(column: string, data: any[]) {
    if (this.sortedColumn === column) {
      // Toggle sorting order if same column is clicked again
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Sort by the selected column in ascending order by default
      this.sortedColumn = column;
      this.sortOrder = 'asc';
    }

    // Sort the data based on column and sort order
    data.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      // Check if the column values are numbers or strings and compare accordingly
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      } else if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return 0;
    });
  }

}


interface QueryFResponse {
  results: Array<{
    SONG_NAME: string;
    ARTIST_NAME: string;
    ENERGY: number;
    DANCEABILITY: number;
    POPULARITY: number;
  }>;
}
