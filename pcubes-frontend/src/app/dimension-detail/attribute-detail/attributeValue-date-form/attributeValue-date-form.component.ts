import {Component, Input, OnInit} from '@angular/core';
import {DimensionAttribute} from '../../../models/dimension-attribute';
import {AttributeValueDate} from './attributeValue-date';
import {PcsService} from '../../../pcs.service';

@Component({
  selector: 'app-attributeValue-date-form',
  templateUrl: './attributeValue-date-form.component.html',
  styleUrls: ['./attributeValue-date-form.component.scss']
})
export class AttributeValueDateFormComponent implements OnInit {

  @Input()
  attribute: DimensionAttribute;

  dateStart: Date;
  dateEnd: Date;

  constructor(private pcsService: PcsService) {
  }

  ngOnInit() {
  }

  submit() {
    const attributeValueDate = new AttributeValueDate(this.dateStart, this.dateEnd);
    this.pcsService.addAttributeValueDate(this.attribute.id, attributeValueDate).subscribe(value => {
      this.attribute.values.push(value);
    });
  }
}
