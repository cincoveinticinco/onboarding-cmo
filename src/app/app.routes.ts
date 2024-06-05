import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormsCmoComponent } from './pages/forms-cmo/forms-cmo.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'home/:id',
        component: HomeComponent
    },
    {
      path: 'complete-form/:id',
      canActivate: [authGuard],
      component: FormsCmoComponent
    },
		{
			path: '**',
			component: PageNotFoundComponent
		}
];
