import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PcsDetailComponent} from './pcs-detail/pcs-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pcs', component: PcsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
