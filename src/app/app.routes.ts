import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormsCmoComponent } from './pages/forms-cmo/forms-cmo.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { ThanksComponent } from './components/organisms/thanks/thanks.component';
import { InvoiceLodgingComponent } from './pages/invoice-lodging/invoice-lodging.component';
import { SendOcComponent } from './pages/send-oc/send-oc.component';
import { ValidateOcInfoComponent } from './pages/validate-oc-info/validate-oc-info.component';
import { OcInfoErrorComponent } from './pages/oc-info-error/oc-info-error.component';

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
      path: 'thanks-docs/:id',
      canActivate: [authGuard],
      component: ThanksComponent,
      data: {
          type: 'docs'
      }
    },
    {
      path: 'facturascmo',
      component: InvoiceLodgingComponent,
    },
    {
      path: 'sent-oc',
      component: SendOcComponent
    },
    {
      path: 'validate-oc',
      component: ValidateOcInfoComponent
    },
    {
      path: 'oc-error',
      component: OcInfoErrorComponent
    },
		{
			path: '**',
			component: PageNotFoundComponent
		},
];
