import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Sprint } from '../Models/Sprint';
import { NavLink } from 'react-router-dom';
import { SprintStage } from '../Models/SprintStage';
import { Team } from '../Models/Team';
import '../../css/editPage.css';
import { ConfirmMadal } from '../ConfirmModal';
import { SprintHistory } from '../Models/SprintHistory';
import DatePicker from 'react-datepicker'
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


interface ISprintEditState {
    sprint: Sprint
    history: SprintHistory;
    teams: Team[]
}


export class SprintEdit extends React.Component<RouteComponentProps<{}>, ISprintEditState> {

    private sprintLoaded: boolean = false;
    private teamLoaded: boolean = false;
    private historyLoaded: boolean = false;
    private historyModified: boolean = false;
    private historyCreatedNew: boolean = false;

    readonly id: number = -1;
    private SPRINT_URL: string = "odata/sprints?$expand=team&$filter=id eq ";
    private HISTORY_URL: string = "odata/SprintStagesHistory?$filter=id eq ";
    private SPRINT_UPDATE_URL: string = "odata/sprints/";
    private HISTORY_UPDATE_URL: string = "odata/SprintStagesHistory/";
    private HEADERS = {
        'OData-Version': '4.0',
        'Content-Type': 'application/json;odata.metadata=minimal',
        'Accept': 'application/json'
    }

    constructor() {
        super();

        let link = window.location.href;
        this.id = parseInt(link.substr(link.lastIndexOf('/') + 1));

        this.handleSave = this.handleSave.bind(this);
    }

    public componentDidMount() {
        this.LoadSprint().then(data => {
            this.LoadOrCreateHistory();
            this.LoadTeams();
        }).catch(e => console.error(e));
    }
    LoadSprint(): Promise<any> {
        let url = this.SPRINT_URL + this.id;

        return fetch(url, { credentials: "include" }).
            then(response => response.json() as any).
            then((data) => {

                this.sprintLoaded = true;
                let currentItem = new Sprint(data['value'][0]);
                this.setState({ sprint: currentItem })
            });
    }
    LoadOrCreateHistory() {

        if (this.state.sprint.historyId > 0) {
            fetch(this.HISTORY_URL + this.state.sprint.historyId, { credentials: "include" }).
                then(response => response.json() as any).
                then(data => {
                    let historyTemp: SprintHistory = new SprintHistory(data['value'][0]);
                    this.historyLoaded = true;
                    this.historyCreatedNew = false;
                    this.historyModified = false;

                    this.setState({ history: historyTemp });
                }).
                catch(e => console.error(e));
        }
        else {
            this.historyLoaded = true;
            this.historyCreatedNew = true;
            this.historyModified = true;
            this.setState({ history: new SprintHistory({}) });
        }
    }
    LoadTeams() {
        fetch("api/teams/getFreeTeams", { credentials: "include" }).
            then(response => response.json() as any).
            then(data => {
                let teamsTemp: Team[] = [];
                (data as any[]).map(t => teamsTemp.push(new Team(t)));
                this.teamLoaded = true;
                this.setState({ teams: teamsTemp });
            }).
            catch(e => console.error(e));
    }



