import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {PCS} from '../../models/pcs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {PcsService} from '../../pcs.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PcubeService } from 'src/app/pcube.service';

@Component({
  selector: 'app-pcs-card',
  templateUrl: './pcs-card.component.html',
  styleUrls: ['./pcs-card.component.scss']
})
export class PcsCardComponent implements OnInit {

  @Input()
  pcs: PCS;

  deleted = false;

  modalRef: BsModalRef;

  constructor(private http: HttpClient,
              private router: Router,
              private pcsService: PcubeService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  delete() {
    const pcs = this.pcs;
    console.log(pcs);
    this.pcsService.deletePCS(pcs).subscribe(
      value => {
        console.log('delete successful');
        this.deleted = true;
      },
      error => {
        console.log(error);
      });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
