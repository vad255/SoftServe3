import * as React from 'react';
import 'isomorphic-fetch';
import { TextFilter } from './TextFilter'
import { IntFilter } from './IntFilter'
import { EnumFilter } from './EnumFilter'
import { EmptyFilter } from './EmptyFilter';
import { FiltersRow, IFilterRow } from './FiltersRow'


export enum StoryStatus {
    PendingApproval = 1,
    ReadyToStart = 2,
    InProgress = 3,
    DevComplete = 4,
    TestComplete = 5,
    Accepted = 6
}

export class StoriesFiltersRow extends FiltersRow {
    constructor(params: IFilterRow) {
        super(params);
        this.state = { onApply: params.onApply, display: params.display }
    }

    render() {
        return <tr className={this.props.display ? "" : "nodisplay"}>
            <td>
                <IntFilter ref="id" filterKey='Id' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref="name" filterKey='Name' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref="description" filterKey='Description' onFilterChanged={this.FilterChanged.bind(this)
                } />
            </td>
            <td>
                <EnumFilter ref="status" filterKey='Status' enumType={StoryStatus} onFilterChanged={this.FilterChanged
                    .bind(this)} />
            </td>
            <td>
                <div role="button" className="btn btn-sq-xs align-base " onClick={this.CancelFiltersClick.bind(this)}>
                    <span className="glyphicon glyphicon-remove-circle dark" aria-hidden="true"></span>
                </div>
                &nbsp;&nbsp;
                       <div role="button" className="btn btn-sq-xs align-base" onClick={this.ApplyFiltersClick.bind(
                    this)}>
                    <span className="glyphicon glyphicon-ok dark" aria-hidden="true"></span>
                </div>
            </td>
        </tr>;
    }

}
