import { DimensionAttribute } from './dimension-attribute';
import { AttributeValue } from '../dimension-detail/dimension-element';

export class DimensionElementValue {

    constructor(
        public attribute: DimensionAttribute,
        public value: AttributeValue
    ) {}
}
