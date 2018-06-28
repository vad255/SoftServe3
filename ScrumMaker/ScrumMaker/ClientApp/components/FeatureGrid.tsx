import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Filter, IFilterConfiguration } from './Filters/file';

class Team {
    id: number = -1;
    name: string = "";

    constructor(params: any) {
        this.id = params.Id;
        this.name = params.Name;
    }
}

class Story {
    empty: boolean = true;
    id: number = -1;
    name: string = "";
    description: string = "";
    status: string = "";
    team: Team;

    constructor(params: any) {
        if (params === null || params === undefined)
            return;

        this.id = params.Id;
        this.name = params.Name;
        this.description = params.Description;
        this.status = params.Status;
        this.empty = false;
        if (params.Team === null || params.Team === undefined)
            return;

        this.team = new Team(params.Team);
    }

    renderAsMenu() {
        if (this.empty)
            return "NoData"
        return <li className="dropdown-submenu">
            <div > {this.name} </div>
            <ul className="dropdown-menu">
                <li className="dropdown-item"><b><pre>Story name: {this.name}</pre></b>  </li>
                <li className="dropdown-item"><b><pre>Description: {this.description}</pre></b> </li>
                <li className="dropdown-item"><b><pre>Status: {this.status}</pre></b> </li>
                <li className="dropdown-item"><b><pre>Team: {(this.team === null || this.team === undefined) ? "None" : this.team.name}</pre></b> </li>
            </ul>
        </li>      
    }
}

class Feature {
    id: number;
    featureName: string;
    state: number;
    description: string;
    blocked: boolean;
    stories: Story[]=[];

    public constructor(params: any) {
        this.id = params.Id;
        this.featureName = params.FeatureName;
        this.state = params.State;
        this.description = params.Description;
        this.blocked = params.Blocked;
        if (params.Stories === null || params.Stories === undefined)
            return;
        
        var stories = [];
        for (var i = 0; i < params.Stories.length; i++)
            stories[i] = new Story(params.Stories[i]);
        
        this.stories = stories;
    }

    public renderAsTableRow() {
        return <tr key={this.id}>
            <td>{this.id}</td>
            <td>{this.featureName}</td>
            <td>{this.description}</td>
            <td>{this.renderStories()}</td>
            <td>{this.state}</td>
            <td>{this.blocked === true ? "true" : "false"}</td>
        </tr>;
    }

    public renderStories() {
        if (this.stories === null || this.stories === undefined || this.stories.length < 1)
            return <p>No stories</p>
        return <div className="dropdown">
            <div id="{this.id}" role="button" data-toggle="dropdown" className="btn-dropdown" >
                Stories<span className="caret"></span>
            </div>
            <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                {this.stories.map(s => s.renderAsMenu())}
            </ul>
        </div>
    }
}

interface FetchFeatures {
    feat: Feature[];
    loading: boolean;
    filters: any;

}

export class FeatureGrid extends React.Component<RouteComponentProps<{}>, FetchFeatures> {
    static readonly URL_BASE: string = 'odata/feature';
    static readonly URL_EXPANDS: string = '?$expand=stories($expand=team)';
    static readonly URL_ORDERING: string = '&$orderby=id';

    constructor() {
        super();
        this.state = { feat: [], loading: true, filters: [] }
        this.LoadData();
    };

    private filteringOn: boolean = false;
    private filterString: string = "";
    private lastOrderingArg: string = "";
    private lastOrderingDir: boolean = false;
    
