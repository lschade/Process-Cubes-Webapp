import {Component, Input, OnInit} from '@angular/core';
import {DimensionAttribute} from '../../models/dimension-attribute';
import {Dimension} from '../../models/dimension';
import {PcsService} from '../../pcs.service';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {

  @Input()
  dimension: Dimension;

  @Input()
  attribute: DimensionAttribute;

  constructor(private pcsService: PcsService) {
  }

  ngOnInit() {
  }

  delete() {
    this.pcsService.deleteAttribute(this.dimension, this.attribute).subscribe(value => {
      const index = this.dimension.attributes.indexOf(this.attribute, 0);
      if (index > -1) {
        this.dimension.attributes.splice(index, 1);
      }
    });
  }
}
