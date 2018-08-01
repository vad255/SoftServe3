import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Story } from './Story';
import { User } from './User';
import { Login } from '../Login';
import { TaskState } from './TaskState';
import { TaskType } from './TaskType';
import { IDbModel, ICommitableDbModel } from './Abstraction';
import * as moment from '../../../node_modules/moment';


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
            this.remainingHours,
            this.actualHours,
            this.started === null ? "Not started yet" : this.started.toDate().toLocaleString(),
            this.completed === null ? "Not completed yet" : this.completed.toDate().toLocaleString(),
            this.type,
            this.state,
            <div className='align-base m-tooltip'>{this.cutStirng(this.user.login, 10)}
                <span className="m-tooltiptext">{this.user.login}</span>
            </div>
        ]

        return elements; 
    }

    taskId: number = -1;
    summary: string = '';
    description: string = '';
    storyId: number = -1;
    plannedHours: number = -1;
    remainingHours: number = -1;
    actualHours: number = -1;
    started: null | moment.Moment = moment.min();
    completed: null | moment.Moment = moment.min();
    type: TaskType = 0;
    state: TaskState = 0;
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
        this.remainingHours = params.RemainingHours;
        this.actualHours = params.ActualHours;
        this.started = params.Started ? moment(params.Started) : params.Started && moment.min();
        this.completed = params.Completed ? moment(params.Completed) : params.Completed && moment.min();
        this.type = params.Type;
        this.state = params.State;
        this.userId = params.UserId;
        this.story = new Story(params.Story);
        this.user = new User(params.User);


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