import {Component, Input, OnInit} from '@angular/core';
import {DimensionAttribute} from '../../../models/dimension-attribute';
import { PcsService } from 'src/app/pcs.service';
import { VgroupCategorical } from './vgroup-categorical';

@Component({
  selector: 'app-vgroup-categorical-form',
  templateUrl: './vgroup-categorical-form.component.html',
  styleUrls: ['./vgroup-categorical-form.component.scss']
})
export class VgroupCategoricalFormComponent implements OnInit {

  @Input()
  attribute: DimensionAttribute;

  values: string;

  constructor(private pcsService: PcsService) { }

  ngOnInit() {
  }

  submit() {
    const values = this.values.split(",").map(v => v.trim());

    this.pcsService.addAttributeValueCategorical(
      this.attribute.id, new VgroupCategorical(values))
      .subscribe(value => {
        this.attribute.values.push(value);
        this.values = "";
      }, error => {
        console.log(error);
      });
  }

}
