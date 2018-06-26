import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Team } from './Models/Team';
import { User } from './Models/User';

interface UserState {
    teams: Team[];
    users: User[];
    loading: boolean;
}

export class TeamGrid extends React.Component<RouteComponentProps<{}>, UserState> {

    static readonly URL_BASE: string = 'odata/teams';
    static readonly URL_EXPANDS: string = '?$expand=members'
    static readonly URL_ORDERING: string = '&$orderby=id'

    constructor() {
        super();
        this.state = { users: [], teams: [], loading: true };

        fetch(this.getURL())
            .then(response => response.json() as any)
            .then(data => {
                var teamsTemp = [];
                for (var i = 0; i < data['value'].length; i++)
                    teamsTemp[i] = new Team(data["value"][i]);
                this.setState({ teams: teamsTemp, loading: false });
            });
    }

    private filterString: string = "";

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.users, this.state.teams);

        return <div>
            <h1>Team Grid</h1>
            {contents}
        </div>;
    }

    private lastOrderingArg: string = "";
    private lastOrderingDir: boolean = false;

    public OrderBy(arg: string) {
        try {
            var teamsN = [];
            teamsN = this.state.teams as any[];


            if (this.lastOrderingArg === arg)
                this.lastOrderingDir = !this.lastOrderingDir;
            else
                this.lastOrderingDir = false;



            if (!this.lastOrderingDir)
                teamsN.sort((a, b) => {
                    if (a === undefined || a === null || b === undefined || b === null ||
                        a[arg] === undefined || a[arg] === null || b[arg] === undefined || b[arg] === null)
                        return 0
                    else
                        return a[arg].toString().localeCompare(b[arg].toString());
                })
            else
                teamsN.sort((a, b) => {
                    if (a === undefined || a === null || b === undefined || b === null ||
                        a[arg] === undefined || a[arg] === null || b[arg] === undefined || b[arg] === null)
                        return 0
                    else
                        return -a[arg].toString().localeCompare(b[arg].toString());
                })

            this.lastOrderingArg = arg;
            this.setState({ teams: teamsN as Team[], loading: this.state.loading });
        } catch (e) {
            alert(e)
        }

    }

    private getURL(): string {
        var result = TeamGrid.URL_BASE;
        result += TeamGrid.URL_EXPANDS;

        if (this.filterString != '')
            result += this.filterString;
        result += TeamGrid.URL_ORDERING;
        return result;
    }

    private renderForecastsTable(users: User[], teams: Team[]) {
        return <table className='table table-sml table-striped table-dark'>
            <caption>List of team</caption>
            <thead className=''>
                <tr>
                    <th className="well well-sm" onClick={() => this.OrderBy("id")}>ID</th>
                    <th className="well well-sm" onClick={() => this.OrderBy("name")}>Name </th>
                    <th className="well well-sm" >Members</th>
                </tr>
            </thead>
            <tbody>
                {teams.map(t =>
                    <tr key={t.id}>
                        <td>{t.id}</td>
                        <th scope="row">{t.name}</th>
                        <select className="btn btn-sm btn-primary" role="button" data-toggle="dropdown">
                            {t.members.map(u =>
                                <option>{u.login}</option>
                            )}
                        </select>   
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

