import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { DropdownButton, MenuItem } from 'react-bootstrap';

interface UserState {
    teams: Team[];
    users: User[];
    loading: boolean;
}

export class TeamGrid extends React.Component<RouteComponentProps<{}>, UserState> {
    constructor() {
        super();
        this.state = { users: [], teams: [], loading: true };

        fetch('api/TeamGrid/GetUser')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ users: data, loading: false });
            });
        fetch('api/TeamGrid/GetTeam')
            .then(response => response.json() as Promise<Team[]>)
            .then(data => {
                this.setState({ teams: data, loading: false });
            });
    }

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
                        <select className="optionGrid">
                            {users.map(u =>
                                u.teamId == t.id ? <option>{u.login}</option> : null
                            )}
                        </select>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface Team {
    id: number;
    name: string;
}

interface User {
    userId: number;
    login: string;
    password: string;
    roleId: number;
    activity: boolean;
    photo: number[];
    teamId: number;
}
