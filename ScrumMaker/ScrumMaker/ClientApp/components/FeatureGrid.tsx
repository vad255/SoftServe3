import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

class Team {
    id: number = -1;
    name: string = "";

    constructor(params: any) {
        this.id = params.id;
        this.name = params.name;
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

        this.id = params.id;
        this.name = params.name;
        this.description = params.description;
        this.status = params.status;
        this.empty = false;
        if (params.team === null || params.team === undefined)
            return;

        this.team = new Team(params.team);
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
        this.id = params.id;
        this.featureName = params.featureName;
        this.state = params.state;
        this.description = params.description;
        this.blocked = params.blocked;
        if (params.stories === null || params.stories === undefined)
            return;
        
        var stories = [];
        for (var i = 0; i < params.stories.length; i++)
            stories[i] = new Story(params.stories[i]);
        
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
    constructor() {
        super();
        this.state = { feat: [], loading: true };

        fetch('api/Feature/FeatureGet')
            .then(response => response.json() as Promise<Feature[]>)
            .then(data => {
                var features = [];
                for (var i = 0; i < data.length; i++)
                    features[i] = new Feature(data[i]);

                console.log(features);
                this.setState({ feat: features, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FeatureGrid.featuresTable(this.state.feat);

        return <div>
            <h1>Feature screen</h1>
            <p>This component demonstrates Feature from the database.</p>
            {contents}
        </div>;
    }

    private static featuresTable(features: Feature[]) {
        return <table className='table table-scrum table-hover td-scrum'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Stories</th>
                    <th>State</th>
                    <th>Blocked</th>
                </tr>
            </thead>
            <tbody>
                {
                    features.map(feature => feature.renderAsTableRow())
                }
            </tbody>
        </table>
    }
}