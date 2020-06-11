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

  values = {};

  constructor(private route: ActivatedRoute,
              private pcsService: PcsService,
              private router: Router) {
  }

  ngOnInit() {
    const pcsId = +this.route.snapshot.paramMap.get('pcs_id');
    const dimId = +this.route.snapshot.paramMap.get('dim_id');

    // check if data is available
    if (history.state.hasOwnProperty('data')) {
      this.dimension = history.state.data.dimension;
      console.log(this.dimension);
    }

    if (this.dimension === undefined) {
      this.pcsService.getDimension(dimId).subscribe(dimension => {
        this.dimension = dimension;
        console.log(this.dimension);
      });
    }

  }

  addElement() {
    this.pcsService.addDimensionElement(this.dimension, Object.values(this.values)).subscribe(element => {
      this.dimension.elements.push(element);
    }, error => {
      console.log(error);
    });
  }

  attributeDeleted(attribute: DimensionAttribute) {
    const index = this.dimension.attributes.indexOf(attribute, 0);
    if (index > -1) {
      this.dimension.attributes.splice(index, 1);
    }
  }
}
