import { Component, OnInit, Input } from '@angular/core';
import { AttributeValueCategorical } from '../attributeValue-categorical-form/attributeValue-categorical';

@Component({
  selector: 'app-attributeValue-categorical',
  templateUrl: './attributeValue-categorical.component.html',
  styleUrls: ['./attributeValue-categorical.component.scss']
})
export class AttributeValueCategoricalComponent implements OnInit {

  @Input()
  public value: AttributeValueCategorical

  constructor() { }

  ngOnInit() {
  }

}
