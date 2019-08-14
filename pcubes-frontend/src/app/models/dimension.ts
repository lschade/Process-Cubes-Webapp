import {DimensionAttribute} from './dimension-attribute';

export class Dimension {

  constructor(
    public name: string,
    public attributes: DimensionAttribute[]) {
  }

}
