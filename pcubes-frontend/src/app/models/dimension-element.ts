import { Dimension } from './dimension';
import { DimensionElementValue } from './dimension-element-value';

export class DimensionElement {

    constructor(
        public dimension: Dimension,
        public values: DimensionElementValue[]
    ) {}

}
