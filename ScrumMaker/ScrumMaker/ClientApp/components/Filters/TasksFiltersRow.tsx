import * as React from 'react';
import 'isomorphic-fetch';
import { TextFilter } from './TextFilter'
import { IntFilter } from './IntFilter'
import { EnumFilter } from './EnumFilter'
import { SprintStage } from '../Models/SprintStage'
import { EmptyFilter } from './EmptyFilter';
import { FiltersRow, IFilterRow } from './FiltersRow'
import { TaskType } from '../Models/TaskType';
import { TaskState } from '../Models/TaskState';



export class TasksFiltersRow extends FiltersRow {
    constructor(params: IFilterRow) {
        super(params);
        this.state = { onApply: params.onApply, display: params.display }


    }

    render() {
        return <tr className={this.props.display ? "" : "nodisplay"}>
            <td>
                <IntFilter ref='taskId' filterKey='taskId' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref='summary' filterKey='summary' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref='decription' filterKey='description' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref='story/name' filterKey='story/name' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <IntFilter ref='plannedHours' filterKey='plannedHours' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <IntFilter ref='started' filterKey='started' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <IntFilter ref='completed' filterKey='completed' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <EnumFilter ref='type' filterKey='type' enumType={TaskType} onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <EnumFilter ref='state' filterKey='state' enumType={TaskState} onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref='user/login' filterKey='user/login' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <div role="button" className="btn btn-sq-xs align-base " onClick={this.CancelFiltersClick.bind(this)}>
                    <span className="glyphicon glyphicon-remove-circle dark" aria-hidden="true"></span>
                </div>
                <div role="button" className="btn btn-sq-xs align-base" onClick={this.ApplyFiltersClick.bind(this)}>
                    <span className="glyphicon glyphicon-ok dark" aria-hidden="true"></span>
                </div>
            </td>
        </tr>
    }

}

