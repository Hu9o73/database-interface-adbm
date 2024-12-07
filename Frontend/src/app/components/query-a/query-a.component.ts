import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-query-a',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query-a.component.html',
  styleUrl: './query-a.component.css'
})
export class QueryAComponent {

  results: Observable<QueryAResponse>;

  constructor(private ApiService: ApiService){
    this.results = this.ApiService.QueryA();
  }

  refreshResults(){
    this.results = this.ApiService.QueryA();
  }

}


interface QueryAResponse {
  results: Array<{
    ARTIST_NAME: string;
    SONG_NAME: string;
    POPULARITY: number;
    DANCEABILITY: number;
    ENERGY: number;
    VALENCE: number;
    POPULARITY_RANK: number;
  }>;
}
