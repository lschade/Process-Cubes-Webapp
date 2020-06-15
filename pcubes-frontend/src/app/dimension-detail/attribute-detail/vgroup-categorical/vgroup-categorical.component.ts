import { Component, OnInit, Input } from '@angular/core';
import { VgroupCategorical } from '../vgroup-categorical-form/vgroup-categorical';

@Component({
  selector: 'app-vgroup-categorical',
  templateUrl: './vgroup-categorical.component.html',
  styleUrls: ['./vgroup-categorical.component.scss']
})
export class VgroupCategoricalComponent implements OnInit {

  @Input()
  public value: VgroupCategorical

  constructor() { }

  ngOnInit() {
  }

}
