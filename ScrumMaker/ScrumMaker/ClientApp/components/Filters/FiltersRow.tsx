import * as React from 'react';
import 'isomorphic-fetch';
import { Filter } from './Filter'



export interface IFilterRow {
    onApply: Function;
    display: boolean
}


export abstract class FiltersRow extends React.Component<IFilterRow, IFilterRow> {
    constructor(params: IFilterRow) {
        super(params);
        this.state = { onApply: params.onApply, display: params.display  }

    
    }

    public fileteringOn: boolean = false;
    protected filterString: string = '';
    protected filters: any = {};

    public abstract render() : JSX.Element;


    protected FilterChanged(key: string, filter: string) {

        this.filters[key] = filter;
    }

    protected ApplyFiltersClick(e: any) {

        this.filterString = Filter.QUERY_HEAD;
        var i = 0;
        for (let iterator in this.filters) {
            if (this.filters[iterator] === '')
                continue;

            i++;
            if (i !== 1)
                this.filterString += Filter.CONSTRAIN_DIVIDER;
            this.filterString += this.filters[iterator];
        }

        if (i === 0) {
            this.filterString = '';
        }

        this.state.onApply(this.filterString);
    }


    protected CancelFiltersClick(e: any) {
        for (const key in this.refs) {
            let temp = this.refs[key] as Filter;
            if (temp != null && temp != undefined){
                temp.Reset();
                
            }
        }
    }
   

}
