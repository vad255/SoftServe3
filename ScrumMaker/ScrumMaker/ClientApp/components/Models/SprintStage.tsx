import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Team } from './Team'

export enum SprintStage {
    Planning = 1,
    InProgress = 2,
    Review = 3,
    Retrospective = 4,
    Finished = 5
}