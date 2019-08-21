import {Component, Input, OnInit} from '@angular/core';
import {DimensionAttribute} from '../../models/dimension-attribute';
import {Dimension} from '../../models/dimension';
import {PcsService} from '../../pcs.service';

@Component({
  selector: 'app-attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.scss']
})
export class AttributeFormComponent implements OnInit {

  @Input()
  dimension: Dimension;

  newAttribute = new DimensionAttribute('', '');

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
}