    private LoadData() {
        fetch(this.getURL())
            .then(response => response.json() as any)
            .then(data => {
                var features = [];
                for (var i = 0; i < data['value'].length; i++)
                    features[i] = new Feature(data['value'][i]);
                this.setState({ feat: features, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.featuresTable(this.state.feat);

        return <div>
            <h1>Feature screen</h1>
            {contents}
        </div>;
    }

    private featuresTable(features: Feature[]) {
        return <table className='table table-scrum table-hover td-scrum'>
            {this.GetHeader()}
           
            <tbody>
                {this.state.feat.map(f => f.renderAsTableRow())}
            </tbody>
        </table>
           
    }

    private GetHeader() {
        return <thead>
            <tr>
                <th><span className="nowrap">Id</span></th>
                <th>Name</th>
                <th>Description</th>
                <th>Stories</th>
                <th>State</th>
                <th>Blocked</th>
                <th className="well well-sm">
                    <div onClick={this.FilterButtonClick.bind(this)}>
                        <span className="nowrap">Show filters<span className="caret"></span></span>
                    </div>
                </th>
            </tr>
        </thead>
    }

    //private getFiltersLine() {
    //    return <tr className={this.filteringOn ? "" : "nodisplay"}>
    //        <td>
    //            <IntFilter filterKey='id' onFilterChanged={this.FilterChanged.bind(this)} />
    //        </td>
    //        <td>
    //            <TextFilter filterKey='name' onFilterChanged={this.FilterChanged.bind(this)} />
    //        </td>
    //        <td>
    //            <TextFilter filterKey='description' onFilterChanged={this.FilterChanged.bind(this)} />
    //        </td>
    //        <td>
    //            <TextFilter filterKey='story' onFilterChanged={this.FilterChanged.bind(this)} />
    //        </td>
    //        <td>
    //            <EnumFilter filterKey='state' enumType={State} onFilterChanged={this.FilterChanged.bind(this)} />
    //        </td>
    //        <td>
    //            <TextFilter filterKey='blocked' onFilterChanged={this.FilterChanged.bind(this)} />
    //        </td>
    //        <td>
    //            <div role="button" className="btn btn-sq-xs align-base " onClick={this.CancelFiltersClick.bind(this)}>
    //                <span className="glyphicon glyphicon-remove-circle dark" aria-hidden="true"></span>
    //            </div>
    //            &nbsp;&nbsp;
    //        <div role="button" className="btn btn-sq-xs align-base" onClick={this.ApplyFiltersClick.bind(this)}>
    //                <span className="glyphicon glyphicon-ok dark" aria-hidden="true"></span>
    //            </div>
    //        </td>
    //    </tr>
    //}

    private getURL(): string {
        var result = FeatureGrid.URL_BASE;
        result += FeatureGrid.URL_EXPANDS;
        if (this.filterString != '')
            result += this.filterString;
        result += FeatureGrid.URL_ORDERING;
        return result;
    }

    private ApplyFiltersClick(e: any) {
        this.filterString = Filter.QUERY_HEAD;
        var i = 0;
        for (let iterator in this.state.filters) {
            if (this.state.filters[iterator] === '')
                continue;

            i++;
            if (i !== 1)
                this.filterString += Filter.CONSTRAIN_DIVIDER;
            this.filterString += this.state.filters[iterator];
        }

        if (i === 0) {
            this.filterString = '';
        }

        this.LoadData();

    }

    private CancelFiltersClick(e: any) {
        (document.getElementById("idFilter") as any).value = '';
        (document.getElementById("nameFilter") as any).value = '';
        (document.getElementById("descriptionFilter") as any).value = '';
        (document.getElementById("storiesFilter") as any).value = '';
        (document.getElementById("stateFilter") as any).value = '';
        (document.getElementById("blockedFilter") as any).value = '';
    }

    private FilterButtonClick(e: any) {
        this.filteringOn = !this.filteringOn
        this.forceUpdate();
    }

    private SafeCompare(a: any, b: any, arg: string) {
        if (a === undefined || b === undefined ||
            a[arg] === undefined || b[arg] === undefined)
            return 0;
        else
            return this.Compare(a[arg], b[arg])
    }

    private Compare(a: any, b: any): number {
        if (typeof a === 'number' && typeof b === 'number')
            return a - b;
        else
            return a.toString().localeCompare(b.toString());
    }
}