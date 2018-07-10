﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { TasksFiltersRow } from "../Filters/TasksFiltersRow";
import { Grid } from './Grid';
import { Task } from "../Models/Task";
import { Login } from '../Login';
import { IDbModel, IFetchState } from '../Models/IDbModel';


interface TaskDataFetchingState {
    tasks: Task[];
}



export class TaskGrid extends Grid{

    protected URL_BASE: string = 'odata/tasks';
    protected URL_EXPANDS: string = '?&expand=()';
    protected URL_ORDERING: string = '&$orderby=taskId';
    protected headerText: string = 'Tasks';

    constructor() {
        super();
        this.LoadData();
    }

    protected instantiate(item: any): IDbModel {
        return new Task(item);
    }

    protected GetHeaderRow() {
        return <tr>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("taskId")}><span className="nowrap">Database ID</span></th>            
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("plannedHours")}>PlannedHours</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("remainingHours")}>RemainingHours</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("actualHours")}>ActualHours</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("type")}>Type</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("state")}>State</th>     
            <th className="well menu_links col-md-1">
                <div onClick={this.FilterButtonClick.bind(this)}>
                    <span className="nowrap">Show Filters<span className="caret"></span></span>
                </div>
            </th>
        </tr>;
    }


    protected GetFiltersRow() {
        return <TasksFiltersRow
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn} />;
    }  
}
