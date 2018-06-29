import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Team } from '../Models/Team';
import { User } from '../Models/User';
import { Grid } from './Grid';
import { TeamFiltersRow } from '../Filters/TeamFiltersRow';

interface UserState {
    teams: Team[];
}

export class TeamGrid extends Grid<RouteComponentProps<{}>, UserState> {

    protected headerText: string = "Team Grid";
    protected URL_BASE: string = 'odata/teams';
    protected URL_EXPANDS: string = '?$expand=members'
    protected URL_ORDERING: string = '&$orderby=id'

    protected OnDataReceived(data: any): void {
        this.isLoading = false;

        var teamsTemp = [];
        for (var i = 0; i < data['value'].length; i++)
            teamsTemp[i] = new Team(data["value"][i]);
        this.setState({
            teams: teamsTemp
        })
    }
    protected GetHeaderRow(): JSX.Element {
        return <tr>
            <th className="well well-sm col-md-2" onClick={() => this.OrderBy("id")}><span className="nowrap">Database ID</span></th>
            <th className="well well-sm col-md-2" onClick={() => this.OrderBy("name")}>Name</th>
            <th className="well well-sm col-md-2">Members</th>
            <th className="well well-sm col-md-1">
                <div onClick={this.FilterButtonClick.bind(this)}>
                    <span className="nowrap">Show Filters<span className="caret"></span></span>
                </div>
            </th>
        </tr>;
    }
    protected GetFiltersRow(): JSX.Element {
        return < TeamFiltersRow
        onApply = { this.ApplyFiltersHandler.bind(this) }
        display = { this.fileteringOn }
            />
    }
    protected GetBodyRows(): JSX.Element[] {
        return this.state.teams.map((t) => (t.renderForecastsTable()));
    }

    protected RenderFooter(): JSX.Element {
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
    protected getData(): any[] {
        return this.state.teams;
    }

    constructor() {
        super();
        this.state = { teams: [] };

        this.LoadData();
    }

}

