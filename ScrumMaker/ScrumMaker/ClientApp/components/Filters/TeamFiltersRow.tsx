import * as React from 'react';
import 'isomorphic-fetch';
import { TextFilter } from './TextFilter'
import { IntFilter } from './IntFilter'
import { EnumFilter } from './EnumFilter'
import { EmptyFilter } from './EmptyFilter';
import { FiltersRow, IFilterRow } from './FiltersRow'



export class TeamFiltersRow extends FiltersRow {
    constructor(params: IFilterRow) {
        super(params);
        this.state = { onApply: params.onApply, display: params.display }


    }

    render() {
        return <tr className={this.props.display ? "" : "nodisplay"}>
            <td>
                <IntFilter ref="id" filterKey='id' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref="name" filterKey='name' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <EmptyFilter />
            </td>
            <td>
                <div role="button" className="btn btn-sq-xs align-base " onClick={this.CancelFiltersClick.bind(this)}>
                    <span className="glyphicon glyphicon-remove-circle dark" aria-hidden="true"></span>
                </div>
                &nbsp;&nbsp;
            <div role="button" className="btn btn-sq-xs align-base" onClick={this.ApplyFiltersClick.bind(this)}>
                    <span className="glyphicon glyphicon-ok dark" aria-hidden="true"></span>
                </div>
            </td>
        </tr>
    }

}
