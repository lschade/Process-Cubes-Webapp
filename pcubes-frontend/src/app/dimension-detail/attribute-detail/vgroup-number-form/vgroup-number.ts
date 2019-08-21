import {DimensionAttribute} from '../../../models/dimension-attribute';

export class VgroupNumber {

  constructor(
    public attribute: DimensionAttribute,
    public lower: number,
    public upper: number) {

  }
}
