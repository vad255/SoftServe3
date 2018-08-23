import * as React from "react";
import Select from 'react-select';
import Switch from 'react-switch';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Story } from "../Models/Story";
import { StoryStatus } from "../Models/Story";
import { User } from "../Models/User";
import { Team } from "../Models/Team";
import { Sprint } from "../Models/Sprint";
import { State } from "../Models/FeatureState";

interface ICreatePageState {
    FeatureName: string;
    State: State;
    Description: string;
    Blocked: boolean;
    ProgramIncrement: string;
    OwnerUserId: number;
    Owner: User;
    Users: User[];
    SelectedStories: Story[];
    Stories: Story[];
}

export class FeatureCreate extends React.Component<RouteComponentProps<any>, ICreatePageState> {
    constructor(props: any) {
        super(props);
        this.state = (({
            FeatureName: '',
            State: State.ReadyToStart.toString(),
            Description: '',
            Blocked: false,
            ProgramIncrement: '',
            OwnerUserId: -1,
            Owner: User,
            Users: [],
            SelectedStories: [],
            Stories: []
        }) as any);
        this.getUsers();
        this.getStories();
        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleChangeBlocked = this.handleChangeBlocked.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderStates = this.renderStates.bind(this);
        this.handleSelectionStories = this.handleSelectionStories.bind(this);
        this.handleOkButtonClick = this.handleOkButtonClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
    }

