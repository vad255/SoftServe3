﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Feature } from '../Models/Feature'

export enum State {
    PendingApproval = 1,
    ReadyToStart,
    InProgress,
    DevComplete,
    TestComplete,
    Accepted
}