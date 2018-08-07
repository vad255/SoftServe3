import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Role } from './Role';
import { Team } from './Team';
import { IDbModel } from './Abstraction'

export class User implements IDbModel {
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
        if (!params)
            return;

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

    getId(): number {
        return this.userId;
    }
    toArray(): any[] {
        let elements: any[] = [
            this.userId,
            this.login,
            <div className='align-base m-tooltip'> {this.password.substring(0, 15) + " .."}
                <span className="m-tooltiptext"> {this.password}</span>
            </div>,
            this.team.renderAsMenu(),
            this.activity ? "true" : "false",
            this.role.name
        ]

        return elements;
    }
}