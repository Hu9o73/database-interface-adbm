import { Routes } from '@angular/router';

// Components imports

// Basic and utility components
import { HomeComponent } from '../components/home/home.component';
import { NotYetImplementedComponent } from '../components/not-yet-implemented/not-yet-implemented.component';

// Queries
import { QueryAComponent } from '../components/queries/query-a/query-a.component';
import { QueryBComponent } from '../components/queries/query-b/query-b.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path:'nye', component: NotYetImplementedComponent},
    {path:'queryA', component: QueryAComponent},
    {path:'queryB', component: QueryBComponent}
];
