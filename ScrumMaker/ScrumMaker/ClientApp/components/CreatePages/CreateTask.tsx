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
import '../../../wwwroot/assets/css/editPage.css';


interface ICreatePageState {
    task: Task;
    taskId: string;
    summaryValue: string;
    descriptionValue: string;
    typeValue: TaskType;
    stateValue: TaskState;
    storyValue: number;
    plannedHoursValue: number;
    remainingHoursValue: number;
    actualHoursValue: number;
    userValue: number;
    stories: Story[],
    users: User[]
}



export class CreateTask extends React.Component<RouteComponentProps<any>, ICreatePageState> {
    constructor(props: any) {
        super(props);
        this.state = (({
            task: Task,
            summaryValue: "",
            descriptionValue: "",
            typeValue: "0",
            stateValue: "0",
            storyValue: 1,
            plannedHoursValue: 0,
            remainingHoursValue: 0,
            actualHoursValue: 0,
            userValue: 1,
            stories: [],
            users: []
        }) as any);

        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleSummaryValue = this.handleSummaryValue.bind(this);
        this.handleDescriptionValue = this.handleDescriptionValue.bind(this);
        this.handleStoryValue = this.handleStoryValue.bind(this);
        this.handlePlannedHoursValue = this.handlePlannedHoursValue.bind(this);
        this.handleRemainingHoursValue = this.handleRemainingHoursValue.bind(this);
        this.handleActualHoursValue = this.handleActualHoursValue.bind(this);
        this.handleStartedValue = this.handleStartedValue.bind(this);
        this.handleCompletedValue = this.handleCompletedValue.bind(this);
        this.handleTypeValue = this.handleTypeValue.bind(this);
        this.handleStateValue = this.handleStateValue.bind(this);
        this.handleUserValue = this.handleUserValue.bind(this);
        this.handleOkValue = this.handleOkValue.bind(this);
        this.handleCancelValue = this.handleCancelValue.bind(this);

        fetch("odata/stories", { credentials: 'include' })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let storiesTemp = [];
                for (var i = 0; i < data['value'].length; i++)
                    storiesTemp[i] = new Story(data["value"][i]);
                this.setState({ stories: storiesTemp });
            });


        fetch("odata/users", { credentials: 'include' })
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let usersTemp = [];
                for (var i = 0; i < data['value'].length; i++)
                    usersTemp[i] = new User(data["value"][i]);
                this.setState({ users: usersTemp });
            });

    }


    handleCreateButtonClick() {
        //if (this.state.summaryValue != "" && this.state.descriptionValue != "") 
        fetch('odata/Tasks',
            {
                method: 'POST',
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
                    'RemainingHours': this.state.remainingHoursValue,
                    'ActualHours': this.state.actualHoursValue,
                    'Started': this.state.task.started,
                    'Completed': this.state.task.completed,
                    'Type': this.state.typeValue,
                    'State': this.state.stateValue,
                    'UserId': this.state.userValue
                })
            });
        //alert("Data was created!");
        //<Redirect to="/tasks" />
        //this.props.history.push('/tasks');
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

    handleRemainingHoursValue(event: any) {
        this.setState({ remainingHoursValue: event.target.value });
    }

    handleActualHoursValue(event: any) {
        this.setState({ actualHoursValue: event.target.value });
    }

    handleTypeValue(event: any) {
        this.setState({ typeValue: event.target.value });
    }

    handleStateValue(event: any) {
        this.setState({ stateValue: event.target.value });
    }

    handleUserValue(event: any) {
        this.setState({ userValue: event.target.value });
    }

    handleStartedValue(date: moment.Moment) {
        let taskNew = this.state.task;
        taskNew.started = date;
        this.setState({ task: taskNew });
    }


    handleCompletedValue(date: moment.Moment) {
        let taskNew = this.state.task;
        taskNew.completed = date;
        this.setState({ task: taskNew });
    }

    private handleOkValue() {
        this.props.history.push('/tasks');
    }

    private handleCancelValue() {
        this.props.history.push('/CreateTask');
    }


    render() {
        return <div className="editWindow">
            <div className="editHead">
                <h2> Create task </h2>
            </div>
            <div className="taskMainBlock inline-block">
                <div>
                    <h3 className="hStyle">Summary <span style={{ color: "red" }}>*</span> :&nbsp;&nbsp;
                <input className="form-control inline-block" onChange={this.handleSummaryValue} type="text" value={this.state.summaryValue} required />
                    </h3>
                </div>
                <div>
                    <h3 className="hStyle">Story:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select className="form-control inline-block" onChange={this.handleStoryValue} value={this.state.storyValue}>
                            {this.state.stories.map(x => <option value={x.id}>{x.name}</option>)}
                        </select>
                    </h3>
                </div>
                {this.getType()}
                {this.getState()}

                <div>
                    <h3 className="hStyle">User:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select className="form-control inline-block" onChange={this.handleUserValue} value={this.state.userValue} >
                            {this.state.users.map(x => <option value={x.userId}>{x.login}</option>)}
                        </select>
                    </h3>
                </div>
            </div>
            <div className="taskTimeBlock inline-block">
                <div>
                    <h3 className="hStyle">PlannedHours<span style={{ color: "red" }}>*</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="form-control inline-block" onChange={this.handlePlannedHoursValue} type="text" value={this.state.plannedHoursValue} required />
                    </h3>
                </div>
                <div>
                    <h3 className="hStyle">RemainingHours<span style={{ color: "red" }}>*</span>:&nbsp;&nbsp;
                <input className="form-control inline-block" onChange={this.handleRemainingHoursValue} type="text" value={this.state.remainingHoursValue} required />
                    </h3>
                </div>
                <div>
                    <h3 className="hStyle">ActualHours<span style={{ color: "red" }}>*</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="form-control inline-block" onChange={this.handleActualHoursValue} type="text" value={this.state.actualHoursValue} required />
                    </h3>
                </div>
                {this.getStartedBlock()}
                {this.getCompletedBlock()}
            </div>
            <div>
                <h3 className="hStyle">Description <span style={{ color: "red" }}>*</span> :&nbsp;&nbsp;</h3>
                <textarea style={{ width: "400px", height: "300px", fontSize: 20, padding: "10px" }} className="form-control inline-block" onChange={this.handleDescriptionValue} type="text" value={this.state.descriptionValue} required />
            </div>
            <p>
                <span style={{ color: "red" }}>*</span>these fields are required
            </p>
            <div className="text-center">
                <button
                    className="btn-dark scrum-btn"
                    data-toggle="modal"
                    data-target="#confirmDeleteModal"
                    onClick={this.handleCreateButtonClick}>Create</button>

                &nbsp;&nbsp;&nbsp;&nbsp;

                <button
                    className="btn-dark scrum-btn inline-block"
                    onClick={this.handleOkValue}>Discard</button>
            </div>
            {this.GetDeleteConfirmModal()}
        </div>
    }


    getType() {
        let names: string[] = [];
        for (let iterator in TaskType)
            if (!parseInt(iterator))
                names.push(iterator.toString());

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++)
            items.push(<option key={i} value={names[i]}>{names[i]}</option>);

        return (
            <div>
                <h3 className="hStyle">Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select
                        className="form-control inline-block"
                        value={this.state.typeValue}
                        onChange={this.handleTypeValue}>
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
            items.push(<option key={i} value={names[i]}>{names[i]}</option>);

        return (
            <div>
                <h3 className="hStyle">State:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <select
                        className="form-control inline-block"
                        value={this.state.stateValue}
                        onChange={this.handleStateValue}>
                        {items};
                    </select>
                </h3>
            </div>
        );
    }

    getStartedBlock() {
        if (this.state.stateValue.toString() == "InProgress" && this.state.remainingHoursValue >= 0 && this.state.actualHoursValue >= 0 && this.state.plannedHoursValue >= 0
            || this.state.stateValue.toString() == "Done" && this.state.remainingHoursValue == 0 && this.state.actualHoursValue >= 0 && this.state.plannedHoursValue >= 0)
            return (
                <div>
                    <h3 className="hStyle">Started:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="inline-block">
                            <DatePicker
                                locale="uk-ua"
                                className="form-control"
                                selected={this.state.task.started}
                                dateFormat={"DD.MM.YYYY HH:mm"}
                                onChange={this.handleStartedValue}
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
        if (this.state.remainingHoursValue == 0 && this.state.stateValue.toString() == "Done" && this.state.actualHoursValue >= 0 && this.state.actualHoursValue >= 0)
            return (
                <div>
                    <h3 className="hStyle">Completed:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="inline-block">
                            <DatePicker
                                locale="uk-ua"
                                className="form-control"
                                selected={this.state.task.completed}
                                dateFormat={"DD.MM.YYYY HH:mm"}
                                onChange={this.handleCompletedValue}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                            />
                        </div>
                    </h3>
                </div>
            );
    }

    private GetDeleteConfirmModal() {
        if (this.state.summaryValue.length != 0 && this.state.descriptionValue.length != 0 && this.state.actualHoursValue.toString().length != 0 && this.state.remainingHoursValue.toString().length != 0 && this.state.plannedHoursValue.toString().length != 0) {
            return <div id="confirmDeleteModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                            <h4 className="modal-title">The task was created.</h4>
                        </div>
                        <div className="modal-body text-center">
                            <button className="btn-dark scrum-btn" type="button" data-dismiss="modal" onClick={this.handleOkValue} >
                                Ok</button>
                        </div>
                    </div>
                </div>
            </div>;
        }
        else {
            return <div id="confirmDeleteModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                            <h4 className="modal-title">Please, fullfill requaired fields.</h4>
                        </div>
                        <div className="modal-body text-center">
                            <button className="btn-dark scrum-btn" type="button" data-dismiss="modal" onClick={this.handleCancelValue} >
                                Ok</button>
                        </div>
                    </div>
                </div>
            </div>;
        }
    }
}