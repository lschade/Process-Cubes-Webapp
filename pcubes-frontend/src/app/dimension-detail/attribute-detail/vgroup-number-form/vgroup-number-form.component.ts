import {Component, Input, OnInit} from '@angular/core';
import {DimensionAttribute} from '../../../models/dimension-attribute';
import {PcsService} from '../../../pcs.service';
import {VgroupNumber} from './vgroup-number';

@Component({
  selector: 'app-vgroup-number-form',
  templateUrl: './vgroup-number-form.component.html',
  styleUrls: ['./vgroup-number-form.component.scss']
})
export class VgroupNumberFormComponent implements OnInit {

  @Input()
  attribute: DimensionAttribute;

  upper: number;
  lower: number;

  constructor(private pcsService: PcsService) {
  }

  ngOnInit() {
  }

  submit() {
    const vgroup = new VgroupNumber(this.attribute, this.lower, this.upper);
    this.pcsService.addValueGroupNumber(vgroup).subscribe(value => {
      this.attribute.values.push(value);
    }, error => {
      console.log(error);
    });
  }

}
