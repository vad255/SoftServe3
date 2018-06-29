import * as React from 'react';
import { Filter, IFilterConfiguration } from './Filter'

export class BoolFilter extends Filter {
    public Reset(): void {
        throw new Error("Method not implemented.");
    }
    constructor(params: IFilterConfiguration) {
        super(params);
    }

    filteringString: string = '';

    private OnChangeHandler(e: any) {
        var temp = -1;
        if (e.target.value === "false")
            temp = 0;
        else if (e.target.value === "true")
            temp = 1;
        this.filteringString = 'contains(cast(' + this.state.filterKey + ', \'Edm.String\'), \'' + temp + '\')'
        this.state.onFilterChanged(this.state.filterKey, this.filteringString);
    }

    public render() {
        return <input type="text" onChange={((e: any) => this.OnChangeHandler(e)).bind(this)} />
    }
}