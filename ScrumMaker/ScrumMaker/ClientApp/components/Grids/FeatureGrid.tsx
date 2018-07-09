import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Feature } from '../Models/Feature';
import { FeaturesFiltersRow } from '../Filters/FeaturesFiltersRow'
import { Grid } from './Grid'

interface IFeatureDataFetchingState {
    features: Feature[];
}

export class FeatureGrid extends Grid<RouteComponentProps<{}>, IFeatureDataFetchingState> {
    protected URL_BASE: string = 'odata/feature';
    protected URL_EXPANDS: string = '?$expand=stories($expand=team)';
    protected URL_ORDERING: string = '&$orderby=id';
    protected headerText: string = 'Feature';
   // protected pageSize: number = 10;

    constructor() {
        super();
        this.LoadData();
    };

    protected OnDataReceived(data: any) {
        this.isLoading = false;
        var featuresTemp = [];
        for (var i = 0; i < data['value'].length; i++)
            featuresTemp[i] = new Feature(data['value'][i]);

        this.setState({ features: featuresTemp});
    }

    protected getData() {
        return this.state.features;
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
        return <FeaturesFiltersRow
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn}
        />
    }

    protected GetBodyRows() {
        return this.state.features.map((f) => f.renderAsTableRow());
    }
        
}