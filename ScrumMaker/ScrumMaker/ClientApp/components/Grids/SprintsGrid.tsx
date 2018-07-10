import * as React from 'react';
import 'isomorphic-fetch';
import { Sprint } from '../Models/Sprint';
import { SprintsFiltersRow } from '../Filters/SprintsFiltersRow'
import { Grid } from './Grid'


export class SprintsGrid extends Grid {

    protected URL_BASE: string = 'odata/sprints';
    protected URL_EXPANDS: string = '?$expand=Team($expand=members),history'
    protected URL_ORDERING: string = '&$orderby=id'
    protected headerText: string = 'Sprints'


    constructor() {
        super();
        this.LoadData();
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
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("review")}>Review</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("history")}>History</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("retrospective")}>Retrospective</th>
            <th className="well menu_links col-md-1">
                <div onClick={this.FilterButtonClick.bind(this)}>
                    <span className="nowrap">Show Filters<span className="caret"></span></span>
                </div>
            </th>
        </tr>;
    }

    protected GetFiltersRow() {
        return <SprintsFiltersRow
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn}
        />
    }
}




