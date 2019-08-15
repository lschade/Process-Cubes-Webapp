import {Dimension} from './dimension';

export class PCS {

  public id: number;

  constructor(
    public name: string,
    public dimensions: Dimension[]) {
  }

}
