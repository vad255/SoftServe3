import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Sprint } from '../Models/Sprint';
import { Story } from '../Models/Story';
import { State } from '../Models/FeatureState';
import { NavLink } from 'react-router-dom';
import { IDbModel } from '../Models/Abstraction'
import { SprintStage } from '../Models/SprintStage';
import { Team } from '../Models/Team';
import '../../css/editPage.css';
import { ConfirmMadal } from '../ConfirmModal';
import { SprintHistory } from '../Models/SprintHistory';


interface ISprintEditState extends IEditState {
    item: Sprint
    history: SprintHistory;
    teams: Team[]
}

export interface IEditState {
    item: IDbModel
}

export class SprintEdit extends React.Component<RouteComponentProps<{}>, ISprintEditState> {

    private isLoading: boolean = true;
    readonly id: number = -1;
    private URL: string = "";
    private UPDATE_URL: string = "/odata/sprints/";
    private SPRINT_URL: string = "odata/sprints?$expand=team&$filter=id eq ";
    private HISTORY_URL: string = "odata/SprintStagesHistory?$filter=id eq "

    constructor() {
        super();

        let link = window.location.href;
        this.id = parseInt(link.substr(link.lastIndexOf('/') + 1));

        this.handleSave = this.handleSave.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.LoadData();
    }

    public LoadData() {
        let url = this.SPRINT_URL + this.id;

        fetch(url, { credentials: "include" })
            .then(response => response.json() as any)
            .then(data => {
                this.OnDataReceived(data);
            }).catch(e => console.error(e));
    }
    public render() {
        let contents: JSX.Element;

        if (this.isLoading)
            contents = <p><em>Loading...</em></p>
        else {
            contents = (
                <div className="editWindow">
                    {this.getHeader()}
                    <div className="sprintMainBlock inline-block">
                        {this.getNameInput()}
                        {this.getTeamSelector()}
                        {this.getStageSelector()}
                        {this.getReletedStoriesLink()}
                    </div>

                    <div className="sprintHistoryBlock inline-block">
                        {this.getHistoyBlock()}
                    </div>

                    {this.getReviewInput()}
                    {this.getRetrospectiveInput()}
                    {this.getButtons()}
                    {this.GetDeleteConfirmModal()}
                </div>
            )
        }
        return contents;
    }



    getHeader() {
        return <div className="editHead">
            <h2> Sprint editing page</h2>
            <br />
            <h3>"{this.state.item.name}"</h3>
        </div>;
    }
    getNameInput() {
        return (
            <div>
                <h3 className="hStyle">Name:&nbsp;&nbsp;
                <input
                        className="form-control inline-block"
                        type="text"
                        value={this.state.item.name}
                        onChange={this.handleNameChange.bind(this)}
                    />
                </h3>
            </div>

        )
    }
    getTeamSelector() {
        let options: JSX.Element[] = [];
        let index = 0;

        if (this.state.item.team) {
            options.push(
                <option key={index++} value={this.state.item.team.id}>
                    {this.state.item.team.name}
                </option>
            )
        }
        else
            options.push(<option key={index++} value={-1} />)


        if (this.state.teams) {
            this.state.teams.forEach(team => {
                options.push(
                    <option key={index++} value={team.id}>
                        {team.name}
                    </option>
                );
            });
        }

        return (
            <div>
                <h3 className="hStyle">Team:&nbsp;&nbsp;&nbsp;
                <select
                        className="form-control inline-block"
                        value={this.state.item.teamId}
                        onChange={this.handleTeamChange.bind(this)}
                    >
                        {options}
                    </select>
                </h3>
            </div>
        );

    }
    getStageSelector() {
        let names: string[] = [];
        for (let iterator in SprintStage) {
            if (!parseInt(iterator))
                names.push(iterator.toString());
        }

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++) {
            items.push(<option key={i + 1} value={names[i]}>{names[i]}</option>);
        }

