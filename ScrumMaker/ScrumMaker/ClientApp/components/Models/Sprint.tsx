import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Team } from './Team'
import { Story } from './Story';
import { SprintStage } from './SprintStage'
import { SprintHistory } from './SprintHistory'
import { IDbModel, ICommitableDbModel } from './Abstraction'


export class Sprint implements ICommitableDbModel {

    id: number = -1;
    name: string = '';
    stage: SprintStage = 0;
    historyId: number = -1;
    history: SprintHistory;
    backlog: Story [] = [];
    defects: string = '';
    dailyScrums: string = '';
    goal: string = '';
    retrospective: string = '';
    teamId: number = -1;
    team: Team;

    public constructor(params: any) {
        if (!params)
            return;

        this.id = params.Id;
        this.name = params.Name;
        this.stage = params.Stage;
        this.historyId = params.HistoryId;
        this.history = new SprintHistory(params.History);
        this.defects = params.Defects;
        this.dailyScrums = params.DailyScrums;
        this.goal = params.Goal;
        this.retrospective = params.Retrospective;
        this.teamId = params.TeamId;
        this.team = new Team(params.Team);

        if (params.Backlog) {
            var backlog = [];
            for (var i = 0; i < params.Backlog.length; i++)
                backlog[i] = new Story(params.Backlog[i]);

            this.backlog = backlog;
        }
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
            <div className='align-base m-tooltip'> {this.cutStirng(this.goal, 15)}
                <span className="m-tooltiptext"> {this.goal}</span>
            </div>,
            this.history.renderAsMenu()
        ]

        return elements;
    }
    public getId() {
        return this.id
    }
    public getUpdateModel() {
        return {
            Name: this.name,
            TeamId: this.teamId,
            HistoryId: this.historyId,
            Stage: this.stage,
            Goal: this.goal,
            Retrospective: this.retrospective,
        };
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
