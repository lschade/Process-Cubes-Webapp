import {Component, OnInit} from '@angular/core';

import {PCS} from '../../../models/pcs';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pcs-form',
  templateUrl: './pcs-form.component.html',
  styleUrls: ['./pcs-form.component.scss']
})
export class PcsFormComponent implements OnInit {

  name = '';

  constructor(private data: DataService,
              private router: Router) {
  }

  onSubmit() {
    console.log(this.name);
    this.data.createCubeStructure(this.name).subscribe(value => {
      console.log(value);
      this.router.navigate(['pcs']);
    });

  }

  ngOnInit() {
  }


}
