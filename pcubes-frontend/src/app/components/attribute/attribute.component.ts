import { Component, Input, OnInit } from "@angular/core";
import { DimensionAttribute } from "../../models/dimension-attribute";
import { Dimension } from "../../models/dimension";
import { PcsService } from "../../pcs.service";

@Component({
  selector: "app-attribute",
  templateUrl: "./attribute.component.html",
  styleUrls: ["./attribute.component.scss"],
})
export class AttributeComponent implements OnInit {
  @Input()
  dimension: Dimension;

  @Input()
  attribute: DimensionAttribute;

  deleted = false;

  constructor(private pcsService: PcsService) {}

  ngOnInit() {}

  delete() {
    this.pcsService.deleteAttribute(this.attribute).subscribe(
      () => {
        const index = this.dimension.attributes.indexOf(this.attribute, 0);
        if (index > -1) {
          this.dimension.attributes.splice(index, 1);
        }
        this.deleted = true;
      },
      (error) => console.log(error)
    );
  }
}
