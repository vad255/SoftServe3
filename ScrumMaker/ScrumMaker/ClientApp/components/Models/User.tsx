import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';


export class User {

    empty: boolean = true;
    constructor(params: any) {
        if (params === null || params === undefined) {
            return;
        }

        this.activity = params.Activity;
        this.login = params.Login;
        this.password = params.Password;
        this.roleId = params.RoleId;
        this.userId = params.UserId;
        
        this.empty = false;
    }

    activity: boolean = false;
    login: string = "";
    password: string = "";
    roleId: number = -1;
    userId: number = -1;

    public toString() : string {
        if (this.empty)
            return "";
        return this.login;
    }

    renderAsDropDown() {
        if (this.empty)
           return <li key="undefined" id="undefined"><div> undefined </div></li>;
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
}