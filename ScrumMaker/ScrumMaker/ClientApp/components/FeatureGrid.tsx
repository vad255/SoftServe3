import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

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

}

export class FeatureGrid extends React.Component<RouteComponentProps<{}>, FetchFeatures> {
    static readonly URL_BASE: string = 'odata/feature';
    static readonly URL_EXPANDS: string = '?$expand=stories($expand=team)';

    constructor() {
        super();
        this.state = { feat: [], loading: true }
        this.LoadData();
        };
    
    private LoadData() {
        fetch(this.getURL())
            .then(response => response.json() as any)
            .then(data => {
                var features = [];
                for (var i = 0; i < data['value'].length; i++)
                    features[i] = new Feature(data["value"][i]);
                this.setState({ feat: features, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.featuresTable(this.state.feat);

        return <div>
            <h1>Feature screen</h1>
            <p>This component demonstrates Feature from the database.</p>
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
            </tr>
        </thead>
    }

    private getURL(): string {
        var result = FeatureGrid.URL_BASE;
        result += FeatureGrid.URL_EXPANDS;
        return result;
    }
}