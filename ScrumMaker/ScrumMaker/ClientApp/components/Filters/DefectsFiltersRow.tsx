import * as React from 'react';
import 'isomorphic-fetch';
import { TextFilter } from './TextFilter'
import { IntFilter } from './IntFilter'
import { EnumFilter } from './EnumFilter'
import { DefectStatus } from '../Models/DefectStatus'
import { EmptyFilter } from './EmptyFilter';
import { FiltersRow, IFilterRow } from './FiltersRow'
import { DefectPriority } from '../Models/DefectPriority';
import { DefectState } from '../Models/DefectState';


export class DefectsFiltersRow extends FiltersRow {
    constructor(params: IFilterRow) {
        super(params);
        this.state = { onApply: params.onApply, display: params.display }
    }

    render() {
        return <tr className={this.props.display ? "" : "nodisplay"}>
            <td>
                <IntFilter ref="defectId" filterKey='defectId' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref="defectName" filterKey='defectName' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref="description" filterKey='description' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <EnumFilter ref="priority" filterKey='priority' enumType={DefectPriority} onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <EnumFilter ref="state" filterKey='state' enumType={DefectState} onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <EnumFilter ref="status" filterKey='status' enumType={DefectStatus} onFilterChanged={this.FilterChanged.bind(this)} />
            </td>

            <td>
                <TextFilter ref="actualResults" filterKey='actualResults' onFilterChanged={this.FilterChanged.bind(this)} />
            </td>
            <td>
                <TextFilter ref="fixResults" filterKey='fixResults' onFilterChanged={this.FilterChanged.bind(this)} />
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
