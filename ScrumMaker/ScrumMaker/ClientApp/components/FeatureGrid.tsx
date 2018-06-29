import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { FeaturesFiltersRow } from './Filters/FeaturesFiltersRow'
import { State } from './Models/FeatureState';

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

export class Feature {
    id: number;
    featureName: string;
    state: State;
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
            <td></td>
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
                this.setState({ feat: features, loading: false, filters: this.state.filters});
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
            <FeaturesFiltersRow
                display={this.filteringOn}
                onApply={this.ApplyFiltersHandler.bind(this)} />
            <tbody>
                {this.state.feat.map(f => f.renderAsTableRow())}
            </tbody>
        </table>
           
    }

    private GetHeader() {
        return <thead>
            <tr height="400px">
                <th className="well well-sm col-md-1" onClick={() => this.OrderBy("id")}>
                    <span className="nowrap"><a className="menu_links">ID</a></span>
                </th>
                <th className="well well-sm col-md-2" onClick={() => this.OrderBy("featureName")}>
                    <a className="menu_links">Name</a>
                    </th>
                <th className="well well-sm col-md-3" onClick={() => this.OrderBy("description")}>
                    <a className="menu_links">Description</a>
                        </th>
                    <th className="well well-sm col-md-2" onClick={() => this.OrderBy("stories")}>
                    <a className="menu_links">Stories</a>
                        </th>
                    <th className="well well-sm col-md-2" onClick={() => this.OrderBy("state")}>
                    <a className="menu_links">State</a>
                        </th>
                    <th className="well well-sm col-md-1" onClick={() => this.OrderBy("blocked")}>
                    <a className="menu_links">Blocked</a>
                        </th>
                <th className="well well-sm col-md-1">
                    <div onClick={this.FilterButtonClick.bind(this)}>
                            <span className="nowrap">
                            <a className="menu_links">Show filters</a>
                            <span className="caret"></span></span>
                    </div>
                </th>
            </tr>
        </thead>
    }

    private getURL(): string {
        var result = FeatureGrid.URL_BASE;
        result += FeatureGrid.URL_EXPANDS;
        if (this.filterString != '')
            result += this.filterString;
        result += FeatureGrid.URL_ORDERING;
        return result;
    }

    private FilterButtonClick(e: any) {
        this.filteringOn = !this.filteringOn
        this.forceUpdate();
    }

    private ApplyFiltersHandler(e: any) {
        this.filterString = e;
        this.LoadData();
    }

    private OrderBy(arg: string) {
        try {
            var featN = [];
            featN = this.state.feat as any[];
            if (this.lastOrderingArg === arg)
                this.lastOrderingDir = !this.lastOrderingDir;
            else
                this.lastOrderingDir = false;

            if (!this.lastOrderingDir)
                featN.sort((a, b) => this.SafeCompare(a, b, arg))
            else
                featN.sort((a, b) => -this.SafeCompare(a, b, arg))

            this.lastOrderingArg = arg;
            this.setState({ feat: featN as Feature[], loading: this.state.loading });
        } catch (e) {
            alert(e);
        }
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