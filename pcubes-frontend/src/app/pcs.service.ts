import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {PCS} from './models/pcs';
import {ObjectUnsubscribedError, Observable, Subject, throwError, of} from 'rxjs';
import {DimensionAttribute} from './models/dimension-attribute';
import {Dimension} from './models/dimension';
import {AttributeValueDate} from './dimension-detail/attribute-detail/attributeValue-date-form/attributeValue-date';
import {AttributeValueNumber} from './dimension-detail/attribute-detail/attributeValue-number-form/attributeValue-number';
import {DimensionElement} from './dimension-detail/dimension-element';
import { AttributeValueCategorical } from './dimension-detail/attribute-detail/attributeValue-categorical-form/attributeValue-categorical';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PcsService {

  public pcss: PCS[];

  constructor(private http: HttpClient,
              private toastr: ToastrService) {
    this.getAllPCS().subscribe(value => this.pcss = value);
  }

  getAllPCS(): Observable<PCS[]> {
    const observable = this.http.get<PCS[]>('/api/pcs/');
    const obSubject = new Subject<PCS[]>();
    observable.subscribe(value => {
      this.pcss = value;
      obSubject.next(value);
    });

    return obSubject.asObservable();
  }

  getPCS(id: number): Observable<PCS> {
    return this.http.get<PCS>(`/api/pcs/${id}`);
  }

  deletePCS(id: number) {
    return this.http.delete(`/api/pcs/${id}`);
  }

  createCubeStructure(name: string) {
    const observable = this.http.post<PCS>('/api/pcs/', {name});
    const obSubject = new Subject<PCS>();
    observable.subscribe(value => {
      this.pcss.push(value);
      obSubject.next(value);
    });

    return obSubject.asObservable();
  }

  addDimension(pcs: PCS, name: string): Observable<Dimension> {
    return this.http.post<Dimension>(`/api/pcs/${pcs.id}/dimensions`, new Dimension(name, []));
  }

  addAttribute(dimension: Dimension, attr: DimensionAttribute): Observable<DimensionAttribute> {
    console.log(attr);
    return this.http.post<DimensionAttribute>(`/api/dimensions/${dimension.id}/attributes/`, {name: attr.name, dtype: attr.dtype});
  }

  deleteDimension(dimension: Dimension) {
    return this.http.delete(`/api/dimensions/${dimension.id}`);
  }

  deleteAttribute(attribute: DimensionAttribute) {
    return this.http.delete(`/api/dimension_attribute/${attribute.id}/`);
  }

  getDimension(id: number) {
    return this.http.get<Dimension>(`/api/dimensions/${id}`);
  }

  addAttributeValueDate(attributeId: number, attributeValue: AttributeValueDate): Observable<AttributeValueDate> {
    return this.http.post<AttributeValueDate>(`/api/attribute_value/${attributeId}/date/`, attributeValue
    ).pipe(
      catchError(error => this.handleError(error))
    );
  }

  addAttributeValueNumber(attributeId: number, attributeValue: AttributeValueNumber): Observable<AttributeValueNumber> {
    console.log("test");
    return this.http.post<AttributeValueNumber>(`/api/attribute_value/${attributeId}/number/`,
      attributeValue
    ).pipe(
      catchError(error => this.handleError(error))
    );
  }

  addAttributeValueCategorical(attributeId: number, attributeValue: AttributeValueCategorical): Observable<AttributeValueCategorical> {
    return this.http.post<AttributeValueCategorical>(`/api/attribute_value/${attributeId}/categorical/`,
      attributeValue
    ).pipe(
      catchError(error => this.handleError(error))
    );
  }


  addDimensionElement(dimension: Dimension, values: { [attribute: number]: number; }) {
    console.log(values);
    return this.http.post<DimensionElement>(`/api/dimensions/${dimension.id}/elements`, values);
  }

  deleteDimensionElement(dimensionid: number, elementId: number) {
    return this.http.delete(`/api/dimensions/${dimensionid}/elements/${elementId}`);
  }

  private handleError<T>(error: HttpErrorResponse) {
      this.toastr.error(error.message, "Error", {timeOut: 5000});
      return throwError(
        'Something bad happened; please try again later.');
    }

}


