import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';



export class Role extends React.Component {

    empty: boolean = true;
    roleId: number = -1;
    name: string = '';


    public constructor(params: any) {

        super(params);

        if (params === null || params === undefined) {
            return;
        }
        this.roleId = params.RoleId;
        this.name = params.Name;
        this.empty = false;
    }


    public render() {
        return this.renderAsDropDown();


    }

    renderAsDropDown() {
        if (this.empty)
            return <li key="nodata"><div> nodata </div></li>;
        return <li key={this.roleId.toString()} className="dropdown-submenu">
            <div> {this.name} </div>
            <ul className="dropdown-menu">
                <li className="dropListItem"><b><pre>UserID:  {this.roleId}</pre></b> </li>
                <li className="dropListItem"><b><pre>Login:   {this.name}</pre></b> </li>
            </ul>
        </li>
    }
}