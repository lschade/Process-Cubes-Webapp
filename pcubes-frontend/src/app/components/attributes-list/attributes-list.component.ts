import {Component, Input, OnInit} from '@angular/core';
import {Dimension} from '../../models/dimension';
import {PCS} from '../../models/pcs';

@Component({
  selector: 'app-attributes-list',
  templateUrl: './attributes-list.component.html',
  styleUrls: ['./attributes-list.component.scss']
})
export class AttributesListComponent implements OnInit {

  @Input()
  dimension: Dimension;

  @Input()
  pcs: PCS;

  constructor() {
  }

  ngOnInit() {
  }



}
