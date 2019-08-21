import {Component, Input, OnInit} from '@angular/core';
import {VgroupDate} from '../vgroup-date-form/vgroup-date';

@Component({
  selector: 'app-vgroup-date',
  templateUrl: './vgroup-date.component.html',
  styleUrls: ['./vgroup-date.component.scss']
})
export class VgroupDateComponent implements OnInit {

  @Input()
  value: VgroupDate;

  constructor() { }

  ngOnInit() {
    this.value.start = new Date(this.value.start);
    this.value.end = new Date(this.value.end);
  }

}
