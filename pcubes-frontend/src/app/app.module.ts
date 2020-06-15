import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';

import {HomeComponent} from './home/home.component';
import {PcsCardComponent} from './components/pcs-card/pcs-card.component';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PcsDetailComponent} from './pcs-detail/pcs-detail.component';
import {PcsFormComponent} from './components/forms/pcs-form/pcs-form.component';
import {DimensionComponent} from './components/dimension/dimension.component';
import {AttributeComponent} from './components/attribute/attribute.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {DimensionDetailComponent} from './dimension-detail/dimension-detail.component';
import {AttributesListComponent} from './components/attributes-list/attributes-list.component';
import {AttributeDetailComponent} from './dimension-detail/attribute-detail/attribute-detail.component';
import {AttributeFormComponent} from './components/attribute-form/attribute-form.component';
import {VgroupNumberFormComponent} from './dimension-detail/attribute-detail/vgroup-number-form/vgroup-number-form.component';
import {VgroupDateFormComponent} from './dimension-detail/attribute-detail/vgroup-date-form/vgroup-date-form.component';
import {VgroupCategoricalFormComponent} from './dimension-detail/attribute-detail/vgroup-categorical-form/vgroup-categorical-form.component';
import {VgroupDateComponent} from './dimension-detail/attribute-detail/vgroup-date/vgroup-date.component';
import { VgroupNumberComponent } from './dimension-detail/attribute-detail/vgroup-number/vgroup-number.component';
import { FileUploadFormComponent } from './components/forms/file-upload-form/file-upload-form.component';
import { DimensionElementComponent } from './dimension-detail/dimension-element/dimension-element.component';
import { VgroupCategoricalComponent } from './dimension-detail/attribute-detail/vgroup-categorical/vgroup-categorical.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PcsCardComponent,
    PcsDetailComponent,
    PcsFormComponent,
    DimensionComponent,
    AttributeComponent,
    NavbarComponent,
    DimensionDetailComponent,
    AttributesListComponent,
    AttributeDetailComponent,
    AttributeFormComponent,
    VgroupNumberFormComponent,
    VgroupDateFormComponent,
    VgroupCategoricalFormComponent,
    VgroupDateFormComponent,
    VgroupDateComponent,
    VgroupNumberComponent,
    FileUploadFormComponent,
    DimensionElementComponent,
    VgroupCategoricalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
