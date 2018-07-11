import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

export enum TaskType {
    Coding = 1,
    Documentation = 2,
    Testing = 3,
    Analyses = 4
}