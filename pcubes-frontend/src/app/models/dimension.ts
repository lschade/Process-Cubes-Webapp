import {DimensionAttribute} from './dimension-attribute';

export class Dimension {

  public id: number;
  public elements: any[]

  constructor(
    public name: string,
    public attributes: DimensionAttribute[]) {
  }

}
