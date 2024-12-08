import { Routes } from '@angular/router';

// Components imports

// Basic and utility components
import { HomeComponent } from '../components/home/home.component';
import { NotYetImplementedComponent } from '../components/not-yet-implemented/not-yet-implemented.component';

// Queries
import { QueryAComponent } from '../components/queries/query-a/query-a.component';
import { QueryBComponent } from '../components/queries/query-b/query-b.component';
import { QueryCComponent } from '../components/queries/query-c/query-c.component';
import { QueryDComponent } from '../components/queries/query-d/query-d.component';
import { QueryEComponent } from '../components/queries/query-e/query-e.component';
import { QueryFComponent } from '../components/queries/query-f/query-f.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path:'nye', component: NotYetImplementedComponent},
    {path:'queryA', component: QueryAComponent},
    {path:'queryB', component: QueryBComponent},
    {path:'queryC', component: QueryCComponent},
    {path:'queryD', component: QueryDComponent},
    {path:'queryE', component: QueryEComponent},
    {path:'queryF', component: QueryFComponent}
];
