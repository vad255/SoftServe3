import * as React from 'react';
import 'isomorphic-fetch';
import { TextFilter } from './TextFilter'
import { IntFilter } from './IntFilter'
import { EnumFilter } from './EnumFilter'
import {BoolFilter} from './BoolFilter';
import {FiltersRow, IFilterRow} from './FiltersRow'



export class UsersFiltersRow extends FiltersRow {
    constructor(params: IFilterRow) {
        super(params);
        this.state = { onApply: params.onApply, display: params.display  }

    
    }

    render() {     
        return <tr className={this.props.display? "": "nodisplay"}>
           <td>
                <IntFilter filterKey='userId' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter filterKey='login' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter filterKey='password' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter filterKey='team/name' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td >
                <BoolFilter filterKey='activity' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter filterKey='role/name' onFilterChanged={this.FilterChanged.bind(this)} />
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
