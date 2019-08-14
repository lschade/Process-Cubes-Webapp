import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {PCS} from '../models/pcs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pcss: PCS[];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getCubeStructures().subscribe(data => {
      this.pcss = data;
      console.log(this.pcss);
    });
  }

}
