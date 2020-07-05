import {DimensionAttribute} from '../../../models/dimension-attribute';

export class AttributeValueDate {

  public attribute: DimensionAttribute;

  constructor(
    public startDate: Date,
    public endDate: Date) {
  }
}
