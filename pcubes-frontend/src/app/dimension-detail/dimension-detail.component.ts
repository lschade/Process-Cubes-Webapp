import {Component, Input, OnInit} from '@angular/core';
import {Dimension} from '../models/dimension';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {PcsService} from '../pcs.service';
import {PCS} from '../models/pcs';
import {DimensionAttribute} from '../models/dimension-attribute';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-dimension-detail',
  templateUrl: './dimension-detail.component.html',
  styleUrls: ['./dimension-detail.component.scss']
})
export class DimensionDetailComponent implements OnInit {

  dimension: Dimension;

  pcs: PCS;

  elements = [];
  isCollapsed = true;
  values = {};

  constructor(private route: ActivatedRoute,
              private pcsService: PcsService,
              private router: Router) {
  }

  ngOnInit() {
    const pcsId = +this.route.snapshot.paramMap.get('pcs_id');
    const dimId = +this.route.snapshot.paramMap.get('dim_id');

    this.pcsService.getDimension(dimId).subscribe(dimension => {
      this.dimension = dimension;

      for (const element of dimension.elements) {
        const elementObj = {};
        for (const elementValue of element.values) {
          elementObj[elementValue.attribute] = elementValue.impl;
        }

        this.elements.push(elementObj);
      }
      // this.elements = dimension.elements;
      console.log(this.elements);
    });
  }

  addElement() {
    this.pcsService.addDimensionElement(this.dimension, Object.values(this.values)).subscribe(element => {
      const elementObj = {};
      for (const elementValue of element.values) {
        elementObj[elementValue.attribute] = elementValue.impl;
      }

      this.elements.push(elementObj);
    });
  }

  attributeDeleted(attribute: DimensionAttribute) {
    const index = this.dimension.attributes.indexOf(attribute, 0);
    if (index > -1) {
      this.dimension.attributes.splice(index, 1);
    }
  }
}
