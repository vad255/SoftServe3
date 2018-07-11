import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

export enum TaskState {
    ToDo = 1,
    InProgress = 2,
    Done = 3
}