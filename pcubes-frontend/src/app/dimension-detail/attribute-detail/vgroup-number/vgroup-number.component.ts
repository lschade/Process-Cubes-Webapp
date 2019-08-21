import {Component, Input, OnInit} from '@angular/core';
import {VgroupNumber} from '../vgroup-number-form/vgroup-number';

@Component({
  selector: 'app-vgroup-number',
  templateUrl: './vgroup-number.component.html',
  styleUrls: ['./vgroup-number.component.scss']
})
export class VgroupNumberComponent implements OnInit {

  @Input()
  value: VgroupNumber;

  constructor() {
  }

  ngOnInit() {
  }

}
