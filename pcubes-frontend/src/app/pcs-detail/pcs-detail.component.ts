import {Component, Input, OnInit} from '@angular/core';
import {PCS} from '../models/pcs';

@Component({
  selector: 'app-pcs-detail',
  templateUrl: './pcs-detail.component.html',
  styleUrls: ['./pcs-detail.component.scss']
})
export class PcsDetailComponent implements OnInit {

  @Input()
  pcs: PCS;

  constructor() { }

  ngOnInit() {

  }

}
