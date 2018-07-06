import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

export enum DefectState {
    Active = 1,
    InWork = 2,
    PendingTest = 3,
    Fixed = 4,
    NotaBug = 5,
    Postponed = 6
}