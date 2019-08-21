import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PcsDetailComponent} from './pcs-detail/pcs-detail.component';
import {DimensionDetailComponent} from './dimension-detail/dimension-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pcs/:id', component: PcsDetailComponent },
  { path: 'pcs/:pcs_id/dimension/:dim_id', component: DimensionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
