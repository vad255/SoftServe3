import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { TasksFiltersRow } from "../Filters/TasksFiltersRow";
import { Grid } from './Grid';
import { Task } from "../Models/Task";
import { Login } from '../Login';


interface TaskDataFetchingState {
    tasks: Task[];
}



export class TaskGrid extends Grid<RouteComponentProps<{}>, TaskDataFetchingState> {

    protected pageSize: number = 0;
    protected URL_BASE: string = 'odata/tasks';
    protected URL_EXPANDS: string = '?&expand=()';
    protected URL_ORDERING: string = '&$orderby=taskId';
    protected headerText: string = 'Tasks';

    //protected pageSize = 5;

    constructor() {
        super();
        this.LoadData();
    }

    protected OnDataReceived(data: any) {

        this.isLoading = false;
        //var tasks1 = (data as any[]).map(s => new Task(s));
        //this.setState({ tasks: tasks1 });


        //this.isLoading = false;
        ////var tasks1 = (data as any[]).map(s => new Task(s));
        console.log(data);

        var tasksTemp = [];
        for (var i = 0; i < data['value'].length; i++)
            tasksTemp[i] = new Task(data["value"][i]);
        this.setState({ tasks: tasksTemp });

    }

    protected getData() {
        return this.state.tasks;
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

    protected GetBodyRows(): JSX.Element[] {
        var i = 0;
        return this.state.tasks.map(s => s.renderAsTableRow());
    }


    protected RenderFooter() {
        return <tr>
            <td colSpan={8}>
                <div className="text-center">
                    <div role='button' className='btn btn-primary'>
                        Add new
                    </div>
                </div>
            </td>
        </tr>;
    }
}


