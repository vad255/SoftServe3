import * as React from 'react';
import {Filter, IFilterConfiguration} from './Filter'


export class IntFilter extends Filter {
    constructor(params: IFilterConfiguration) {
        super(params);
    }

    filteringString: string = '';

    private OnChangeHandler(e: any) {
        this.filteringString = 'contains(cast(' + this.state.filterKey + ', \'Edm.String\'), \'' + e.target.value + '\')'
        this.state.onFilterChanged(this.state.filterKey, this.filteringString);
    }

    public render() {
        return <input type="text" onChange={((e: any) => this.OnChangeHandler(e)).bind(this)} />
    }
}