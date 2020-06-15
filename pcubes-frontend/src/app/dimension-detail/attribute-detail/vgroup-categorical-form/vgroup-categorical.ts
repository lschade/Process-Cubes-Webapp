import { DimensionAttribute } from 'src/app/models/dimension-attribute';

export class VgroupCategorical {

    public attribute: DimensionAttribute;

    constructor(
        public values: string[]
    ) {};

}
