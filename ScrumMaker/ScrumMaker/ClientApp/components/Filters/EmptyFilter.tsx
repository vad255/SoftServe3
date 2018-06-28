import * as React from 'react';
import { Filter, IFilterConfiguration } from './Filter'


export class EmptyFilter extends Filter {
    constructor() {
        super({ filterKey: '', onFilterChanged: EmptyFilter.HandlerStub });
    }


    private static HandlerStub() { }

    public Reset(){}

    public render() {
        return <div />
    }
}