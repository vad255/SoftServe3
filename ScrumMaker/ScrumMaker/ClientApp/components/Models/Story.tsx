import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Team } from './Team';
import { Link } from 'react-router-dom';
import { IDbModel } from './Abstraction';
import { Task } from './Task';
import { Sprint } from './Sprint';



export enum StoryStatus {
    PendingApproval = 1,
    ReadyToStart = 2,
    InProgress = 3,
    DevComplete = 4,
    TestComplete = 5,
    Accepted = 6
}

export class Story implements IDbModel {
    id: number = -1;
    name: string = '';
    status: StoryStatus = 0;
    description: string = '';
    team: Team;
    userId: number = 0;
    sprint: Sprint;
    tasks: Task[];
    sprintId: number = 0;


    public constructor(params: any) {

        if (params === null || params === undefined) {
            return;
        }

        this.id = params.Id;
        this.name = params.Name;
        this.status = params.Status;
        this.description = params.Description;
        this.userId = params.UserId;
        this.sprintId = params.SprintId;
        if (params.Sprint)
            this.sprint = new Sprint(params.Sprint);
        if (params.Team)
            this.team = new Team(params.Team);

        var tasks = [];

        if (params.Tasks) {
            for (var i = 0; i < params.Tasks.length; i++)
                tasks[i] = new Task(params.Tasks[i]);
            this.tasks = tasks;
        } 
    }

    public toString(): string {
        return this.id.toString();
    }

    getStatus(status: any) {
        switch (status) {
            case "PendingApproval":
                return "Pending approval";
            case "ReadyToStart":
                return "Ready to start";
            case "InProgress":
                return "In progress";
            case "DevComplete":
                return "Developing complete";
            case "TestComplete":
                return "Test complete";
            case "Accepted":
                return "Accepted";
            default:
                return "";
        }
    }


    getId(): number {
        return this.id;
    }
    toArray(): any[] {
        let elements: any[] = [
            this.id,
            this.name,
            this.description,
            this.getStatus(this.status),
            this.sprintId
        ];

        return elements;
    }

    renderAsMenu(key: number) {
        return <li key={key} className="dropdown-submenu">
            <div > {this.name} </div>
            <ul className="dropdown-menu">
                <li className="dropdown-item"><b><pre>Story name: {this.name}</pre></b> </li>
                <li className="dropdown-item"><b><pre>Description: {this.description}</pre></b> </li>
                <li className="dropdown-item"><b><pre>Status: {this.status}</pre></b> </li>
                <li className="dropdown-item"><b><pre>Team: {(this.team === null || this.team === undefined)
                    ? "None"
                    : this.team.name}</pre></b> </li>
            </ul>
        </li>;
    }
}



