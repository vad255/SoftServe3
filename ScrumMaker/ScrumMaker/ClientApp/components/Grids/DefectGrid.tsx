import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Grid } from './Grid'
import { Defect } from '../Models/Defect';
import { IDbModel } from '../Models/Abstraction';

import { FiltersManager } from '../Filters/FiltersManager';
import { TextFilter } from '../Filters/TextFilter'
import { IntFilter } from '../Filters/IntFilter'
import { EnumFilter } from '../Filters/EnumFilter'
import { SprintStage } from '../Models/SprintStage'
import { EmptyFilter } from '../Filters/EmptyFilter';
import { DefectPriority } from '../Models/DefectPriority';
import { DefectState } from '../Models/DefectState';
import { DefectStatus } from '../Models/DefectStatus';

export class DefectGrid extends Grid {
    protected URL_BASE: string = 'odata/defects';
    protected URL_EXPANDS: string = '?expand=()';
    protected URL_ORDERING: string = '&$orderby=DefectId';
    protected headerText: string = 'Defects';
    protected URL_EDIT: string = "EditDefect/";
    protected URL_NEW: string = "/CreateDefect";

    constructor() {
        super(); 
    }

    protected instantiate(item: any): IDbModel {
        return new Defect(item);
    }

    protected GetHeaderRow(): JSX.Element {
        return <tr>
            <th className="well well-sm" onClick={() => this.OrderBy("defectId")}><span className="nowrap">ID</span></th>
            <th className="well well-sm" onClick={() => this.OrderBy("name")}>Name</th>
            <th className="well well-sm" onClick={() => this.OrderBy("description")}>Description</th>
            <th className="well well-sm" onClick={() => this.OrderBy("priority")}>Priority</th>
            <th className="well well-sm" onClick={() => this.OrderBy("state")}>State</th>
            <th className="well well-sm" onClick={() => this.OrderBy("status")}>Status</th>
            <th className="well well-sm" onClick={() => this.OrderBy("actualResults")}>ActualResults</th>
            <th className="well well-sm" onClick={() => this.OrderBy("fixResults")}>FixResults</th>
            <th className="well well-sm">
                <div onClick={this.FilterButtonClick.bind(this)}>
                    <span className="nowrap">Show Filters<span className="caret"></span></span>
                </div>
            </th>
        </tr>;
    }
    protected GetFiltersRow(): JSX.Element {
        let filetrs = [
            new IntFilter({ filterKey: "defectId" }),
            new TextFilter({ filterKey: "name" }),
            new TextFilter({ filterKey: "description" }),
            new EnumFilter({ filterKey: "priority", enumType: DefectPriority }),
            new EnumFilter({ filterKey: "status", enumType: DefectState }),
            new EnumFilter({ filterKey: "status", enumType: DefectStatus }),
            new TextFilter({ filterKey: "actualResults" }),
            new TextFilter({ filterKey: "fixResults" }),
        ]

        return <FiltersManager
            ref={this.FILTER_MANAGER_REF}
            filters={filetrs}
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn}
            externalConstraints={this.customUrlFilters}
        />
    }

    protected onCatch(e: any) {
        this.props.history.push('/login')
    }
}
