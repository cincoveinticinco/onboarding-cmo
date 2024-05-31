import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormsCmoComponent } from './pages/forms-cmo/forms-cmo.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
			path: 'home',
			component: HomeComponent
    },
    {
			path: 'form',
			component: FormsCmoComponent,
    },
		{
			path: '**',
			component: PageNotFoundComponent
		}
];
