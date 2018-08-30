import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { User } from './User'
import { IDbModel } from './Abstraction'


export class Team implements IDbModel {
    getId(): number {
        return this.id;
    }
    toArray(): any[] {
        let elements: any[] = [
            this.id,
            this.name,
            <div className="dropdown">
                <div id={this.id.toString()} role="button" data-toggle="dropdown" className="btn-dark scrum-btn btn-sm">Show Members <span className="caret"></span>
                </div>
                <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                {this.members.map(u => u.renderAsDropDown())}
            </ul>
        </div>
            ]
    
            return elements;
        }
    
        empty: boolean = true;
        name: string = "";
        id: number = -1;
        members: User[] = [];
    
    constructor(params: any) {
        if (!params)
            return;

        this.name = params.Name;
        this.id = params.Id;
        this.empty = false;

        var members = [];
        if (!params.Members)
            return;

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
            return <div id="nodata" role="button" data-toggle="dropdown" className="btn-dark scrum-btn btn-sm "> No Data </div>
        return <div className="dropdown">
            <div id={this.id.toString()} role="button" data-toggle="dropdown" className="btn-dark scrum-btn btn-sm" >
                {this.name} <span className="caret"></span>
            </div>
            <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                {this.members.map(u => u.renderAsDropDown())}
            </ul>
        </div>
    }
}


