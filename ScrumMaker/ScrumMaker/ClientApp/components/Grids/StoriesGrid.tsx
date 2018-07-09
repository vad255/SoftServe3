import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { StoriesFiltersRow } from "../Filters/StoriesFiltersRow";
import { Grid } from './Grid';
import { Story } from "../Models/Story";
import { IDbModel, IFetchState } from '../Models/IDbModel';


export class StoriesGrid extends Grid {

    protected URL_BASE: string = 'odata/stories';
    protected URL_EXPANDS: string = '?&expand=()';
    protected URL_ORDERING: string = '&$orderby=id';
    protected headerText: string = 'Stories';
    protected URL_EDIT: string = "EditStory/"

    constructor() {
        super();
        this.LoadData();
    }


    protected instantiate(item: any): IDbModel {
        return new Story(item);
    }


    protected GetHeaderRow() {
        return <tr>
            <th className="well well-sm col-md-1" onClick={() => this.OrderBy("id")}><span className="nowrap">Database ID</span></th>
            <th className="well well-sm col-md-2" onClick={() => this.OrderBy("name")}>Name</th>
            <th className="well well-sm col-md-4" onClick={() => this.OrderBy("description")}>Description</th>
            <th className="well well-sm col-md-3" onClick={() => this.OrderBy("status")}>Status</th>
            <th className="well well-sm col-md-3">
                <div onClick={this.FilterButtonClick.bind(this)}>
                    <span className="nowrap">Show Filters<span className="caret"></span></span>
                </div>
            </th>
        </tr>;
    }

    protected GetFiltersRow() {

        return <StoriesFiltersRow
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn} />;
    }
}




