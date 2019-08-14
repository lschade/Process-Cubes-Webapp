import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PCS} from './models/pcs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCubeStructures() {
    return this.http.get<PCS[]>('/api/pcs');
  }

  createCubeStructure(name: string) {
    return this.http.post('/api/pcs/', {name});
  }
}
