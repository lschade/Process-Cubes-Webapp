import {Component, OnInit} from '@angular/core';
import {PCS} from '../models/pcs';
import {PcubeService} from '../pcube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pcss: PCS[];

  constructor(private pcsService: PcubeService) {
  }

  ngOnInit() {
    this.pcsService.getAllPCS().subscribe(value => this.pcss = value);
    console.log('init');
  }

}
