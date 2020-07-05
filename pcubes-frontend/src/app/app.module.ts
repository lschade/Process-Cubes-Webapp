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
import {AttributeValueNumberFormComponent} from './dimension-detail/attribute-detail/attributeValue-number-form/attributeValue-number-form.component';
import {AttributeValueDateFormComponent} from './dimension-detail/attribute-detail/attributeValue-date-form/attributeValue-date-form.component';
import {AttributeValueCategoricalFormComponent} from './dimension-detail/attribute-detail/attributeValue-categorical-form/attributeValue-categorical-form.component';
import {AttributeValueDateComponent} from './dimension-detail/attribute-detail/attributeValue-date/attributeValue-date.component';
import { AttributeValueNumberComponent } from './dimension-detail/attribute-detail/attributeValue-number/attributeValue-number.component';
import { FileUploadFormComponent } from './components/forms/file-upload-form/file-upload-form.component';
import { DimensionElementComponent } from './dimension-detail/dimension-element/dimension-element.component';
import { AttributeValueCategoricalComponent } from './dimension-detail/attribute-detail/attributeValue-categorical/attributeValue-categorical.component';
import { ToastrModule } from 'ngx-toastr';

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
    AttributeValueNumberFormComponent,
    AttributeValueDateFormComponent,
    AttributeValueCategoricalFormComponent,
    AttributeValueDateFormComponent,
    AttributeValueDateComponent,
    AttributeValueNumberComponent,
    FileUploadFormComponent,
    DimensionElementComponent,
    AttributeValueCategoricalComponent
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
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
