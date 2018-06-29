import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Role } from './Role';
import { Team } from './Team';

export class User extends React.Component {

    empty: boolean = true;
    userId: number = -1;
    login: string = '';
    password: string = '';
    teamId: number = -1;
    activity: boolean = false;
    roleId: number = -1;
    role: Role;
    team: Team;


    public constructor(params: any) {

        super(params);

        if (params === null || params === undefined) {
            return;
        }
        this.userId = params.UserId;
        this.login = params.Login;
        this.password = params.Password;
        this.teamId = params.TeamId;
        this.activity = params.Activity;
        this.roleId = params.RoleId;
        this.role = new Role(params.Role);
        this.team = new Team(params.Team);
        this.empty = false;
    }


    public render() {
        return this.renderAsTableRow();
    }

    renderAsDropDown() {
        if (this.empty)
            return <li key="nodata"><div> nodata </div></li>;
        return <li key={this.userId.toString()} className="dropdown-submenu">
            <div> {this.login} </div>
            <ul className="dropdown-menu">
                <li className="dropListItem"><b><pre>UserID:  {this.userId}</pre></b> </li>
                <li className="dropListItem"><b><pre>Login:   {this.login}</pre></b> </li>
                <li className="dropListItem"><b><pre>Password:{this.password}</pre></b> </li>
                <li className="dropListItem"><b><pre>Activity:{this.activity ? "true" : "false"}</pre></b> </li>
                <li className="dropListItem"><b><pre>RoleId:  {this.roleId}</pre></b> </li>
            </ul>
        </li>
    }
    public renderAsTableRow() {
        return <tr key={this.userId}>
            <td className="align-base">{this.userId}</td>
            <td className="align-base">{this.login}</td>
            <td className="align-base">{this.password}</td>
            <td className="align-base">{this.team.renderAsMenu()}</td>
            <td className="align-base">{this.activity ? "true" : "false"}</td>
            <td className="align-base">{this.role.name}</td>
            <td className="align-base">
                <div id={this.userId.toString()} role="button" className="btn btn-sq-xs align-base ">
                    <span className="glyphicon glyphicon-edit dark" aria-hidden="true"></span>
                </div>
                &nbsp;&nbsp;
                <div id={this.userId.toString()} role="button" className="btn btn-sq-xs align-base">
                    <span className="glyphicon glyphicon-trash dark" aria-hidden="true"></span>
                </div>
            </td>
        </tr>;
    }
}