import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Sprint } from '../Models/Sprint';
import { NavLink } from 'react-router-dom';
import { SprintStage } from '../Models/SprintStage';
import { Team } from '../Models/Team';
import { ConfirmMadal } from '../ConfirmModal';
import { SprintHistory } from '../Models/SprintHistory';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

interface IEditPageState {
    nameValue: string;
    teams: Team[];
    teamID: number;
    stageValue: SprintStage;
    goalValue: string;
    history: SprintHistory;
    ended: moment.Moment;
    begined: moment.Moment;
}

export class CreateSprint extends React.Component<RouteComponentProps<any>, IEditPageState> {
    private HISTORY_UPDATE_URL: string = "odata/SprintStagesHistory/";
    private historyId: number = 1;

    constructor(props: any) {
        super(props);
        this.state = (({
            nameValue: "",
            teams: [],
            teamID: 1,
            stageValue: "Planning",
            goal: "",
            begined: moment.min(),
            ended: moment.min(),
            history: new SprintHistory({})

        }) as any);

        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);

    }

    handleSaveButtonClick() {

        fetch('odata/sprints/',
            {
                method: 'POST',
                headers: {
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;odata.metadata=minimal',
                },
                body: JSON.stringify({

                    '@odata.type': 'DAL.Models.Sprint',
                    'Name': this.state.nameValue,
                    'TeamId': this.state.teamID,
                    'Stage': this.state.stageValue,
                    'Goal': this.state.goalValue,
                    'HistoryId': this.historyId,
                })
            }).
            then(() =>
                this.props.history.push('/sprints'));
    }

    public componentDidMount() {
        this.LoadTeams();
    }

    LoadTeams() {
        fetch("odata/teams/", { credentials: "include" }).
            then(response => response.json() as any).
            then(data => {
                let teamsTemp: Team[] = [];

                for (var i = 0; i < data['value'].length; i++)
                    teamsTemp[i] = new Team(data["value"][i]);

                this.setState({ teams: teamsTemp });
            }).
            catch(e => console.error(e));
    }



    public render() {
        let contents: JSX.Element;

        contents =
            <div className="editWindow">
                {this.getHeader()}
                <div className="sprintMainBlock inline-block">
                    {this.getNameInput()}
                    {this.getTeamSelector()}
                    {this.getStageSelector()}
                </div>

                <div className="sprintHistoryBlock inline-block">
                    {this.getHistoryBlock()}
                </div>

                {this.getReviewInput()}

                {this.getButtons()}
                {this.GetDeleteConfirmModal()}
                {this.GetVaildateModal()}
            </div>

        return contents;
    }

    private GetVaildateModal() {
        return <div id="ValidateModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Enter name and review, please!</h4>
                    </div>
                    <div className="modal-body text-center">
                        <button className="btn-dark scrum-btn" type="button" data-dismiss="modal">
                            Ok</button>
                    </div>
                </div>
            </div>
        </div>;
    }

    getHeader() {
        return <div className="editHead">
            <h2> Create new Sprint page</h2>
        </div>;
    }

    getNameInput() {
        return (
            <div>
                <h3 className="hStyle">Name:&nbsp;&nbsp;
                <input
                        className="form-control inline-block"
                        style={{ fontSize: 17 }}
                        type="text"
                        onChange={this.handleNameChange.bind(this)}
                    />
                </h3>
            </div>

        )
    }

    getTeamSelector() {
        let options: JSX.Element[] = [];
        let index = 0;

        if (this.state.teams) {

            for (var i = 0; i < this.state.teams.length; i++) {
                options.push(<option key={i} value={this.state.teams[i].id}>{this.state.teams[i].name}</option>);
            }
        }
        return (
            <div>
                <h3 className="hStyle">Team:&nbsp;&nbsp;&nbsp;
                <select
                        className="form-control inline-block"
                        style={{ fontSize: 17 }}
                        value={this.state.teamID}
                        onChange={this.handleTeamChange.bind(this)}>
                        {options}
                    </select>
                </h3>
            </div>
        );
    }

    getStageSelector() {
        let names: string[] = [];
        for (let iterator in SprintStage)
            if (!parseInt(iterator))
                names.push(iterator.toString());

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++)
            items.push(<option key={i + 1} value={names[i]}>{names[i]}</option>);

        return (
            <div>
                <h3 className="hStyle">State:&nbsp;&nbsp;&nbsp;&nbsp;
                    <select
                        className="form-control inline-block"
                        style={{ fontSize: 17 }}
                        value={this.state.stageValue}
                        onChange={this.handleStageChange.bind(this)}>
                        {items};
                    </select>
                </h3>
            </div>
        );
    }

    getHistoryBlock() {

        return (
            <div>
                <h3 className="hStyle" style={{ marginLeft: "100px" }}>History</h3>

                <h4 className="hStyle">Begin:&nbsp;&nbsp;
                <div className="inline-block">
                        <DatePicker
                            locale="uk-ua"
                            className="form-control"
                            selected={this.state.begined}
                            dateFormat={"DD.MM.YYYY HH:mm"}
                            onChange={this.handleBeginChange.bind(this)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                        />
                    </div>

                </h4>
                <h4 className="hStyle">End:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="inline-block">
                        <DatePicker
                            locale="uk-ua"
                            className="form-control"
                            selected={this.state.ended}
                            dateFormat={"DD.MM.YYYY  HH:mm"}
                            onChange={this.handleEndChange.bind(this)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                        />
                    </div>
                </h4>
            </div>
        );
    }

    getReviewInput() {
        return (
            <div>
                <h3 className="hStyle">Review:</h3>
                <textarea
                    className="areaStyle"
                    name="Description"
                    type="text"
                    onChange={this.handleReviewChange.bind(this)}
                />
            </div>
        )
    }

    getButtons() {

        let dataTarget;

        if (this.state.nameValue !== "" && this.state.goalValue !== "") {
            dataTarget = "#ConfirmDialog";
        }
        else {
            dataTarget = "#ValidateModal";
        }
        return (
            <div className="text-center">
                <button
                    className="btn-dark scrum-btn"
                    data-toggle="modal"
                    data-target={dataTarget}
                    role="button">Add element</button>

                &nbsp;&nbsp;&nbsp;&nbsp;

                <button
                    className="btn-dark scrum-btn inline-block"
                    onClick={this.handleCancel.bind(this)}>Discard</button>
            </div>
        );
    }
    GetDeleteConfirmModal() {
        let title = "Confirm changes ?";

        return <ConfirmMadal
            onCanceled={this.handleCancel.bind(this)}
            onConfirmed={this.handleSave.bind(this)}
            title={title}
            id={"ConfirmDialog"} />
    }

    private handleSave() {

        this.PostHistoryAndConnectToSprint().
            then(() => this.handleSaveButtonClick());
    }

    PostHistoryAndConnectToSprint(): Promise<any> {

        return fetch(this.HISTORY_UPDATE_URL,
            {
                method: 'POST',
                body: JSON.stringify({
                    '@odata.type': 'DAL.Models.SprintStagesHistory',
                    'Begined': this.state.begined ? this.state.begined.toISOString() : "",
                    'Ended': this.state.ended ? this.state.ended.toISOString() : "",
                }
                ),
                headers: {
                    'OData-Version': '4.0',
                    'Content-Type': 'application/json;odata.metadata=minimal',
                    'Accept': 'application/json'
                }
            }).then(response => response.json() as any).
            then(data => {
                let historyTemp: SprintHistory = new SprintHistory(data);
                console.log(historyTemp.id);
                this.historyId = historyTemp.id;

                this.setState({ history: historyTemp });

            });
    }

    private handleCancel() {
        this.props.history.push('/sprints');
    }

    handleNameChange(event: any) {
        this.setState({ nameValue: event.target.value });
    }

    handleReviewChange(event: any) {
        this.setState({ goalValue: event.target.value });
    }

    handleStageChange(event: any) {
        this.setState({ stageValue: event.target.value });
    }

    handleTeamChange(event: any) {
        this.setState({ teamID: event.target.value });
    }

    handleBeginChange(date: moment.Moment) {
        this.setState({ begined: date });
    }

    handleEndChange(date: moment.Moment) {
        this.setState({ ended: date });
    }
}
