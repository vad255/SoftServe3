import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Team } from '../Models/Team';

export class Story {
    empty: boolean = true;
    id: number = -1;
    name: string = "";
    description: string = "";
    status: string = "";
    team: Team;

    constructor(params: any) {
        if (params === null || params === undefined)
            return;

        this.id = params.Id;
        this.name = params.Name;
        this.description = params.Description;
        this.status = params.Status;
        this.empty = false;
        if (params.Team === null || params.Team === undefined)
            return;

        this.team = new Team(params.Team);
    }

    renderAsMenu() {
        if (this.empty)
            return "NoData"
        return <li className="dropdown-submenu">
            <div > {this.name} </div>
            <ul className="dropdown-menu">
                <li className="dropdown-item"><b><pre>Story name: {this.name}</pre></b>  </li>
                <li className="dropdown-item"><b><pre>Description: {this.description}</pre></b> </li>
                <li className="dropdown-item"><b><pre>Status: {this.status}</pre></b> </li>
                <li className="dropdown-item"><b><pre>Team: {(this.team === null || this.team === undefined) ? "None" : this.team.name}</pre></b> </li>
            </ul>
        </li>
    }
}