    private isLoading: boolean = true;
    private getUserURL: string = "odata/users/";
    private getStoryURL: string = "odata/stories/";

    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.createFeature();
        return <div className="text-left">
            {contents}
            {this.GetCreateConfirmModal()}
        </div>
    }

    createFeature() {
        return <form method="post" onSubmit={this.handleCreateButtonClick}>
            <div className="text-center">
                <h2 className="h2EditCreatePage">Create feature</h2>
            </div>
            <h3 className="hStyle">Name:</h3>
            <input className="input-lg inputField fontStyle"
                name="FeatureName"
                type="text" style={{ width: "35%" }}
                value={this.state.FeatureName}
                onChange={this.handleInputChange}
                maxLength={30}
                required />

            <h3 className="hStyle"> Owner:</h3>
            {this.renderUsers()}
            <h3 className="hStyle">State:</h3>
            {this.renderStates()}
            <h3 className="hStyle">Program increment:</h3>
            <input className="input-lg inputField fontStyle"
                name="ProgramIncrement"
                type="text" style={{ width: "35%" }}
                value={this.state.ProgramIncrement}
                onChange={this.handleInputChange} />
            <div className="switchSection">
                <span className="spanStyle">Blocked:&nbsp;&nbsp;</span>
                <Switch onChange={this.handleChangeBlocked}
                    checked={this.state.Blocked}
                    id="normal-switch" />
            </div>
            <h3 className="hStyle"> Stories:</h3>
            <Select
                className="fontStyle"
                value={this.state.SelectedStories.map(st => { return { value: st.id != undefined ? st.id : null, label: st.name != undefined ? st.name : null } })}
                multi
                name="Stories" style={{ width: "35%" }}
                closeOnSelect={!true}
                onChange={this.handleSelectionStories}
                options={this.state.Stories.map(st => { return { value: st.id, label: st.name } })}/>
            <h3 className="hStyle">Description:</h3>
            <textarea className="areaStyle fontStyle"
                name="Description"
                type="text" style={{ width: "35%" }}
                value={this.state.Description}
                onChange={this.handleInputChange}
                maxLength={500}
                required />
            <div className="text-center">
                <button
                    disabled={this.isAllFieldsFilled()}
                    className='scrum-btn btn-dark'
                    data-toggle="modal"
                    data-target="#confirmCreateModal">
                    Add element
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                    className="scrum-btn btn-dark"
                    onClick={this.handleCancel}>Discard</button>
            </div>
        </form>
    }

    private handleCancel() {
        this.props.history.push('/feature');
    }

    isAllFieldsFilled() {
        if (this.state.FeatureName == "" || this.state.OwnerUserId == -1 || this.state.Description == ""){
            return true;
        }
        return false
    }

    handleChangeBlocked(checked: boolean) {
        this.setState({ Blocked: checked });
    }

    handleSelectionStories(storiesSelected: any) {
        let selectedStories: Story[] = [];

        for (let i = 0; i < storiesSelected.length; i++) {
            let storyToPush: Story = this.state.Stories.filter(story => {
                return story.id === storiesSelected[i].value
            })[0];

            selectedStories.push(storyToPush);
        }

        this.setState({ SelectedStories: selectedStories });
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    private renderStates() {
        let names: string[] = [];
        for (let iterator in State) {
            if (!parseInt(iterator)) {

                names.push(iterator.toString());
            }
        }

        let items: JSX.Element[] = [];
        for (let i = 0; i < names.length; i++) {
            items.push(<option key={i + 1} value={names[i]}>{names[i]}</option>);
        }

        return <select
            className="form-control fontStyle selectStyle"
            value={names[this.state.State - 1]}
            name="State" style={{ width: "35%" }}
            onChange={this.handleInputChange}>
            {items}
        </select>
    }

    private renderUsers() {
        let items: JSX.Element[] = [];
        var users = this.state.Users;
        for (let i = 0; i < users.length; i++) {
            items.push(<option key={i + 1} value={users[i].userId}>{users[i].login}</option>);
        }

        return <select
            className="form-control fontStyle selectStyle"
            value={this.state.OwnerUserId}
            name="OwnerUserId" style={{ width: "35%" }}
            onChange={this.handleInputChange}>
            {items}
        </select>
    }

    private getStories() {
        fetch(this.getStoryURL, {
            credentials: 'include',
        })
            .then(response => response.json() as any)
            .then(data => {
                this.setStories(data);
            })
    }

    private setStories(data: any) {
        this.isLoading = false;
        var storyData = data['value'];
        let stories: Story[] = [];
        for (let i = 0; i < storyData.length; i++) {
            var story = new Story(storyData[i])
            stories.push(story);
        }

        this.setState(
            {
                Stories: stories
            });
    }

    private getUsers() {
        fetch(this.getUserURL, {
            credentials: 'include',
        })
            .then(response => response.json() as any)
            .then(data => {
                this.setUsers(data);
            })
    }

    private setUsers(data: any) {
        this.isLoading = false;
        var userData = data['value'];
        let users: User[] = [];
        for (var i = 0; i < userData.length; i++) {
            var user = new User(userData[i])
            users.push(user);
        }

        this.setState(
            {
                Users: users
            });
    }

    handleCreateButtonClick(e: any) {
        e.preventDefault();
        if (this.state.FeatureName == "" || this.state.OwnerUserId == -1 || this.state.Description == "") {

        }
        else {
            fetch('odata/feature',
                {
                    method: 'POST',
                    headers: {
                        'OData-Version': '4.0',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;odata.metadata=minimal',
                    },
                    body: JSON.stringify({
                        '@odata.type': 'DAL.Models.Feature',
                        'FeatureName': this.state.FeatureName,
                        'State': this.state.State,
                        'Description': this.state.Description,
                        'Blocked': this.state.Blocked,
                        'ProgramIncrement': this.state.ProgramIncrement,
                        'OwnerUserId': this.state.OwnerUserId
                    })
                }).then(response => response.json() as any)
                .then(data => {
                    this.state.SelectedStories.map(story => {
                        fetch('odata/Stories(' + story.id + ')',
                            {
                                method: 'PATCH',
                                headers: {
                                    'OData-Version': '4.0',
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json;odata.metadata=minimal',
                                },
                                body: JSON.stringify(
                                    {
                                        '@odata.type': 'DAL.Models.Story',
                                        'Name': story.name,
                                        'Status': story.status,
                                        'Description': story.description,
                                        'Team': story.team,
                                        'UserId': story.userId,
                                        'Sprint': story.sprint,
                                        'Tasks': story.tasks,
                                        'SprintId': story.sprintId,
                                        'PokerMark': story.pokerMark,
                                        'FeatureId': data.Id
                                    }
                                )
                            }
                        )
                    })
                });
        }
    }

    private GetCreateConfirmModal() {
        return <div id="confirmCreateModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                            <h4 className="modal-title">The feature "{this.state.FeatureName}" was created.</h4>
                        </div>
                        <div className="modal-body text-center">
                            <button className="btn-primary scrum-btn" type="button" data-dismiss="modal" onClick={this.handleOkButtonClick} >
                                Ok</button>
                        </div>
                    </div>
                </div>
            </div>
    }

    handleOkButtonClick() {
        this.props.history.push("/feature");
    }

}
