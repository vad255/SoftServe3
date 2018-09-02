import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from '../Models/User';
import { Sprint } from '../Models/Sprint';
import { Story, StoryStatus } from '../Models/Story';
import { DailyStandUp } from '../Models/DailyStandUp';
import { Role } from '../Models/Role';
import { Task } from '../Models/Task';
import * as moment from '../../../node_modules/moment';
import { Link } from 'react-bootstrap/lib/Navbar';
import '../../css/cssbutton.css';
import { TaskEdit } from '../EditPages/TaskEdit';

interface IUserDataFetchingState {
    dailyStandUp: DailyStandUp;
    SprintId: number;
    Description: string;
    Conducted: moment.Moment;
    Sprint: Sprint;
    Myself: User;
    tasks: Task[];
    task: Task;
    currentUserTasks: Task[];
    table: JSX.Element;
}


export class DailyStandUpMeeting extends React.Component<{}, IUserDataFetchingState> {
    constructor() {
        super();
        this.state = (({ Conducted: moment, dailyStandUp: DailyStandUp, tasks: [], table: this.RenderStartTable() }) as any);
        this.LoadData();
        this.getDailyStandUp();
        this.getMyself();
        this.RenderStartTable = this.RenderStartTable.bind(this);
        //this.id = this.link.substr(this.link.lastIndexOf('/') + 1);
        //console.log(this.id);
    }


    private link: string = (window.location.href);
    readonly id: string = this.link.substr(this.link.lastIndexOf('/') + 1);
    
    protected getDailyStandUpURL: string = 'odata/DailyStandUp?$expand=sprint($expand=backlog,team($expand=members($expand=role)))';
    protected URL_BASE_Tasks: string = 'odata/Tasks';
    private isLoading: boolean = true;
    protected headerText: string = 'Daily Stand-Up Meeting';

    render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();
        return <div>{contents}</div>
    }


    public renderContent() {
        return <div>
            {this.setDailyStandUp.bind(this)}
            {this.EditDailyStandUp()}
            {this.setDailyStandUp.bind(this)}
        </div>
    }


    public EditDailyStandUp() {
        return <div>
            <h1 className="text-center">{this.headerText}</h1>
            <label style={{ marginRight: "5px" }}> Date Coducted: {this.state.Conducted.toString()} </label>
            <div className="row">
                <div className="col-md-3">
                    {this.GetTeamTable()}
                </div>
                <div className="col-md-9">
                    {this.state.table}
                </div>
            </div>
        </div>
    }


    public GetTeamTable() {
        return <table className='table table-scrum table-hover td-scrum'>
            <thead>
                <tr>
                    <th className="well col-md-1"><b>{this.state.Sprint.team.name}</b>
                    </th>
                </tr>
            </thead>
            <tbody>
                {this.state.Sprint.team.members.map(user => this.renderMember(user))}
            </tbody>
        </table>
    }

    private RenderStartTable(): JSX.Element {
        return <table className='table table-scrum table-hover td-scrum'>
            <thead>
                <tr>
                    <th colSpan={6}
                        className="well col-md-2"><b>Task History</b>
                    </th>

                </tr>
                <tr>
                    <th className="well col-md-1"><b>Description</b>
                    </th>
                    <th className="well col-md-1"><b>Actual Hours</b>
                    </th>
                    <th className="well col-md-1"><b>Planned Hours</b>
                    </th>
                    <th className="well col-md-1"><b>Remaining Hours</b>
                    </th>
                    <th className="well col-md-1"><b>Started</b>
                    </th>
                    <th className="well col-md-1"><b>Completed</b>
                    </th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    }

    private renderMember(user: User) {
            return <tr key={user.userId}>
                <td className="well" >
                    <button className="userbtn" onClick={() => this.GetTasksTable(user.userId)}>
                        {user.login}
                    </button>
                </td>
            </tr >
    }

    GetTasksTable(userId: number) {
        var userTask: Task[] = this.state.tasks.filter(t => t.userId == userId);
        userTask.forEach(t => t.userId = t.summary.length);
            var table2 = <table className='table table-scrum table-hover td-scrum'>
            <thead>
                <tr>
                    <th colSpan={6}
                        className="well col-md-2"><b>Task History</b>
                    </th>
                </tr>
                <tr>
                    <th className="well col-md-1"><b>Decsription</b>
                    </th>
                    <th className="well col-md-1"><b>Actual Hours</b>
                    </th>
                    <th className="well col-md-1"><b>Planned Hours</b>
                    </th>
                    <th className="well col-md-1"><b>Remaining Hours</b>
                    </th>
                    <th className="well col-md-1"><b>Started</b>
                    </th>
                    <th className="well col-md-1"><b>Completed</b>
                    </th>
                </tr>
            </thead>
                <tbody>
                    {userTask.map((t) => {
                        if ( t.started <= this.state.Conducted && t.state.toString() == "InProgress" || moment().subtract('days', 1) <= t.completed && t.state.toString() == "Done")
                        {
                            return <tr key={t.userId}>
                            <td className="well col-md-1">{t.description}
                            </td>
                            <td className="well col-md-1">{t.actualHours}
                            </td>
                            <td className="well col-md-1">{t.plannedHours}
                            </td>
                            <td className="well col-md-1">{t.remainingHours}
                            </td>
                            {this.startedValue(t)}
                            {this.completedValue(t)}
                        </tr>
                    }
                }
                )}
            </tbody>
        </table>

        this.setState({ table: table2 });
        userTask.forEach(t => t.userId = userId);
    }

    private renderTask(userId: number) {

        var tasksList: Task[] = this.state.currentUserTasks;

        this.state.tasks.forEach(t => {
            if (t.userId == userId) {
                tasksList.push(t);
            }
        })

        console.log(tasksList);
    }
    
    startedValue(task: Task) {

        return <td className="well col-md-1"> {task.started === null ? "In Progress" : task.started.toDate().toLocaleString()}</td>
    }

    completedValue(task: Task) {

        return <td className="well col-md-1">{task.completed === null ? "In Progress" : task.completed.toDate().toLocaleString()}</td>
    }

    getMyself(): Promise<any> {
        return fetch('/myself',
            { credentials: "include" }).
            then(response => response.json() as Promise<any>).
            then(data => {
                let user = new User(data);
                if (user.userId === 0)
                    user.userId = -1;

                this.setState({ Myself: user })
            });
    }

    private getDailyStandUp() {
        fetch(this.getDailyStandUpURL, {
            credentials: 'include',
        })
            .then(response => response.json() as any)
            .then(data => {
                console.log(data);
                this.setDailyStandUp(data);
            })
    }



    private setDailyStandUp(data: any) {
        this.isLoading = false;
        var dailyStandUpData = data['value'][0];
        var dailyStandUp = new DailyStandUp(dailyStandUpData);
        this.setState(
            {
                //id: sprintReview.id,
                SprintId: dailyStandUp.sprintId,
                Description: dailyStandUp.description,
                Conducted: dailyStandUp.conducted,
                Sprint: dailyStandUp.sprint
            });
    }
    protected LoadData() {

        fetch(this.getUrlTasks(), { credentials: 'include' })
            .then(response => response.json() as any)
            .then(data => {

                var tasksTemp = [];
                for (var i = 0; i < data['value'].length; i++)
                    tasksTemp[i] = new Task(data["value"][i]);
                this.setState({ tasks: tasksTemp });
            });
    }



    private getUrlTasks() {
        let result = this.URL_BASE_Tasks;
        return result;
    }
}