import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Sprint } from '../Models/Sprint';
import { Story } from '../Models/Story';
import { State } from '../Models/FeatureState';
import { NavLink } from 'react-router-dom';
import { IDbModel } from '../Models/IDbModel'
import { SprintStage } from '../Models/SprintStage';
import { Team } from '../Models/Team';


interface ISprintEditState extends IEditState {
    item: Sprint
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
    private MAIN_URL: string = "odata/sprints?$expand=team,backlog,history&$filter=id eq ";

    constructor() {
        super();
        console.log("Constructor");

        let link = window.location.href;
        this.id = parseInt(link.substr(link.lastIndexOf('/') + 1));
        this.URL = "odata/sprints?$expand=team,backlog,history&$filter=id eq " + this.id;

        this.handleSave = this.handleSave.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.LoadData();
    }

    public LoadData() {
        fetch(this.URL)
            .then(response => response.json() as any)
            .then(data => {
                this.OnDataReceived(data);
            }).catch(e => console.error(e));

        fetch("api/teams/getFreeTeams", { credentials: "include" }).
            then(response => response.json() as any).
            then(data => {
                let teamsTemp: Team[] = [];
                (data as any[]).map(t => teamsTemp.push(new Team(t)));
                this.setState({ teams: teamsTemp });
            }).
            catch(e => console.error(e));

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
        return (
            <div>
                <h3 className="hStyle">History</h3>
                <h4 className="hStyle">Begin:&nbsp;&nbsp;
                <input
                        className="form-control inline-block"
                        type="text"
                        value={this.state.item.name}
                        onChange={this.handleNameChange.bind(this)}
                    />
                </h4>
                {/* <h4 className="hStyle">End:&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="container">
                        <div className="row">
                            <div className='col-sm-6'>
                                <div className="form-group">
                                    <div className='input-group date' id='datetimepicker1'>
                                        <input type='text' className="form-control" />
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-calendar"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* <script type="text/javascript">
                                $(function () {
                                    $('#datetimepicker1').datetimepicker();
                                });
        </script> }
                        </div>
                    </div>
                </h4> */}
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
                    onChange={this.handleReviewChange}
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
                    onChange={this.handleRetrospChange}
                />
            </div>
        )
    }
    getButtons() {
        return (
            <div className="text-center">
                <button
                    className="btn"
                    onClick={this.handleSave.bind(this)}
                >Update</button>

                &nbsp;&nbsp;&nbsp;&nbsp;

                <button
                    className="btn inline-block"
                    onClick={this.handleCancel.bind(this)}
                >Discard</button>
            </div>
        );
    }


    OnDataReceived(data: any) {
        this.isLoading = false;
        let currentItem = new Sprint(data['value'][0]);
        this.setState({ item: currentItem })
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
    handleCancel() {
        this.props.history.push('/sprints');
    }

    private handleSave(event: any) {

        let item = this.state.item;
        let updateModel = {
            Name: item.name,
            TeamId: item.teamId,
            Stage: item.stage,
            Review: item.review,
            Retrospective: item.retrospective,
        };

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