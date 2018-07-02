﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { StoriesFiltersRow } from "../Filters/StoriesFiltersRow";
import { Grid } from './Grid';
import { Story } from "../Models/Story";


interface IStoryDataState {
    stories: Story[];
}


export class StoriesGrid extends Grid<RouteComponentProps<{}>, IStoryDataState> {

    protected URL_BASE: string = 'odata/stories';
    protected URL_EXPANDS: string = '?&expand=()';
    protected URL_ORDERING: string = '&$orderby=id';
    protected headerText: string = 'Stories';

    protected pageSize = 5;

    constructor() {
        super();
        this.LoadData();
    }


    protected OnDataReceived(data: any) {
        this.isLoading = false;
        var stories1 = (data as any[]).map(s => new Story(s));
        this.setState({ stories: stories1 });

    }

    protected getData() {
        return this.state.stories;
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
    protected GetBodyRows(): JSX.Element[] {
        var i = 0;
        return this.state.stories.map(s => s.renderAsTableRow());
    }

    protected RenderFooter() {
        return <tr>
            <td colSpan={8}>
                <div className="text-center">
                    <div role='button' className='btn btn-primary'>
                        Add new
                    </div>
                </div>
            </td>
        </tr>;
    }
}



