import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Team } from './Team'
import { SprintStage } from './SprintStage'

enum DisplayMod {
    read,
    noData,
    edit
}

export class Sprint extends React.Component {
    id: number = -1;
    name: string = '';
    stage: SprintStage = 0;
    history: SprintHistory;
    backlog: string = '';
    defects: string = '';
    dailyScrums: string = '';
    review: string = '';
    retrospective: string = '';
    team: Team;

    mod: DisplayMod = DisplayMod.noData;

    public constructor(params: any) {

        super(params);

        if (params === null || params === undefined) {
            return;
        }

        this.id = params.Id;
        this.name = params.Name;
        this.stage = params.Stage;
        this.history = new SprintHistory(params.History);
        this.backlog = params.Backlog;
        this.defects = params.Defects;
        this.dailyScrums = params.DailyScrums;
        this.review = params.Review;
        this.retrospective = params.Retrospective;
        this.team = new Team(params.Team);

        this.mod = DisplayMod.read;
    }

    public toString(): string {
        return this.id.toString();
    }

    public render() {
        switch (this.mod) {
            case DisplayMod.read:
                return this.renderAsTableRow();

            //case DisplayMod.edit:
            //    return this.renderAsInput();

            case DisplayMod.noData:
                return (null);

        }
        return <form><text>Hello</text><button>Submit</button></form>

    }

    public renderAsTableRow() {
        return <tr key={this.id}>
            <td className="align-base">{this.id}</td>
            <td className="align-base">{this.name}</td>
            <td className="align-base">{this.team.renderAsMenu()}</td>
            <td className="align-base">{this.stage}</td>
            <td className="align-base">{this.review}</td>
            <td className="align-base">{this.history.renderAsMenu()}</td>
            <td className="align-base">{this.retrospective}</td>
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
}


export class SprintHistory extends React.Component {

    public empty: boolean = true;
    public id: number = -1;
    initiated: Date;
    planned: Date;
    begined: Date;
    reviewDone: Date;
    retrospectiveDone: Date;

    constructor(params: any) {
        super(params);
        if (params === null || params === undefined) {
            return;
        }

        this.initiated = new Date(params.Initiated);
        this.planned = new Date(params.Planned);
        this.begined = new Date(params.Begined);
        this.reviewDone = new Date(params.ReviewDone);
        this.retrospectiveDone = new Date(params.RetrospectiveDone);

        this.id = params.Id;
        this.empty = false;
    }

    public toString(): string {
        if (this.empty)
            return "";
        return this.initiated.toLocaleDateString();
    }

    public renderAsMenu() {
        if (this.empty)
            return <div id="nodata" role="button" data-toggle="dropdown" className="btn btn-sm btn-default"> No Data </div>
        else
            return <div className="dropdown">
                <div id={this.id.toString()} role="button" data-toggle="dropdown" className="btn btn-sm btn-primary" >
                    History <span className="caret"></span>
                </div>
                <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                    <li className="dropListItem"><pre>Initiated:     {this.initiated.toLocaleDateString()}</pre></li>
                    <li className="dropListItem"><pre>Planned:       {this.planned.toLocaleDateString()}</pre></li>
                    <li className="dropListItem"><pre>Beginned:      {this.begined.toLocaleDateString()}</pre></li>
                    <li className="dropListItem"><pre>Review:        {this.reviewDone.toLocaleDateString()}</pre></li>
                    <li className="dropListItem"><pre>Retrospective: {this.retrospectiveDone.toLocaleDateString()}</pre></li>
                </ul>
            </div>
    }
}
