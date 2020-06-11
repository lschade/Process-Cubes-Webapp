import {Component, Input, OnInit} from '@angular/core';
import {DimensionAttribute} from '../../../models/dimension-attribute';
import {VgroupDate} from './vgroup-date';
import {PcsService} from '../../../pcs.service';

@Component({
  selector: 'app-vgroup-date-form',
  templateUrl: './vgroup-date-form.component.html',
  styleUrls: ['./vgroup-date-form.component.scss']
})
export class VgroupDateFormComponent implements OnInit {

  @Input()
  attribute: DimensionAttribute;

  dateStart: Date;
  dateEnd: Date;

  constructor(private pcsService: PcsService) {
  }

  ngOnInit() {
  }

  submit() {
    const vgroupDate = new VgroupDate(this.dateStart, this.dateEnd);
    this.pcsService.addValueGroupDate(this.attribute.id, vgroupDate).subscribe(value => {
      this.attribute.values.push(value);
    });
  }
}
