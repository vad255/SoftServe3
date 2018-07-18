import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import 'isomorphic-fetch';
import { Sprint } from './Sprint';

export class SprintReview  {

    id: number = 0;
    sprintId: number = 0;
    isGoalAchived: boolean = false;
    isStoriesCompleted: boolean = false;
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
        this.isGoalAchived = params.IsGoalAchived;
        this.isStoriesCompleted = params.IsStoriesCompleted;
    }
}