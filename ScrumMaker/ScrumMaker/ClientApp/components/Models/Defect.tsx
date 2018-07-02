import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Priority } from './Priority'
import { State } from './State'
import { Status } from './Status'


export class Defect {
    defectId: number = -1;
    name: string = '';
    description: string = '';
    priority: Priority = 0;
    state: State = 0;
    status: Status = 0;
    actualResults: string = '';
    fixResults: string = '';


    public constructor(params: any) {

        //  super(params);

        if (params === null || params === undefined) {
            return;
        }

        this.defectId = params.defectId;
        this.name = params.defectName;
        this.description = params.description;
        this.priority = params.priority;
        this.state = params.state;
        this.status = params.status;
        this.actualResults = params.actualResults;
        this.fixResults = params.fixResults;
    }

    public toString(): string {
        return this.defectId.toString();
    }

    public renderAsTableRow(): JSX.Element {
        return <tr key={this.defectId}>
            <td className="align-base">{this.defectId}</td>
            <td className="align-base">{this.name}</td>
            <td className="align-base">{this.description}</td>
            <td className="align-base">{this.priority}</td>
            <td className="align-base">{this.state}</td>
            <td className="align-base">{this.status}</td>
            <td className="align-base">{this.actualResults}</td>
            <td className="align-base">{this.fixResults}</td>
            <td className="align-base">
                <div id={this.defectId.toString()} role="button" className="btn btn-sq-xs align-base ">
                    <span className="glyphicon glyphicon-edit dark" aria-hidden="true"></span>
                </div>
                &nbsp;&nbsp;
                <div id={this.defectId.toString()} role="button" className="btn btn-sq-xs align-base">
                    <span className="glyphicon glyphicon-trash dark" aria-hidden="true"></span>
                </div>
            </td>
        </tr>;
    }
}


