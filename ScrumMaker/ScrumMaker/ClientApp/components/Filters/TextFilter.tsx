import * as React from 'react';
import {Filter, IFilterConfiguration} from './Filter'

export class TextFilter extends Filter {
    constructor(params: IFilterConfiguration) {
        super(params);
    }

    filteringString: string = '';

    public Reset(): void {
        (document.getElementById(this.state.filterKey+"Filter") as any).value = '';
        this.filteringString = '';
        this.state.onFilterChanged(this.state.filterKey, this.filteringString);
    }

    private OnChangeHandler(e: any) {
        this.filteringString = 'contains(' + this.state.filterKey + ', \'' + e.target.value + '\')'

        this.state.onFilterChanged(this.state.filterKey, this.filteringString);
    }

    public render() {
        return <input id={this.state.filterKey+"Filter"} type="text" onChange={((e: any) => this.OnChangeHandler(e)).bind(this)} />
    }
}