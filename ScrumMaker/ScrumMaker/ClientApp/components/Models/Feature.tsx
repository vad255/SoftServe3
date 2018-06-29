import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { State } from './FeatureState';
import { Team } from '../Models/Team';
import { Story } from '../Models/Story';

//class Team {
//    id: number = -1;
//    name: string = "";

//    constructor(params: any) {
//        this.id = params.Id;
//        this.name = params.Name;
//    }
//}

export class Feature {
    id: number;
    featureName: string;
    state: State;
    description: string;
    blocked: boolean;
    stories: Story[] = [];

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
            <td className="align-base">{this.id}</td>
            <td className="align-base">{this.featureName}</td>
            <td className="align-base">{this.description}</td>
            <td className="align-base">{this.renderStories()}</td>
            <td className="align-base">{this.state}</td>
            <td className="align-base">{this.blocked === true ? "true" : "false"}</td>
            <td className="align-base">
                <div id={this.id.toString()} role="button" className="btn btn-sq-xs align-base ">
                    <span className="glyphicon glyphicon-edit dark" aria-hidden="true"></span>
                </div>
                &nbsp;&nbsp;
                <div id={this.id.toString()} role="button" className="btn btn-sq-xs align-base">
                    <span className="glyphicon glyphicon-trash dark" aria-hidden="true"></span>
                </div>
            </td>
        </tr>;
    }

    public renderStories() {
        if (this.stories === null || this.stories === undefined || this.stories.length < 1)
            return <p>No stories</p>
        return <div className="dropdown">
            <div id={this.id.toString()} role="button" data-toggle="dropdown" className="btn btn-sm btn-primary" >
                Stories<span className="caret"></span>
            </div>
            <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                {this.stories.map(s => s.renderAsMenu())}
            </ul>
        </div>
    }
}