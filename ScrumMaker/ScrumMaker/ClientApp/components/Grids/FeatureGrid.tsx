import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Feature } from '../Models/Feature';
import { Grid } from './Grid'
import { IDbModel } from '../Models/IDbModel';

import { FiltersManager } from '../Filters/FiltersManager';
import { TextFilter } from '../Filters/TextFilter'
import { IntFilter } from '../Filters/IntFilter'
import { EnumFilter } from '../Filters/EnumFilter'
import { SprintStage } from '../Models/SprintStage'
import { EmptyFilter } from '../Filters/EmptyFilter';
import { State } from '../Models/FeatureState';

interface IFeatureDataFetchingState {
    features: Feature[];
}

export class FeatureGrid extends Grid{
    
    protected URL_BASE: string = 'odata/feature';
    protected URL_EXPANDS: string = '?$expand=stories($expand=team)';
    protected URL_ORDERING: string = '&$orderby=id';
    protected headerText: string = 'Feature';
    protected URL_EDIT :string = "featureEdit/"
    
    constructor() {
        super();
        this.LoadData();
    };

    protected instantiate(item: any): IDbModel {
        return new Feature(item);
    }

    protected GetHeaderRow() {
        return <tr>
                <th className="well col-md-1 menu_links" onClick={() => this.OrderBy("id")}>
                    <span className="nowrap">ID</span>
                </th>
                <th className="well col-md-2 menu_links" onClick={() => this.OrderBy("featureName")}>Name
                    </th>
                <th className="well col-md-3 menu_links" onClick={() => this.OrderBy("description")}>Description
                    </th>
                <th className="well col-md-2 menu_links" onClick={() => this.OrderBy("stories")}>Stories
                    </th>
                <th className="well col-md-2 menu_links" onClick={() => this.OrderBy("state")}>State
                    </th>
                <th className="well col-md-1 menu_links" onClick={() => this.OrderBy("blocked")}>Blocked
                    </th>
                <th className="well col-md-1 menu_links">
                    <div onClick={this.FilterButtonClick.bind(this)}>
                        <span className="nowrap ">Show filters<span className="caret"></span></span>
                    </div>
                </th>
            </tr>
    }
    
    protected GetFiltersRow() {




        let filetrs = [
            new IntFilter({ filterKey: "id"}),
            new TextFilter({ filterKey: "featureName"}),
            new TextFilter({ filterKey: "description"}),
            new EmptyFilter(),
            new EnumFilter({ filterKey: "state", enumType: State}),
            new TextFilter({ filterKey: "blocked"}),
        ]

        return <FiltersManager
            filters={filetrs}
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn}
            externalConstraints=""
            />
    }      
}