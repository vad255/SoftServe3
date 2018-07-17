import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { DefectPriority } from './DefectPriority'
import { DefectState } from './DefectState'
import { DefectStatus } from './DefectStatus'
import { IDbModel } from './Abstraction'


export class Defect implements IDbModel {

    defectId: number = -1;
    name: string = '';
    description: string = '';
    priority: DefectPriority = 0;
    state: DefectState = 0;
    status: DefectStatus = 0;
    actualResults: string = '';
    fixResults: string = '';


    public constructor(params: any) {

        if (params === null || params === undefined) {
            return;
        }

        this.defectId = params.DefectId;
        this.name = params.DefectName;
        this.description = params.Description;
        this.priority = params.Priority;
        this.state = params.State;
        this.status = params.Status;
        this.actualResults = params.ActualResults;
        this.fixResults = params.FixResults;
    }

    public toString(): string {
        return this.defectId.toString();
    }

    public toArray(): any[] {

        let elements: any[] = [
            this.defectId,
            this.name,
            this.description,
            this.priority,
            this.state,
            this.status,
            this.actualResults,
            this.fixResults
        ]

        return elements;
    }

    getId(): number {
        return this.defectId;
    }
}


