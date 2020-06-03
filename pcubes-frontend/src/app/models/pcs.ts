import {Dimension} from './dimension';

export class PCS {

  public id: number;
  public name: string;
  public dimensions: Dimension[];
  public self: any;

  constructor(
    name: string,
    dimensions: Dimension[],
    _links: any) {
      this.name = name;
      this.dimensions = dimensions;
      this.self = _links.self;
  }

  
}

