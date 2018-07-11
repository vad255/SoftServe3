import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Team } from '../Models/Team';
import { User } from '../Models/User';
import { Grid } from './Grid';
import { IDbModel, IFetchState } from '../Models/IDbModel';

import { FiltersManager } from '../Filters/FiltersManager';
import { TextFilter } from '../Filters/TextFilter'
import { IntFilter } from '../Filters/IntFilter'
import { EnumFilter } from '../Filters/EnumFilter'
import { SprintStage } from '../Models/SprintStage'
import { EmptyFilter } from '../Filters/EmptyFilter';

export class TeamGrid extends Grid {

    constructor() {
        super();
    }

    protected headerText: string = "Team Grid";
    protected URL_BASE: string = 'odata/teams';
    protected URL_EXPANDS: string = '?$expand=members'
    protected URL_ORDERING: string = '&$orderby=id'


    protected instantiate(item: any): IDbModel {
        return new Team(item);
    }

    protected GetHeaderRow(): JSX.Element {
        return <tr>
            <th className="well well-sm col-md-2" onClick={() => this.OrderBy("id")}><span className="nowrap">Database ID</span></th>
            <th className="well well-sm col-md-2" onClick={() => this.OrderBy("name")}>Name</th>
            <th className="well well-sm col-md-2">Members</th>
            <th className="well well-sm col-md-1">
                <div onClick={this.FilterButtonClick.bind(this)}>
                    <span className="nowrap">Show Filters<span className="caret"></span></span>
                </div>
            </th>
        </tr>;
    }
    protected GetFiltersRow(): JSX.Element {
        let filetrs = [
            new IntFilter({ filterKey: "id"}),
            new TextFilter({ filterKey: "name"}),
            new EmptyFilter()
        ]

        return <FiltersManager
            filters={filetrs}
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn}
            externalConstraints={this.customUrlFilters}
            />
    }
}

