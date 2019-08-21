import {Component, Input, OnInit} from '@angular/core';
import {DimensionAttribute} from '../../../models/dimension-attribute';

@Component({
  selector: 'app-vgroup-categorical-form',
  templateUrl: './vgroup-categorical-form.component.html',
  styleUrls: ['./vgroup-categorical-form.component.scss']
})
export class VgroupCategoricalFormComponent implements OnInit {

  @Input()
  attribute: DimensionAttribute;

  constructor() { }

  ngOnInit() {
  }

}
