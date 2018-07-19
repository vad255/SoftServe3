import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import 'isomorphic-fetch';
import { State } from './FeatureState';
import { Team } from './Team';
import { Story } from './Story';
import { NavLink } from 'react-router-dom';
import { IDbModel } from './Abstraction'
import { User } from './User';


export class Feature implements IDbModel {
    
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
    
    getId(): number {
        return this.id;
    }

    toArray(): any[] {
        let elements: any[] = [
            this.id,
            this.featureName,
            this.description,
            this.renderStories(),
            this.state,
            this.blocked === true ? "true" : "false"
        ]

        return elements;
    }

    public renderStories() {
        if (this.stories === null || this.stories === undefined || this.stories.length < 1)
            return <p>No stories</p>
        return <div className="dropdown">
            <div id={this.id.toString()} role="button" data-toggle="dropdown" className="btn btn-sm btn-primary" >
                Stories<span className="caret"></span>
            </div>
            <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                {this.stories.map((s,i) => s.renderAsMenu(i))}
            </ul>
        </div>
    }
}