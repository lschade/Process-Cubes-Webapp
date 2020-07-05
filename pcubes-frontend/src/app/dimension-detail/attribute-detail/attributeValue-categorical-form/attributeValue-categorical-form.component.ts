import {Component, Input, OnInit} from '@angular/core';
import {DimensionAttribute} from '../../../models/dimension-attribute';
import { PcsService } from 'src/app/pcs.service';
import { AttributeValueCategorical } from './attributeValue-categorical';

@Component({
  selector: 'app-attributeValue-categorical-form',
  templateUrl: './attributeValue-categorical-form.component.html',
  styleUrls: ['./attributeValue-categorical-form.component.scss']
})
export class AttributeValueCategoricalFormComponent implements OnInit {

  @Input()
  attribute: DimensionAttribute;

  values: string;

  constructor(private pcsService: PcsService) { }

  ngOnInit() {
  }

  submit() {
    const values = this.values.split(",").map(v => v.trim());

    this.pcsService.addAttributeValueCategorical(
      this.attribute.id, new AttributeValueCategorical(values))
      .subscribe(value => {
        this.attribute.values.push(value);
        this.values = "";
      }, error => {
        console.log(error);
      });
  }

}
