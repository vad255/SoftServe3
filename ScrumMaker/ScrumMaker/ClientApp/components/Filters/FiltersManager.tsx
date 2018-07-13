import * as React from 'react';
import 'isomorphic-fetch';
import { Filter } from './Filter'



export interface IFilterManagerState {
    filters: Filter[];
    onApply: Function;
    display: boolean;
    externalConstraints: string;
}


export class FiltersManager extends React.Component<IFilterManagerState, IFilterManagerState> {

    public fileteringOn: boolean = false;
    protected constraints: any = {};
    protected externalConstraints = "";

    constructor(params: IFilterManagerState) {
        super(params);

        params.filters.forEach(filter => {
            filter.onFilterChanged = this.FilterChanged.bind(this);
            filter.requesRedraw = (() => this.forceUpdate()).bind(this);
        });

        this.state = params;
    }


    public render() {
        return (
            <tr className={this.props.display ? "" : "nodisplay"}>
                {this.state.filters.map((f, i) => <td key={i.toString()}>{f.render()}</td>)}
                <td>
                    <div role="button"
                        className="btn btn-sq-xs align-base "
                        onClick={this.CancelFiltersClick.bind(this)}>
                        <span className="glyphicon glyphicon-remove-circle dark" aria-hidden="true" />
                    </div>
                    &nbsp;&nbsp;
                    <div role="button"
                        className="btn btn-sq-xs align-base"
                        onClick={this.ApplyFiltersClick.bind(this)}>
                        <span className="glyphicon glyphicon-ok dark" aria-hidden="true" />
                    </div>
                </td>
            </tr>
        )
    }

    public GetFilteringQuery(): string {
        let filterString = Filter.QUERY_HEAD;

        let noConstrainsYet = true;

        if (this.externalConstraints != undefined && this.externalConstraints != null && this.externalConstraints != "") {
            filterString += this.externalConstraints;
            noConstrainsYet = false;
        }
        for (let iterator in this.constraints) {
            if (this.constraints[iterator] === '')
                continue;

            if (!noConstrainsYet)
                filterString += Filter.CONSTRAIN_DIVIDER;

            filterString += this.constraints[iterator];
            noConstrainsYet = false;
        }

        if (noConstrainsYet) {
            filterString = '';
        }

        return filterString;
    }


    protected FilterChanged(key: string, filter: string) {
        this.constraints[key] = filter;
    }

    protected ApplyFiltersClick(e: any) {
        let queryString = this.GetFilteringQuery();
        this.state.onApply(queryString);
    }

    protected CancelFiltersClick(e: any) {
        this.state.filters.map(f => f.Reset());
        let queryString = this.GetFilteringQuery();
        this.state.onApply(queryString);
    }
}