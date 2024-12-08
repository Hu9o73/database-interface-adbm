import { Routes } from '@angular/router';

// Components imports

// Basic and utility components
import { HomeComponent } from '../components/home/home.component';
import { NotYetImplementedComponent } from '../components/not-yet-implemented/not-yet-implemented.component';

// Queries
import { QueryAComponent } from '../components/query-a/query-a.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path:'queryA', component: QueryAComponent},
    {path:'nye', component: NotYetImplementedComponent}
];
