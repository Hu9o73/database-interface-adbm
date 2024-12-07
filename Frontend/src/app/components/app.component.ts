import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

// Bootstrap imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';

// Icons imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink, RouterOutlet, 
    CommonModule, 
    FontAwesomeModule,
    NgbModule,
    NgbDropdown, NgbDropdownMenu, NgbDropdownToggle
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title= 'app';
  liveData: any;
  jsonData: any;

  // Icons
  faHome = faHome;

  constructor(){}

}
