import * as React from 'react';
import { Filter, IFilterConfiguration } from './Filter'


export class IntFilter extends Filter {

    constructor(params: IFilterConfiguration) {
        super(params);
    }

    filteringString: string = '';

    public Reset(): void {
        (document.getElementById(this.filterKey + "Filter") as any).value = '';
        this.filteringString = '';
        this.onFilterChanged(this.filterKey, this.filteringString);
    }

    private OnChangeHandler(e: any) {
        this.filteringString = 'contains(cast(' + this.filterKey + ', \'Edm.String\'), \'' + e.target.value + '\')'
        this.onFilterChanged(this.filterKey, this.filteringString);
    }

    public render() {
        return <input
            id={this.filterKey + "Filter"}
            type="text"
            onChange={((e: any) => this.OnChangeHandler(e)).bind(this)}/>
    }
}