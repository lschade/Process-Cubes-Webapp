import {Component, Input, OnInit} from '@angular/core';
import {Dimension} from '../../models/dimension';
import {DimensionAttribute} from '../../models/dimension-attribute';
import {PcsService} from '../../pcs.service';
import {PCS} from '../../models/pcs';

@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.scss']
})
export class DimensionComponent implements OnInit {

  @Input()
  dimension: Dimension;

  @Input()
  pcs: PCS;

  newAttribute: DimensionAttribute = new DimensionAttribute('', '');

  constructor(private pcsService: PcsService) {
  }

  ngOnInit() {
  }

  addAttribute() {
    this.pcsService.addAttribute(this.dimension, this.newAttribute).subscribe(value => {
      this.dimension.attributes.push(value);
      this.newAttribute = new DimensionAttribute('', '');
    });
  }

  delete() {
    this.pcsService.deleteDimension(this.dimension).subscribe(value => {
      const index = this.pcs.dimensions.indexOf(this.dimension, 0);
      if (index > -1) {
        this.pcs.dimensions.splice(index, 1);
      }
    });
  }
}
