import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';



export class ModelForChart extends React.Component {

    name: number = -1;
    remainingTask: number = -1;
    completedTask: number = -1;

    public constructor(params: any) {

        super(params);

        if (params === null || params === undefined) {
            return;
        }
        this.name = params.name;
        this.remainingTask = params.remainingTask;
        this.completedTask = params.remainingTask;
    }


}