import {Component, Input, OnInit} from '@angular/core';
import {PCS} from '../../models/pcs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {PcsService} from '../../pcs.service';

@Component({
  selector: 'app-pcs-card',
  templateUrl: './pcs-card.component.html',
  styleUrls: ['./pcs-card.component.scss']
})
export class PcsCardComponent implements OnInit {

  @Input()
  pcs: PCS;

  deleted = false;

  constructor(private http: HttpClient,
              private router: Router,
              private pcsService: PcsService) {
  }

  ngOnInit() {
  }

  delete() {
    const pcs = this.pcs;
    this.http.delete(`/api/pcs/${this.pcs.id}/`).subscribe(
      value => {
        console.log('delete successful');
        this.pcsService.deletePCS(pcs.id);
        this.deleted = true;
      },
      error => {
        console.log(error);
      });
  }

}
