import * as React from 'react';
import 'isomorphic-fetch';
import { User } from '../Models/User';
import { Grid } from './Grid';
import { IDbModel, IFetchState } from '../Models/IDbModel';

import { FiltersManager } from '../Filters/FiltersManager';
import { TextFilter } from '../Filters/TextFilter'
import { IntFilter } from '../Filters/IntFilter'
import { EnumFilter } from '../Filters/EnumFilter'
import { SprintStage } from '../Models/SprintStage'
import { EmptyFilter } from '../Filters/EmptyFilter';
import { BoolFilter } from '../Filters/BoolFilter';

export class UserGrid extends Grid {

    protected headerText: string = 'Users';
    protected URL_BASE: string = 'odata/users';
    protected URL_EXPANDS: string = '?$expand=Role,Team($expand=members)'
    protected URL_ORDERING: string = '&$orderby=userId'

    constructor() {
        super();
        this.state = { items: [] };
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
    protected GetFiltersRow(): JSX.Element {
        let filetrs = [
            new IntFilter({ filterKey: "userId" }),
            new TextFilter({ filterKey: "login" }),
            new TextFilter({ filterKey: "password" }),
            new TextFilter({ filterKey: "team/name" }),
            new BoolFilter({ filterKey: "activity" }),
            new TextFilter({ filterKey: "role/name" }),
        ]

        return <FiltersManager
            filters={filetrs}
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn}
            externalConstraints={this.customUrlFilters}
            />
    }
}


