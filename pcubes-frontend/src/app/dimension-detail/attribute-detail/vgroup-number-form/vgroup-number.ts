import {DimensionAttribute} from '../../../models/dimension-attribute';

export class VgroupNumber {

  public attribute: DimensionAttribute;
  
  constructor(
    public lower: number,
    public upper: number) {

  }
}
