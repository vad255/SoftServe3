import * as React from 'react';
import { Filter, IFilterConfiguration } from './Filter'

export class BoolFilter extends Filter {
    
    constructor(params: IFilterConfiguration) {
        super(params);
    }

    filteringString: string = '';

    public Reset(): void {
        (document.getElementById(this.state.filterKey + "Filter") as any).value = '';
        this.filteringString = '';
        this.state.onFilterChanged(this.state.filterKey, this.filteringString);
    }
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
        return <input id={this.state.filterKey + "Filter"} type="text" onChange={((e: any) => this.OnChangeHandler(e)).bind(this)} />
    }
}