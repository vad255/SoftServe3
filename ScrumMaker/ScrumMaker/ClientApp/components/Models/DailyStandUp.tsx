import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import 'isomorphic-fetch';
import { Sprint } from './Sprint';

export class DailyStandUp {

    id: number = 0;
    sprintId: number = 0;
    description: string = "";
    conducted: Date;
    sprint: Sprint;

    public constructor(params: any) {
        if (!params) {
            return;
        }

        this.id = params.Id;
        if (params.Sprint) {
            this.sprint = new Sprint(params.Sprint);
        }
        this.sprintId = params.SprintId;
        this.description = params.Description;
        this.conducted = params.Conducted;
    }
}