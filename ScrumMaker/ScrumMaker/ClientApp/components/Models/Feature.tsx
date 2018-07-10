import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import 'isomorphic-fetch';
import { State } from './FeatureState';
import { Team } from '../Models/Team';
import { Story } from '../Models/Story';
import { NavLink } from 'react-router-dom';
import { User } from './User';

export class Feature {
    id: number;
    featureName: string;
    state: State;
    description: string;
    blocked: boolean;
    stories: Story[] = [];
    owner: User;
    programIncrement: string;

    public constructor(params: any) {
        this.id = params.Id;
        this.featureName = params.FeatureName;
        this.state = params.State;
        this.description = params.Description;
        this.blocked = params.Blocked;
        
        this.programIncrement = params.ProgramIncrement;

        if (params.Stories) {
            var stories = [];
            for (var i = 0; i < params.Stories.length; i++)
                stories[i] = new Story(params.Stories[i]);

            this.stories = stories;
        }
        
        this.owner = params.Owner;
        if (params.Owner) {
            this.owner = new User(params.Owner);
        }
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
                    <NavLink to={`featureEdit/${this.id}`} activeClassName='active'>
                        <span className="glyphicon glyphicon-edit dark" aria-hidden="true"></span>
                    </NavLink>
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