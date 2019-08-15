import {Component, Input, OnInit} from '@angular/core';
import {PCS} from '../models/pcs';
import {PcsService} from '../pcs.service';
import {ActivatedRoute} from '@angular/router';
import {Dimension} from '../models/dimension';

@Component({
  selector: 'app-pcs-detail',
  templateUrl: './pcs-detail.component.html',
  styleUrls: ['./pcs-detail.component.scss']
})
export class PcsDetailComponent implements OnInit {

  pcs: PCS;
  newDimension: Dimension = new Dimension('', []);

  constructor(private route: ActivatedRoute,
              private pcsService: PcsService) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pcsService.getPCS(id).subscribe(pcs => this.pcs = pcs);
  }

  addDimension() {
    this.pcsService.addDimension(this.pcs, this.newDimension.name).subscribe(value => {
      this.pcs.dimensions.push(value);
      this.newDimension = new Dimension('', []);
    });
  }

}
