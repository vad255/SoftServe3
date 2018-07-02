import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
//import { Team } from './Team'

export enum Priority {
    ResolveImmediately = 1,
    HighAttention = 2, Normal = 3,
    Low = 4
}