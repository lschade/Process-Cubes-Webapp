import {DimensionAttribute} from './dimension-attribute';

export class Dimension {

  public id: number;

  constructor(
    public name: string,
    public attributes: DimensionAttribute[]) {
  }

}
