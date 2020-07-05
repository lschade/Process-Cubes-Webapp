import {Component, Input, OnInit} from '@angular/core';
import {AttributeValueDate} from '../attributeValue-date-form/attributeValue-date';

@Component({
  selector: 'app-attributeValue-date',
  templateUrl: './attributeValue-date.component.html',
  styleUrls: ['./attributeValue-date.component.scss']
})
export class AttributeValueDateComponent implements OnInit {

  @Input()
  value: AttributeValueDate;

  constructor() { }

  ngOnInit() {
    this.value.startDate = new Date(this.value.startDate);
    this.value.endDate = new Date(this.value.endDate);
  }

}
