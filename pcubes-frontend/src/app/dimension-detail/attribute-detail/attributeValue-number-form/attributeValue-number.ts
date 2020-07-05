import {DimensionAttribute} from '../../../models/dimension-attribute';

export class AttributeValueNumber {

  public attribute: DimensionAttribute;
  
  constructor(
    public lower: number,
    public upper: number) {

  }
}
