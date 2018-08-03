import * as React from 'react';
import 'isomorphic-fetch';
import { Sprint } from '../Models/Sprint';
import { Grid } from './Grid'

import { FiltersManager } from '../Filters/FiltersManager';
import { TextFilter } from '../Filters/TextFilter'
import { IntFilter } from '../Filters/IntFilter'
import { EnumFilter } from '../Filters/EnumFilter'
import { SprintStage } from '../Models/SprintStage'
import { EmptyFilter } from '../Filters/EmptyFilter';



export class SprintsGrid extends Grid {

    protected URL_BASE: string = 'odata/sprints';
    protected URL_EXPANDS: string = '?$expand=Team($expand=members),history'
    protected URL_ORDERING: string = '&$orderby=id'
    protected URL_EDIT: string = "SprintEdit/"
    protected headerText: string = 'Sprints'
    protected URL_NEW: string = "/CreateSprint";


    constructor() {
        super();
        //this.pageSize = 10;
    }

    protected instantiate(item: any) {
        return new Sprint(item);
    }

    protected GetHeaderRow() {
        return <tr>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("id")}>ID</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("name")}>Name</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("team")}>Team</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("stage")}>Stage</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("review")}>Goal</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("history")}>History</th>
            <th className="well menu_links col-md-1">
                <div onClick={this.FilterButtonClick.bind(this)}>
                    <span className="nowrap">Show Filters<span className="caret"></span></span>
                </div>
            </th>
        </tr>;
    }

    protected GetFiltersRow() {
        let filetrs = [
            new IntFilter({ filterKey: "id" }),
            new TextFilter({ filterKey: "name" }),
            new TextFilter({ filterKey: "team/name" }),
            new EnumFilter({ filterKey: "stage", enumType: SprintStage }),
            new TextFilter({ filterKey: "review" }),
            new IntFilter({ filterKey: "history/begined" })
        ]

        return <FiltersManager
            ref={this.FILTER_MANAGER_REF}
            filters={filetrs}
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn}
            externalConstraints={this.customUrlFilters}
        />
    }
}

