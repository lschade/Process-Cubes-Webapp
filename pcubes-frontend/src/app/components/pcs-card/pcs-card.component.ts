import {Component, Input, OnInit} from '@angular/core';
import {PCS} from '../../models/pcs';

@Component({
  selector: 'app-pcs-card',
  templateUrl: './pcs-card.component.html',
  styleUrls: ['./pcs-card.component.scss']
})
export class PcsCardComponent implements OnInit {

  @Input()
  pcs: PCS;

  constructor() {
  }

  ngOnInit() {
  }

}
