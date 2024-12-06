import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  data: any;

  constructor(private apiService: ApiService){}


  ngOnInit(){
    this.apiService.isAppLive().subscribe((response) => {
      this.data=response;
      console.log(this.data)
    })
  }
}
