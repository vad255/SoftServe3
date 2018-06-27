import * as React from 'react';
import { Filter, IFilterConfiguration } from './Filter'

export interface IEnumFilterConfiguration extends IFilterConfiguration {
    enumType: {};
}

export class EnumFilter extends Filter {
    constructor(params: IEnumFilterConfiguration) {
        super(params);
        this.enumType = params.enumType;
    }

    enumType: {};
    filteringString: string = '';

    private OnChangeHandler(e: any) {

        console.log(this.enumType);

        this.filteringString = 'contains(cast(' + this.state.filterKey + ', \'Edm.String\'), \'' + e.target.value + '\')'
        this.state.onFilterChanged(this.state.filterKey, this.filteringString);
    }

    public render() {
        return <select className="form-control" multiple={true}>
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
      </select>
      
    }
}