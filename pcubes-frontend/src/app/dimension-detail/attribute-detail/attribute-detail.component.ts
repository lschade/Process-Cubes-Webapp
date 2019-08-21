import {Component, Input, OnInit} from '@angular/core';
import {DimensionAttribute} from '../../models/dimension-attribute';

@Component({
  selector: 'app-attribute-detail',
  templateUrl: './attribute-detail.component.html',
  styleUrls: ['./attribute-detail.component.scss']
})
export class AttributeDetailComponent implements OnInit {

  @Input()
  attribute: DimensionAttribute;

  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}
