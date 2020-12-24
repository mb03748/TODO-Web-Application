import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { SignComponent } from './sign/sign.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccountComponent } from './account/account.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  { path: 'history', canActivate:[AuthGuardService], component: HistoryComponent},
  { path: 'home', canActivate:[AuthGuardService], component: HomeComponent},
  { path: 'login', component: SignComponent},
  { path: 'signup', component: RegisterComponent},
  { path: 'account', canActivate:[AuthGuardService], component: AccountComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'details/:id/:num', canActivate:[AuthGuardService], component: DetailsComponent},
  { path: 'page-not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
