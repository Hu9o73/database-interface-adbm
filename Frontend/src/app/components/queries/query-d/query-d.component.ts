import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';

// Icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-query-d',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './query-d.component.html',
  styleUrl: './query-d.component.css'
})
export class QueryDComponent {

  results: Observable<QueryDResponse>;
  sortedColumn: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  // Icons
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  constructor(private ApiService: ApiService){
    this.results = this.ApiService.QueryD();
  }

  refreshResults(){
    this.results = this.ApiService.QueryD();
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


interface QueryDResponse {
  results: Array<{
    ARTIST_NAME: string;
    TOTAL_SONGS: number;
    AVG_POPULARITY: number;
    AVG_DANCEABILITY: number;
    AVG_ENERGY: number;
    AVG_VALENCE: number;
    TOP_SONG_POPULARITY: number;
    LOWEST_SONG_POPULARITY: number;
  }>;
}
