import {Component, Input, OnInit} from '@angular/core';
import {Dimension} from '../models/dimension';
import {ActivatedRoute} from '@angular/router';
import {PcsService} from '../pcs.service';
import {PCS} from '../models/pcs';
import {DimensionAttribute} from '../models/dimension-attribute';

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
  values: any;

  constructor(private route: ActivatedRoute,
              private pcsService: PcsService) {
  }

  ngOnInit() {
    const pcsId = +this.route.snapshot.paramMap.get('pcs_id');
    const dimId = +this.route.snapshot.paramMap.get('dim_id');

    this.pcsService.getDimension(dimId).subscribe(dimension => this.dimension = dimension);
    this.pcsService.getPCS(pcsId).subscribe(pcs => this.pcs = pcs);
  }

  addElement() {

  }
}
