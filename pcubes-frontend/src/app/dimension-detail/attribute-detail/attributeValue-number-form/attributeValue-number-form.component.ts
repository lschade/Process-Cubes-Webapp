import {Component, Input, OnInit} from '@angular/core';
import {DimensionAttribute} from '../../../models/dimension-attribute';
import {PcsService} from '../../../pcs.service';
import {AttributeValueNumber} from './attributeValue-number';

@Component({
  selector: 'app-attributeValue-number-form',
  templateUrl: './attributeValue-number-form.component.html',
  styleUrls: ['./attributeValue-number-form.component.scss']
})
export class AttributeValueNumberFormComponent implements OnInit {

  @Input()
  attribute: DimensionAttribute;

  upper: number;
  lower: number;

  constructor(private pcsService: PcsService) {
  }

  ngOnInit() {
  }

  submit() {
    const attributeValue = new AttributeValueNumber(this.lower, this.upper);
    this.pcsService.addAttributeValueNumber(this.attribute.id, attributeValue).subscribe(value => {
      this.attribute.values.push(value);
    }, error => {
      console.log(error);
    });
  }

}
