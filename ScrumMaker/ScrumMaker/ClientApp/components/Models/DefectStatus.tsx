import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

export enum DefectStatus {
    Open = 1,
    Close = 2
}