    public render() {
        let contents: JSX.Element;

        if (this.sprintLoaded)
            contents =
                <div className="editWindow">
                    {this.getHeader()}
                    <div className="sprintMainBlock inline-block">
                        {this.getNameInput()}
                        {this.getTeamSelector()}
                        {this.getStageSelector()}
                        {this.getReletedStoriesLink()}
                    </div>

                    <div className="sprintHistoryBlock inline-block">
                        {this.getHistoryBlock()}
                    </div>

                    {this.getReviewInput()}
                    {this.getRetrospectiveInput()}
                    {this.getButtons()}
                    {this.GetDeleteConfirmModal()}
                </div>
        else
            contents = <p><em>Loading...</em></p>

        return contents;
    }
    getHeader() {
        return <div className="editHead">
            <h2> Sprint editing page</h2>
            <br />
            <h3>"{this.state.sprint.name}"</h3>
        </div>;
    }
    getNameInput() {
        return (
            <div>
                <h3 className="hStyle">Name:&nbsp;&nbsp;
                <input
                        className="form-control inline-block"
                        type="text"
                        value={this.state.sprint.name}
                        onChange={this.handleNameChange.bind(this)}
                    />
                </h3>
            </div>

        )
    }
    getTeamSelector() {
        let options: JSX.Element[] = [];
        let index = 0;

        if (this.state.sprint.team)
            options.push(
                <option key={index++} value={this.state.sprint.team.id}>
                    {this.state.sprint.team.name}
                </option>
            )
        else
            options.push(<option key={index++} value={-1} />)


        if (this.state.teams)
            this.state.teams.forEach(team => {
                options.push(
                    <option key={index++} value={team.id}>
                        {team.name}
                    </option>
                );
            });


        return (
            <div>
                <h3 className="hStyle">Team:&nbsp;&nbsp;&nbsp;
                <select
                        className="form-control inline-block"
                        value={this.state.sprint.teamId}
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
                        value={this.state.sprint.stage}
                        onChange={this.handleStageChange.bind(this)}>
                        {items};
                    </select>
                </h3>
            </div>
        );
    }
    getReletedStoriesLink() {
        return (
            <div>
                <h3 className="hStyle">Stories:&nbsp;
                    <button className="form-control inline-block">
                        <NavLink
                            to={`../stories?filter=sprintid eq ${this.id}`}
                            activeClassName='active'>
                            Go to related stories
                        </NavLink>
                    </button>
                </h3>
            </div >
        );
    }
    getHistoryBlock() {
        if (!this.historyLoaded)
            return <div>
                <h3 className="hStyle">History</h3>
                <p><em>Loading...</em></p>
            </div>

        return (
            <div>
                <h3 className="hStyle">History</h3>

                <h4 className="hStyle">Begin:&nbsp;&nbsp;
                <div className="inline-block">
                        <DatePicker
                            locale="uk-ua"
                            className="form-control"
                            selected={this.state.history.begined}
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
                            selected={this.state.history.ended}
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
                    value={this.state.sprint.review}
                    onChange={this.handleReviewChange.bind(this)}
                />
            </div>
        )
    }
    getRetrospectiveInput() {
        return (
            <div>
                <h3 className="hStyle">Retrospective:</h3>
                <textarea
                    className="areaStyle fa-text-height"

                    name="Description"
                    type="text"
                    value={this.state.sprint.retrospective}
                    onChange={this.handleRetrospChange.bind(this)}
                />
            </div>
        )
    }
    getButtons() {
        return (
            <div className="text-center">
                <button
                    className="btn"
                    data-toggle="modal"
                    data-target="#ConfirmDialog"
                    role="button">Update</button>

                &nbsp;&nbsp;&nbsp;&nbsp;

                <button
                    className="btn inline-block"
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



    handleNameChange(event: any) {
        let newState = this.state.sprint;
        newState.name = event.target.value;
        this.setState({ sprint: newState });
    }
    handleReviewChange(event: any) {
        let newState = this.state.sprint;
        newState.review = event.target.value;
        this.setState({ sprint: newState });
    }
    handleRetrospChange(event: any) {
        let newState = this.state.sprint;
        newState.retrospective = event.target.value;
        this.setState({ sprint: newState });
    }
    handleStageChange(event: any) {
        let newState = this.state.sprint;
        newState.stage = event.target.value;
        this.setState({ sprint: newState });
    }
    handleTeamChange(event: any) {
        let newState = this.state.sprint;
        newState.teamId = event.target.value;
        this.setState({ sprint: newState });
    }
    handleBeginChange(date: moment.Moment) {
        this.historyModified = true;

        let historyNew = this.state.history;
        historyNew.begined = date;
        this.setState({ history: historyNew });
    }
    handleEndChange(date: moment.Moment) {
        this.historyModified = true;

        let historyNew = this.state.history;
        historyNew.ended = date;
        this.setState({ history: historyNew });
    }



    private handleCancel() {
        this.props.history.push('/sprints');
    }
    private handleSave() {
        if (this.historyModified)
            if (this.historyCreatedNew)
                this.PostHistoryAndConnectToSprint().
                    then(() => this.PatchSprint());
            else {
                this.PatchHistory();
                this.PatchSprint();
            }
        else
            this.PatchSprint();
    }
    PostHistoryAndConnectToSprint(): Promise<any> {

        let historyUpdateModel = this.state.history.getUpdateModel();

        return fetch(this.HISTORY_UPDATE_URL,
            {
                method: 'POST',
                body: JSON.stringify({
                    '@odata.type': 'DAL.Models.SprintStagesHistory',
                    ...historyUpdateModel
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

                this.state.sprint.historyId = historyTemp.id;
                this.historyCreatedNew = false;
                this.historyModified = false;

                this.setState({ history: historyTemp });

            });
    }
    PatchHistory(): Promise<any> {

        let historyUpdateModel = this.state.history.getUpdateModel();

        return fetch(this.HISTORY_UPDATE_URL + this.state.sprint.historyId,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    '@odata.type': 'DAL.Models.SprintStagesHistory',
                    ...historyUpdateModel
                }),
                headers: this.HEADERS

            }).
            then(() => {
                this.historyCreatedNew = false;
                this.historyModified = false;
            })
    }
    PatchSprint(): Promise<any> {
        let sprintUpdateModel = this.state.sprint.getUpdateModel();

        return fetch(this.SPRINT_UPDATE_URL + this.state.sprint.id,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    '@odata.type': 'DAL.Models.Sprint',
                    ...sprintUpdateModel
                }),
                headers: this.HEADERS
            }).
            then(() =>
                this.props.history.push('/sprints')
            );
    }
}