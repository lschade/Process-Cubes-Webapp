import {DimensionAttribute} from '../../../models/dimension-attribute';

export class VgroupDate {

  public attribute: DimensionAttribute;

  constructor(
    public startDate: Date,
    public endDate: Date) {
  }
}
