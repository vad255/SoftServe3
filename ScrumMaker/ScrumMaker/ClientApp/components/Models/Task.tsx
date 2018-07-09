import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Story } from './Story';
import { User } from './User';
import { IDbModel } from './IDbModel'


export class Task implements IDbModel{
    getId(): number {
        return this.taskId;
    }
    toArray(): any[] {
        let elements: any[] = [
            this.taskId,
            this.plannedHours,
            this.remainingHours,
            this.actualHours,
            this.type,
            this.state
        ]

        return elements; 
    }

    taskId: number = -1;
    storyId: number = -1;
    plannedHours: number = -1;
    remainingHours: number = -1;
    actualHours: number = -1;
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
        this.storyId = params.StoryId;
        this.plannedHours = params.PlannedHours;
        this.remainingHours = params.RemainingHours;
        this.actualHours = params.ActualHours;
        this.type = params.Type;
        this.state = params.State;
        this.userId = params.UserId;
        //this.story = new Story(params.Story);
        //this.user = new User(params.User);

    }
    public toString(): string {
        return this.taskId.toString();
    }
}







