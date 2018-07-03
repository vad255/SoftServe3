import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Story } from './Story';
import { User } from './User';


export class Task {

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



    public renderAsTableRow(): JSX.Element {
        return <tr key={this.taskId}>
            <td className="align-base">{this.taskId}</td>            
            <td className="align-base">{this.plannedHours}</td>
            <td className="align-base">{this.remainingHours}</td>
            <td className="align-base">{this.actualHours}</td>
            <td className="align-base">{this.type}</td>            
            <td className="align-base">{this.state}</td>
            <td className="align-base">
                <div id={this.taskId.toString()} role="button" className="btn btn-sq-xs align-base ">
                    <span className="glyphicon glyphicon-edit dark" aria-hidden="true"></span>
                </div>
                &nbsp;&nbsp;
                <div id={this.taskId.toString()} role="button" className="btn btn-sq-xs align-base">
                    <span className="glyphicon glyphicon-trash dark" aria-hidden="true"></span>
                </div>
            </td>
        </tr>;
    }
}











