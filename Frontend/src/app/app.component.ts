import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  liveData: any;
  jsonData: any;

  constructor(private apiService: ApiService){}


  ngOnInit(){
    this.apiService.isAppLive().subscribe((response) => {
      this.liveData=response;
      console.log(this.liveData);
    })
  }

  testQueryOnComponent(){
    this.apiService.testQuery().subscribe((response) => {
      this.jsonData = response;
    });
  }
}
