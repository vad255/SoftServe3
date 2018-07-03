import * as React from 'react';
import 'isomorphic-fetch';
import { TextFilter } from './TextFilter'
import { IntFilter } from './IntFilter'
import { EnumFilter } from './EnumFilter'
import { SprintStage } from '../Models/SprintStage'
import { EmptyFilter } from './EmptyFilter';
import { FiltersRow, IFilterRow } from './FiltersRow'



export class TasksFiltersRow extends FiltersRow {
    constructor(params: IFilterRow) {
        super(params);
        this.state = { onApply: params.onApply, display: params.display }


    }

    render() {
        return <tr className={this.props.display ? "" : "nodisplay"}>
            <td>
                <IntFilter ref="taskId" filterKey='taskId' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>            
            <td>
                <IntFilter ref="plannedHours" filterKey='plannedHours' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <IntFilter ref="remainingHours" filterKey='remainingHours' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <IntFilter ref="actualHours" filterKey='actualHours' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref="type" filterKey='type' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref="state" filterKey='state' onFilterChanged={this.FilterChanged.bind(this)} />
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
