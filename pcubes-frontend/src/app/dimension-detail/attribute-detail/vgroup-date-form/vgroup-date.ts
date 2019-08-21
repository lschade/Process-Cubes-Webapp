import {DimensionAttribute} from '../../../models/dimension-attribute';

export class VgroupDate {
  constructor(
    public attribute: DimensionAttribute,
    public start: Date,
    public end: Date) {
  }
}
