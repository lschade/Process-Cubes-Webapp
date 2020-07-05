import { DimensionAttribute } from 'src/app/models/dimension-attribute';

export class AttributeValueCategorical {

    public attribute: DimensionAttribute;

    constructor(
        public values: string[]
    ) {};

}
