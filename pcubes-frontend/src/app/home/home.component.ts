import {Component, OnInit} from '@angular/core';
import {PCS} from '../models/pcs';
import {PcsService} from '../pcs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pcss: PCS[];

  constructor(private pcsService: PcsService) {
  }

  ngOnInit() {
    this.pcsService.getAllPCS().subscribe(value => this.pcss = value);
  }

}
