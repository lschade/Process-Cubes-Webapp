import {Component, Input, OnInit} from '@angular/core';
import {Dimension} from '../../models/dimension';

@Component({
  selector: 'app-dimension-element',
  templateUrl: './dimension-element.component.html',
  styleUrls: ['./dimension-element.component.scss']
})
export class DimensionElementComponent implements OnInit {

  @Input()
  dimension: Dimension;

  constructor() { }

  ngOnInit() {
  }

}
