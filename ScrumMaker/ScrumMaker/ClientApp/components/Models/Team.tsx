import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import {User} from './User'


export class Team {

    empty: boolean = true;
    name: string = "";
    id: number = -1;
    members: User[] = [];

    constructor(params: any) {

        if (params === null || params === undefined) {
            return;
        }
        this.name = params.Name;
        this.id = params.Id;
        this.empty = false;

        //var members = params.members.map( u => new User(u));
        var members = [];
        for (var i = 0; i < params.Members.length; i++) {
            members[i] = new User(params.Members[i]);

        }

        this.members = members;
    }

    public toString(): string {
        if (this.empty)
            return "";
        return this.name;
    }

    renderAsMenu() {
        if (this.empty)
            return <div id="nodata" role="button" data-toggle="dropdown" className="btn btn-sm "> No Data </div>
        return <div className="dropdown">
            <div id={this.id.toString()} role="button" data-toggle="dropdown" className="btn btn-sm btn-primary" >
                {this.name} <span className="caret"></span>
            </div>
            <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                {this.members.map(u => u.renderAsDropDown())}
            </ul>
        </div>
    }

    renderForecastsTable() {
        return <tr key={this.id}>
            <td>{this.id}</td>
            <td scope="row">{this.name}</td>
            <td><select className="btn btn-sm btn-primary" role="button" data-toggle="dropdown">
                {this.members.map(u =>
                    <option>{u.login}</option>
                )}
            </select>
            </td>
            <td>
            </td>
        </tr>;
    }
}