        return (
            <div>
                <h3 className="hStyle">State:&nbsp;&nbsp;&nbsp;&nbsp;
                    <select
                        className="form-control inline-block"
                        value={this.state.item.stage}
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
    getHistoyBlock() {
        if (!this.state.history)
            return <div>
                <h3 className="hStyle">History</h3>
                <p><em>Loading...</em></p>
            </div>

        return (
            <div>
                <h3 className="hStyle">History</h3>
                <h4 className="hStyle">Begin:&nbsp;&nbsp;
                <input
                        className="form-control inline-block"
                        type="text"
                        value={this.state.history.begined.toLocaleString()}
                        onChange={this.handleBeginedChange.bind(this)}
                    />
                </h4>
                <h4 className="hStyle">End:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                        className="form-control inline-block"
                        type="text"
                        value={this.state.history.ended.toLocaleString()}
                        onChange={this.handleEndedChange.bind(this)}
                    />
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
                    value={this.state.item.review}
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
                    value={this.state.item.retrospective}
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
                    role="button"

                //onClick={this.handleSave.bind(this)}
                >Update</button>

                &nbsp;&nbsp;&nbsp;&nbsp;

                <button
                    className="btn inline-block"
                    onClick={this.handleCancel.bind(this)}
                >Discard</button>
            </div>
        );
    }
    private GetDeleteConfirmModal() {
        let title = "Confirm changes ?";

        return <ConfirmMadal
            onCanceled={this.handleCancel.bind(this)}
            onConfirmed={this.handleSave.bind(this)}
            title={title}
            id={"ConfirmDialog"} />
    }

    OnDataReceived(data: any) {
        fetch("api/teams/getFreeTeams", { credentials: "include" }).
            then(response => response.json() as any).
            then(data => {
                let teamsTemp: Team[] = [];
                (data as any[]).map(t => teamsTemp.push(new Team(t)));
                this.setState({ teams: teamsTemp });
            }).
            catch(e => console.error(e));


        this.isLoading = false;
        let currentItem = new Sprint(data['value'][0]);
        this.setState({ item: currentItem })

        if (this.state.item.historyId > 0)
            fetch(this.HISTORY_URL + this.state.item.historyId, { credentials: "include" }).
                then(response => response.json() as any).
                then(data => {
                    let historyTemp: SprintHistory = new SprintHistory(data['value'][0]);
                    
                    this.setState({ history: historyTemp });
                }).
                catch(e => console.error(e));
    }

    handleNameChange(event: any) {
        let newState = this.state.item;
        newState.name = event.target.value;
        this.setState({ item: newState });
    }
    handleReviewChange(event: any) {
        let newState = this.state.item;
        newState.review = event.target.value;
        this.setState({ item: newState });
    }
    handleRetrospChange(event: any) {
        let newState = this.state.item;
        newState.retrospective = event.target.value;
        this.setState({ item: newState });
    }
    handleStageChange(event: any) {
        let newState = this.state.item;
        newState.stage = event.target.value;
        this.setState({ item: newState });
    }
    handleTeamChange(event: any) {
        let newState = this.state.item;
        newState.teamId = event.target.value;
        this.setState({ item: newState });
    }
    handleBeginedChange(event: any) {
        let newState = this.state.item;
        newState.history.begined = new Date(event.target.value);
        this.setState({ item: newState });
    }
    handleEndedChange(event: any) {
        let newState = this.state.item;
        console.log(new Date(event.target.value));
        
        newState.history.ended = new Date(event.target.value);
        this.setState({ item: newState });
    }

    handleCancel() {
        this.props.history.push('/sprints');
    }


    private handleSave() {

        let updateModel = this.state.item.getUpdateModel();

        fetch(this.UPDATE_URL + this.state.item.id, {
            method: 'Patch',
            body: JSON.stringify({
                '@odata.type': 'DAL.Models.Sprint',
                ...updateModel
            }
            ),
            headers: {
                'OData-Version': '4.0',
                'Content-Type': 'application/json;odata.metadata=minimal',
                'Accept': 'application/json'
            }
        }).then(response => { this.props.history.push('/sprints') });
    }
}