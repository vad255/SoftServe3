import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Switch } from 'react-router-dom';
import { Story } from "../Models/Story";
import { StoryStatus } from "../Models/Story";
import { User } from "../Models/User";
import { Team } from "../Models/Team";
import { Sprint } from "../Models/Sprint";
import { State } from "../Models/FeatureState";

interface ICreatePageState {
    FeatureNameValue: string;
    StateValue: State;
    DescriptionValue: string;
    BlockedValue: boolean;
    StoriesValue: Story[];
    ProgramIncrementValue: string;
    OwnerUserIdValue: number;
    OwnerValue: User;
    Users: User[];
    Stories: Story[];
}

export class FeatureCreate extends React.Component<RouteComponentProps<any>, ICreatePageState> {
    constructor(props: any) {
        super(props);
        this.state = (({
            FeatureNameValue: '',
            StateValue: State,
            DescriptionValue: '',
            BlockedValue: false,
            StoriesValue:[],
            ProgramIncrementValue: '',
            OwnerUserIdValue: -1,
            OwnerValue: User,
            Users: [],
            Stories:[]
        }) as any);
        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    }

    private getUserURL: string = "odata/users/";
    private getStoryURL: string = "odata/stories/";

    public render() {
        return <div className="text-left">
            {this.getUsers()}
            {this.getStories()}
            <div>{this.createFeature()}</div>
        </div>
    }

    createFeature() {
        return <form>
            <div className="text-center">
                <h2 style={{ margin: "10px", padding: "5px", textAlign: "center" }}>Create feaure</h2>
            </div>
            <h3 className="hStyle">Name:&nbsp;&nbsp;
                <input
                    className="form-control inline-block"
                    name="FeatureName"
                    type="text"
                    value={this.state.FeatureNameValue}
                    onChange={this.handleInputChange} />
            </h3>



            <h3 className="hStyle"> Owner:&nbsp;&nbsp;
                    <select className="form-control inline-block CreatePage" onChange={this.handleOkButtonClick}>
                        {this.state.Users.map(user => <option key={user.userId} value={user.userId}>{user.login}</option>)}
                </select>
            </h3>

            <h3 className="hStyle"> Stories:&nbsp;&nbsp;
                    <select className="form-control inline-block CreatePage" onChange={this.handleOkButtonClick}>
                    {this.state.Stories.map(story => <option key={story.id} value={story.id}>{story.name}</option>)}
                </select>
            </h3>

            <h3 className="hStyle">State:&nbsp;&nbsp;
            {this.renderStates()}
            </h3>
            <h3 className="hStyle">Program increment:&nbsp;&nbsp;
                <input
                    className="form-control inline-block"
                    name="ProgramIncrement"
                    type="text"
                    value={this.state.ProgramIncrementValue}
                    onChange={this.handleInputChange} />
            </h3>
            <h3 className="hStyle">Description:</h3>
            <textarea
                className="areaStyle"
                name="Description"
                type="text"
                value={this.state.DescriptionValue}
                onChange={this.handleInputChange} />
            <div className="text-center">
                <div role='button'
                    className='btn btn-primary'
                    data-toggle="modal"
                    data-target="#confirmDeleteModal"
                    onClick={this.handleCreateButtonClick}>
                    Add element
                </div>
            </div>
        </form>
    }

    private renderStates() {
        let names: string[] = [];
        for (let iterator in State) {
            if (!parseInt(iterator))
                names.push(iterator.toString());
        }

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++) {
            items.push(<option key={i + 1} value={names[i]}>{names[i]}</option>);
        }

        return <select
            className="form-control inline-block"
            value={this.state.StateValue}
            name="State"
            onChange={this.handleInputChange}>
            {items}
        </select>
    }

    private renderUsers() {
        let items: JSX.Element[] = [];
        var users = this.state.Users;
        for (var i = 0; i < users.length; i++) {
            items.push(<option key={i + 1} value={users[i].userId}>{users[i].login}</option>);
        }

        return <select
            value={this.state.OwnerUserIdValue}
            name="OwnerUserId"
            onChange={this.handleInputChange}>
            {items}
        </select>
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    handleCreateButtonClick() {
            fetch('odata/feature',
                {
                    method: 'Post',
                    headers: {
                        'OData-Version': '4.0',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;odata.metadata=minimal',
                    },
                    body: JSON.stringify({
                        '@odata.type': 'DAL.Models.Feature',
                        'Name': this.state.FeatureNameValue,
                        'State': this.state.StateValue,
                        'Description': this.state.DescriptionValue,
                        'Blocked': this.state.BlockedValue,
                        'ProgramIncrement': this.state.ProgramIncrementValue,
                        'OwnerUserId': this.state.OwnerUserIdValue
                    })
                });
    }

    private GetCreateConfirmModal() {
        return <div id="confirmDeleteModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                        <h4 className="modal-title">The feature "{this.state.FeatureNameValue}" was created.</h4>
                    </div>
                    <div className="modal-body text-center">
                        <button className="btn btn-default" type="button" data-dismiss="modal" onClick={this.handleOkButtonClick} >
                            Ok</button>
                    </div>
                </div>
            </div>
        </div>;
    }

    handleOkButtonClick() {
        this.props.history.push("/feature");
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
        var storyData = data['value'];
        let stories: Story[] = [];
        for (var i = 0; i < storyData.length; i++) {
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
}