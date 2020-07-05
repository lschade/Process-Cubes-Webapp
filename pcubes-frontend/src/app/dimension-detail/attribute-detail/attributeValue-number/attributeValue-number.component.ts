import {Component, Input, OnInit} from '@angular/core';
import {AttributeValueNumber} from '../attributeValue-number-form/attributeValue-number';

@Component({
  selector: 'app-attributeValue-number',
  templateUrl: './attributeValue-number.component.html',
  styleUrls: ['./attributeValue-number.component.scss']
})
export class AttributeValueNumberComponent implements OnInit {

  @Input()
  value: AttributeValueNumber;

  constructor() {
  }

  ngOnInit() {
  }

}
