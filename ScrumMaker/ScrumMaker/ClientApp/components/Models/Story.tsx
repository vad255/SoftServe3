import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';



export enum StoryStatus {
    PendingApproval = 1,
    ReadyToStart = 2,
    InProgress = 3,
    DevComplete = 4,
    TestComplete = 5,
    Accepted = 6
}


export class Story {
    id: number = -1;
    name: string = '';
    status: StoryStatus = 0;
    description: string = '';


    public constructor(params: any) {

        //super(params);

        if (params === null || params === undefined) {
            return;
        }

        this.id = params.id;
        this.name = params.name;
        this.status = params.status;
        this.description = params.description;
    }

    public toString(): string {
        return this.id.toString();
    }


    public Test() {
        return <tr><td>Hello</td></tr>;
    }

    public renderAsTableRow(): JSX.Element {
        return <tr key={this.id}>
                   <td className="align-base">{this.id}</td>
                   <td className="align-base">{this.name}</td>
                   <td className="align-base">{this.description}</td>
                   <td className="align-base">{this.status}</td>
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



