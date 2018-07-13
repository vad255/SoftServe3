import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Team } from './Team'
import { SprintStage } from './SprintStage'
import { SprintHistory } from './SprintHistory'
import { IDbModel } from './IDbModel'


export class Sprint implements IDbModel {
    id: number = -1;
    name: string = '';
    stage: SprintStage = 0;
    history: SprintHistory;
    backlog: string = '';
    defects: string = '';
    dailyScrums: string = '';
    review: string = '';
    retrospective: string = '';
    teamId: number = -1;
    team: Team;

    public constructor(params: any) {
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
        this.teamId  = params.TeamId;
        this.team = new Team(params.Team);
    }

    public toString(): string {
        return this.id.toString();
    }

    public toArray(): any[] {

        let elements: any[] = [
            this.id,
            this.name,
            this.team != undefined ? this.team.renderAsMenu() : "",
            this.stage,
            <div className='align-base m-tooltip'> {this.cutStirng(this.review, 15)}
                <span className="m-tooltiptext"> {this.review}</span>
            </div>,
            this.history.renderAsMenu(),
            <div className='align-base m-tooltip'>{this.cutStirng(this.retrospective, 15)}
                <span className="m-tooltiptext">{this.retrospective}</span>
            </div>
        ]

        return elements;
    }
    getId() {
        return this.id
    }


    private cutStirng(str: string, targetLength: number): string {

        if (str === null || str === undefined)
            return "";

        if (targetLength >= str.length)
            return str;

        if (targetLength <= 0)
            return "";

        if (targetLength < 4)
            return str.substring(0, targetLength);

        if (targetLength < 7)
            return str.substring(0, targetLength - 2) + "..";

        return str.substring(0, targetLength - 3) + "...";
    }
}
