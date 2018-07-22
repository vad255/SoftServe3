import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { User } from "../Models/User";
import { Task } from '../Models/Task';
import { TaskType } from '../Models/TaskType';
import { TaskState } from '../Models/TaskState';
import { Story } from '../Models/Story';
import { ConfirmMadal } from '../ConfirmModal';
import DatePicker from 'react-datepicker'
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import '../../css/editPage.css';


interface IEditPageState {
    task: Task;
    taskId: string;
    summaryValue: string;
    descriptionValue: string;
    storyValue: number;
    plannedHoursValue: number;
    userValue: number;
    stories: Story[],
    users: User[]
}



export class TaskEdit extends React.Component<RouteComponentProps<any>, IEditPageState> {
    constructor(props: any) {
        super(props);
        this.state = (({
            taskId: this.props.location.pathname.substring((this.props.location.pathname.lastIndexOf('/') + 1)),
            task: Task,
            summaryValue: "",
            descriptionValue: "",
            storyValue: -1, 
            plannedHoursValue: -1,
            userValue: -1,
            stories: [],
            users: []
        }) as any);


        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.handleSummaryValue = this.handleSummaryValue.bind(this);
        this.handleDescriptionValue = this.handleDescriptionValue.bind(this);
        this.handleStoryValue = this.handleStoryValue.bind(this);
        this.handlePlannedHoursValue = this.handlePlannedHoursValue.bind(this);
        this.handleTypeValue = this.handleTypeValue.bind(this);
        this.handleStateValue = this.handleStateValue.bind(this);
        this.handleUserValue = this.handleUserValue.bind(this);

        fetch("odata/stories", { credentials: 'include' })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let storiesTemp = [];
                for (var i = 0; i < data['value'].length; i++)
                    storiesTemp[i] = new Story(data["value"][i]);
                this.setState({ stories: storiesTemp });
            })


        fetch("odata/users", { credentials: 'include' })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let usersTemp = [];
                for (var i = 0; i < data['value'].length; i++)
                    usersTemp[i] = new User(data["value"][i]);
                this.setState({ users: usersTemp });
            })

        fetch("odata/Tasks?$filter=TaskId eq " + this.state.taskId, { credentials: 'include' })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let temp = new Task(data["value"][0]);
                this.setState({
                    task: temp, summaryValue: temp.summary.toString(), descriptionValue: temp.description.toString(),
                    storyValue: temp.storyId, plannedHoursValue: temp.plannedHours, userValue: temp.userId

                });
            });

    }
    handleSaveButtonClick() {
        fetch('odata/Tasks(' + this.state.taskId + ')',
            {
                method: 'PATCH',
                headers: {
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;odata.metadata=minimal',
                },
                body: JSON.stringify({

                    '@odata.type': 'DAL.Models.ScrumTask',
                    'Summary': this.state.summaryValue,
                    'Description': this.state.descriptionValue,
                    'StoryId': this.state.storyValue,
                    'PlannedHours': this.state.plannedHoursValue,
                    'Started': this.state.task.started,
                    'Completed': this.state.task.completed,
                    'Type': this.state.task.type,
                    'State': this.state.task.state,
                    'UserId': this.state.userValue
                })
            });

        alert("Data was updated!");
        <Redirect to="/tasks" />
    }

    handleSummaryValue(event: any) {
        this.setState({ summaryValue: event.target.value });
    }

    handleDescriptionValue(event: any) {
        this.setState({ descriptionValue: event.target.value });
    }

    handleStoryValue(event: any) {
        this.setState({ storyValue: event.target.value });
    }
    handlePlannedHoursValue(event: any) {
        this.setState({ plannedHoursValue: event.target.value });
    }

    handleTypeValue(event: any) {
        let newType = this.state.task;
        newType.type = event.target.value;
        this.setState({ task: newType });
    }

    handleStateValue(event: any) {
        let newState = this.state.task;
        newState.state = event.target.value;
        this.setState({ task: newState });
    }
    handleUserValue(event: any) {
        this.setState({ userValue: event.target.value });
    }

    handleStartedChange(date: moment.Moment) {
        let taskNew = this.state.task;
        taskNew.started = date;
        this.setState({ task: taskNew });
    }


    handleCompletedChange(date: moment.Moment) {
        let taskNew = this.state.task;
        taskNew.completed = date;
        this.setState({ task: taskNew });
    }


    render() {
        return <div className="editWindow">
            <div className="editHead">
                <h2> Editing Task Page by Id - {this.state.task.taskId}</h2>
            </div>
            <div className="taskMainBlock inline-block">
            <div>
                    <h3 className="hStyle">Summary:&nbsp;&nbsp;
                <input className="form-control inline-block" onChange={this.handleSummaryValue} type="text" value={this.state.summaryValue} />
                </h3>
            </div>
            <div>
                    <h3 className="hStyle">StoryId:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select className="form-control inline-block" onChange={this.handleStoryValue} value={this.state.storyValue}>
                    {this.state.stories.map(x => <option value={x.id}>{x.name}</option>)}
                </select>
                </h3>
            </div>
                {this.getType()}
                {this.getState()}

                <div>
                    <h3 className="hStyle">UserId:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select className="form-control inline-block" onChange={this.handleUserValue} value={this.state.userValue} >
                            {this.state.users.map(x => <option value={x.userId}>{x.login}</option>)}
                        </select>
                    </h3>
                </div>
            </div>    
            <div className="taskTimeBlock inline-block">
                <div>
                    <h3 className="hStyle">PlannedHours:&nbsp;&nbsp;
                <input className="form-control inline-block" onChange={this.handlePlannedHoursValue} type="text" value={this.state.plannedHoursValue} />
                    </h3>
                </div>
                {this.getStartedBlock()}
                {this.getCompletedBlock()}
            </div>
            <div>
                <h3 className="hStyle">Description:&nbsp;&nbsp;</h3>
                <textarea style={{ width: "400px", height: "300px", fontSize: 20, padding: "10px" }} className="form-control inline-block" onChange={this.handleDescriptionValue} type="text" value={this.state.descriptionValue} />
            </div>
            <div className="container-login100-form-btn text-center">
                <Link to="/tasks" style={{ marginLeft: "350px" }} className="login100-form-btn" onClick={this.handleSaveButtonClick}>Update</Link>
                <Link to="/tasks" style={{ marginLeft: "20px" }} className="login100-form-btn">Discard</Link>
            </div>
        </div>
    }


    getType() {
        let names: string[] = [];
        for (let iterator in TaskType)
            if (!parseInt(iterator))
                names.push(iterator.toString());

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++)
            items.push(<option key={i + 1} value={names[i]}>{names[i]}</option>);

        return (
            <div>  
                <h3 className="hStyle">Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   
                <select
                        className="form-control inline-block"
                    value={this.state.task.type}
                    onChange={this.handleTypeValue.bind(this)}>
                    {items};
                    </select>
                </h3>               
            </div>
        );
    }

    getState() {
        let names: string[] = [];
        for (let iterator in TaskState)
            if (!parseInt(iterator))
                names.push(iterator.toString());

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++)
            items.push(<option key={i + 1} value={names[i]}>{names[i]}</option>);

        return (
            <div>
                <h3 className="hStyle">State:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        
                    <select
                        className="form-control inline-block"
                    value={this.state.task.state}
                    onChange={this.handleStateValue.bind(this)}>
                        {items};
                    </select>
                </h3>
            </div>
        );
    }

    getStartedBlock() {

        return (
            <div>
                <h3 className="hStyle">Started:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="inline-block">
                        <DatePicker
                            locale="uk-ua"
                            className="form-control"
                            selected={this.state.task.started}
                            dateFormat={"DD.MM.YYYY HH:mm"}
                            onChange={this.handleStartedChange.bind(this)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                        />
                    </div>
                </h3>
            </div>
        );
    }


    getCompletedBlock() {
      
        return (
            <div>
                <h3 className="hStyle">Completed:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="inline-block">
                        <DatePicker
                            locale="uk-ua"
                            className="form-control"
                            selected={this.state.task.completed}
                            dateFormat={"DD.MM.YYYY HH:mm"}
                            onChange={this.handleCompletedChange.bind(this)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                        />
                    </div>
                </h3>
            </div>
        );
    }
}