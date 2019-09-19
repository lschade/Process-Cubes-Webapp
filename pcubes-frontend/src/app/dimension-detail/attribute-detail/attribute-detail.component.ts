import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DimensionAttribute} from '../../models/dimension-attribute';
import {PcsService} from '../../pcs.service';

@Component({
  selector: 'app-attribute-detail',
  templateUrl: './attribute-detail.component.html',
  styleUrls: ['./attribute-detail.component.scss']
})
export class AttributeDetailComponent implements OnInit {

  @Input()
  attribute: DimensionAttribute;

  @Output()
  onDelete = new EventEmitter<DimensionAttribute>();

  isCollapsed = true;

  constructor(private pcsService: PcsService) {
  }

  ngOnInit() {
  }

  delete() {
    this.pcsService.deleteAttribute(this.attribute).subscribe(
      value => this.onDelete.emit(this.attribute), error => console.log(error)
    );
  }
}
