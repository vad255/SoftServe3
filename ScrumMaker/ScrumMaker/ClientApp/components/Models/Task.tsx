import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Story } from './Story';
import { User } from './User';
import { IDbModel } from './Abstraction'
import { Login } from '../Login';


export class Task implements IDbModel{
    getId(): number {
        return this.taskId;
    }
    toArray(): any[] {
        let elements: any[] = [
            this.taskId,
            this.summary,
                <div className='align-base m-tooltip'>{this.cutStirng(this.description, 10)}
                    <span className="m-tooltiptext">{this.description}</span>
            </div>,
            this.story.name,
            this.plannedHours,
            this.started.toLocaleString(),
            this.completed.toLocaleString(),
            this.type,
            this.state,
            this.user.login,
        ]

        return elements; 
    }

    taskId: number = -1;
    summary: string = '';
    description: string = '';
    storyId: number = -1;
    plannedHours: number = -1;
    started: Date;
    completed: Date;
    type: string = '';
    state: string = '';
    userId: number = -1;
    story: Story;
    user: User;





    public constructor(params: any) {

        //super(params);
        if (params === null || params === undefined) {
            return;
        }
        this.taskId = params.TaskId;
        this.summary = params.Summary;
        this.description = params.Description;
        this.storyId = params.StoryId;
        this.plannedHours = params.PlannedHours;
        this.started = new Date(params.Started);
        this.completed = new Date(params.Completed);
        this.type = params.Type;
        this.state = params.State;
        this.userId = params.UserId;
        this.story = new Story(params.Story);
        this.user = new User(params.User);


    }
    public toString(): string {
        return this.taskId.toString();
    }

    private cutStirng(str: string, targetLength: number): string {
        let s = new String(' ');
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







