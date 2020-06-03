import { Injectable } from '@angular/core';
import { PCS } from './models/pcs';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Dimension } from './models/dimension';

@Injectable({
  providedIn: 'root'
})
export class PcubeService {

  public pcss: PCS[];

  constructor(private http: HttpClient) {
    this.getAllPCS().subscribe(value => this.pcss = value);
  }


  getAllPCS(): Observable<PCS[]> {
    const observable = this.http.get('/processCubeStructures/');
    const obSubject = new Subject<PCS[]>();
    observable.subscribe(value => {
      console.log(value);
      this.pcss = value._embedded.processCubeStructures;
      console.log(this.pcss);
      obSubject.next(this.pcss);
    });

    return obSubject.asObservable();
  }

  deletePCS(pcs: PCS) {
    return this.http.delete(pcs._links.self.href);
  }
  
  createCubeStructure(): Observable<PCS> {
    const pcs = new PCS(name, []);
    
    return this.http.post<PCS>("/processCubeStructures", pcs);
  }
  
  addDimension(pcs: PCS, name: string): Observable<PCS> {
    pcs.dimensions.push(new Dimension(name, []));

    return this.http.put<PCS>('/processCubeStructures/', pcs);
  }

  savePCS(pcs: PCS): Observable<PCS> {
    return this.http.post<PCS>("/processCubeStructures/", pcs);
  }


}
