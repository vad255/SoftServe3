import * as React from 'react';
import 'isomorphic-fetch';
import { User } from '../Models/User';
import { Grid } from './Grid';
import { UsersFiltersRow } from '../Filters/UsersFilterRow';
import { IDbModel, IFetchState } from '../Models/IDbModel';


export class UserGrid extends Grid {

    protected headerText: string = 'Users';
    protected URL_BASE: string = 'odata/users';
    protected URL_EXPANDS: string = '?$expand=Role,Team($expand=members)'
    protected URL_ORDERING: string = '&$orderby=userId'

    constructor() {
        super();
        this.state = { items: [] };

        this.LoadData();
    }


    protected instantiate(item: any): IDbModel {
        return new User(item);
    }

    protected onCatch(e: any) {
        this.props.history.push('/login')
    }

    protected GetHeaderRow(): JSX.Element {
        return <tr>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("userId")}><span className="nowrap">Database ID</span></th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("login")}>Login</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("password")}>Password</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("teamId")}>TeamId</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("activity")}>Activity</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("roleId")}>RoleId</th>
            <th className="well menu_links col-md-1">
                <div onClick={this.FilterButtonClick.bind(this)}>
                    <span className="nowrap">Show Filters<span className="caret"></span></span>
                </div>
            </th>
        </tr>;
    }
    protected URL_EDIT = "UserEdit/";

    protected GetFiltersRow(): JSX.Element {
        return <UsersFiltersRow
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn}
        />
    }
}


