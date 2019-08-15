import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PCS} from './models/pcs';
import {Observable, Subject} from 'rxjs';
import {DimensionAttribute} from './models/dimension-attribute';
import {Dimension} from './models/dimension';

@Injectable({
  providedIn: 'root'
})
export class PcsService {

  public pcss: PCS[];

  constructor(private http: HttpClient) {
    this.getAllPCS().subscribe(value => this.pcss = value);
  }

  getAllPCS(): Observable<PCS[]> {
    return this.http.get<PCS[]>('/api/pcs/');
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
    return this.http.post<Dimension>('/api/dimensions/', {cube: pcs.id, name});
  }

  addAttribute(dimension: Dimension, attr: DimensionAttribute): Observable<DimensionAttribute> {
    return this.http.post<DimensionAttribute>(`/api/dimensions/${dimension.id}/attributes/`, {name: attr.name, dtype: attr.dtype});
  }

  deleteDimension(dimension: Dimension) {
    return this.http.delete(`/api/dimensions/${dimension.id}`);
  }

  deleteAttribute(dimension: Dimension, attribute: DimensionAttribute) {
    return this.http.delete(`/api/dimension_attribute/${attribute.id}/`);
  }
}


