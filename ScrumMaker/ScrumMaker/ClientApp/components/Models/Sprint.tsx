import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Team } from './Team'
import { SprintStage } from './SprintStage'
import { SprintHistory } from './SprintHistory'

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
