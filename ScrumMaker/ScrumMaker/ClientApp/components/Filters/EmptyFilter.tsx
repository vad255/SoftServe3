import * as React from 'react';
import { Filter } from './Filter'


export class EmptyFilter extends Filter {
    constructor() {
        super({ filterKey: ''});
    }


    private static HandlerStub() { }

    public Reset(){}

    public render() {
        return <div />
    }
}