import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Grid } from './Grid';
import { Task } from "../Models/Task";
import { Login } from '../Login';
import { IDbModel, IFetchState } from '../Models/Abstraction';

import { FiltersManager } from '../Filters/FiltersManager';
import { TextFilter } from '../Filters/TextFilter'
import { IntFilter } from '../Filters/IntFilter'
import { EnumFilter } from '../Filters/EnumFilter'
import { SprintStage } from '../Models/SprintStage'
import { EmptyFilter } from '../Filters/EmptyFilter';
import { TaskType } from '../Models/TaskType';
import { TaskState } from '../Models/TaskState';

interface TaskDataFetchingState {
    tasks: Task[];
}

export class TaskGrid extends Grid {

    protected URL_BASE: string = 'odata/tasks';
    protected URL_EXPANDS: string = '?$expand=User,Story';
    protected URL_ORDERING: string = '&$orderby=taskId';
    protected headerText: string = 'Tasks';
    protected URL_EDIT: string = "TaskEdit/"

    constructor() {
        super();
        this.state = { items: [] };
    }

    protected instantiate(item: any): IDbModel {
        return new Task(item);
    }

    protected GetHeaderRow() {
        return <tr>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("taskId")}><span className="nowrap">TaskId</span></th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("summary")}>Summary</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("description")}>Description</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("storyId")}>StoryId</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("plannedHours")}>PlannedHours</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("started")}>Started</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("completed")}>Completed</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("type")}>Type</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("state")}>State</th>
            <th className="well menu_links col-md-1" onClick={() => this.OrderBy("userId")}>UserId</th>
            <th className="well menu_links col-md-1">
                <div onClick={this.FilterButtonClick.bind(this)}>
                    <span className="nowrap">Show Filters<span className="caret"></span></span>
                </div>
            </th>
        </tr>;
    }


    protected GetFiltersRow() {
        let filetrs = [
            new IntFilter({ filterKey: "taskId" }),
            new TextFilter({ filterKey: "summary" }),
            new TextFilter({ filterKey: "description" }),
            new TextFilter({ filterKey: "story/name" }),
            new IntFilter({ filterKey: "plannedHours" }),
            new IntFilter({ filterKey: "started" }),
            new IntFilter({ filterKey: "completed" }),
            new EnumFilter({ filterKey: "type", enumType: TaskType }),
            new EnumFilter({ filterKey: "state", enumType: TaskState }),
            new TextFilter({ filterKey: "user/login" })
        ]

        return <FiltersManager
            ref={this.FILTER_MANAGER_REF}
            filters={filetrs}
            onApply={this.ApplyFiltersHandler.bind(this)}
            display={this.filteringOn}
            externalConstraints={this.customUrlFilters}
        />
    }
}
