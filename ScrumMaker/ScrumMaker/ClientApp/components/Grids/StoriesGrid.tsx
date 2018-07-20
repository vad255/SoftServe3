import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Grid } from './Grid';
import { Story, StoryStatus } from "../Models/Story";
import { IDbModel } from '../Models/Abstraction';


import { FiltersManager } from '../Filters/FiltersManager';
import { TextFilter } from '../Filters/TextFilter'
import { IntFilter } from '../Filters/IntFilter'
import { EnumFilter } from '../Filters/EnumFilter'
import { SprintStage } from '../Models/SprintStage'
import { EmptyFilter } from '../Filters/EmptyFilter';

export class StoriesGrid extends Grid {

    protected URL_BASE: string = 'odata/stories';
    protected URL_EXPANDS: string = '?&$expand=feature';
    protected URL_ORDERING: string = '&$orderby=id';
    protected URL_FEATUREID_FILTER: string = 'feature/id eq ';
    protected headerText: string = 'Stories';
    protected URL_EDIT: string = "EditStory/";

    constructor() {
        super();
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

        let filetrs = [
            new IntFilter({ filterKey: "id" }),
            new TextFilter({ filterKey: "name" }),
            new TextFilter({ filterKey: "description" }),
            new EnumFilter({ filterKey: "status", enumType: StoryStatus })
        ]

        return <FiltersManager
            ref={this.FILTER_MANAGER_REF}
            filters={filetrs}
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn}
            externalConstraints={this.customUrlFilters}
        />
    }
}




