import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Sprint } from '../Models/Sprint';
import { SprintsFiltersRow } from '../Filters/SprintsFiltersRow'
import { Grid } from './Grid'

interface ISprintDataFetchingState {
    sprints: Sprint[];
}

export class SprintsGrid extends Grid<RouteComponentProps<{}>, ISprintDataFetchingState> {

    protected URL_BASE: string = 'odata/sprints';
    protected URL_EXPANDS: string = '?$expand=Team($expand=members),history'
    protected URL_ORDERING: string = '&$orderby=id'
    protected headerText: string = 'Sprints'

    protected pageSize: number = 5;

    constructor() {
        super();
        this.LoadData();
    }


    protected OnDataReceived(data: any) {
        this.isLoading = false;

        var sprintsTemp = [];
        for (var i = 0; i < data['value'].length; i++)
            sprintsTemp[i] = new Sprint(data["value"][i]);

        this.setState({ sprints: sprintsTemp });
    }

    protected getData() {
        return this.state.sprints;
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
    protected GetBodyRows() {
    return this.state.sprints.map((s) => s.renderAsTableRow());
    }
    protected RenderFooter() {
        return <tr>
            <td colSpan={8}>
                <div className="text-center">
                    <div role='button' className='btn btn-primary'>
                        Add new
                    </div>
                </div>
            </td>
        </tr>;
    }
}




