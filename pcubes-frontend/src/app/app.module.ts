import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { PcsCardComponent } from './components/pcs-card/pcs-card.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PcsDetailComponent } from './pcs-detail/pcs-detail.component';
import { PcsFormComponent } from './components/forms/pcs-form/pcs-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PcsCardComponent,
    PcsDetailComponent,
    PcsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
