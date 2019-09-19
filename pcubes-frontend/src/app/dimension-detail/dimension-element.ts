export class DimensionElement {

  public id: number;
  public dimension: number;
  public values: ValueGroup[];


}

export class ValueGroup {
  public id: number;
  public attribute: number;

  public impl: {
    id: number;
    attribute: number;
    dtype: string;
  };
}
