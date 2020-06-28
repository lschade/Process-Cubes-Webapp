import { DimensionAttribute } from './dimension-attribute';
import { ValueGroup } from '../dimension-detail/dimension-element';

export class DimensionElementValue {

    constructor(
        public attribute: DimensionAttribute,
        public value: ValueGroup
    ) {}
}
