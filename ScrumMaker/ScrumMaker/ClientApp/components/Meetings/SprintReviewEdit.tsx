/// <reference path="../models/defectpriority.tsx" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { User } from '../Models/User';
import { Sprint } from '../Models/Sprint';
import { Story, StoryStatus } from '../Models/Story';
import { SprintReview } from '../Models/SprintReview';
import { Role } from '../Models/Role';

interface ISprintReviewFetchingState {
    IsGoalAchived: boolean;
    Sprint: Sprint;
    SprintId: number;
    IsStoriesCompleted: boolean;
    Myself: User;
}

export class SprintReviewEdit extends React.Component<RouteComponentProps<{}>, ISprintReviewFetchingState> {

    constructor() {
        super();
        this.getSprintReview();
        this.getMyself();
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    private link: string = (window.location.href);
    readonly id: string = this.link.substr(this.link.lastIndexOf('/') + 1);
    private getSprintReviewURL: string = "odata/SprintReview?$expand=sprint($expand=backlog,team($expand=members($expand=role)))&$filter=id eq ";
    private isLoading: boolean = true;
    private updateURL: string = "odata/SprintReview/";
    
    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return <div>{contents}</div>
    }

    public renderContent() {
        return <div>
            {this.setSprintReview.bind(this)}
            {this.EditSprintReview()}
            {this.setSprintReview.bind(this)}
        </div>
    }

    public EditSprintReview() {
        return <div>
            <h1 className="text-center">Sprint "<i>{this.state.Sprint.name}</i>" review</h1>
            <div className="row">
                <div className="col-md-3">
                    {this.GetTeamTable()}
                </div>
                <div className="col-md-9">
                    {this.GetBacklogTable()}
                </div>
            </div>
            <div>
                {this.GetDone()}
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

    public GetBacklogTable() {
        return <table className='table table-scrum table-hover td-scrum'>
            <thead>
                <tr>
                    <th colSpan={2}
                        className="well col-md-2"><b>Sprint backlog</b>
                    </th>
                    
                </tr>
                <tr>
                    <th className="well col-md-1"><b>Story's name</b>
                    </th>
                    <th className="well col-md-1"><b>Status</b>
                    </th>
                </tr>
            </thead>
            <tbody>
                {this.state.Sprint.backlog.map(story => this.renderStory(story))}
            </tbody>
        </table>
    }

    public GetDone() {
        return <div>
            <form onSubmit={this.handleSave} name="oldForm">
                <p>Sprint goal:</p>
                <input
                    style={{ width: "100%", height: "100px", fontSize: 20, padding: "7px" }}
                    className="fa-text-height"
                    name="Rewiev"
                    type="textarea"
                    value={this.state.Sprint.goal} />
                <br/>
                <div>
                    <div className="col-xs-6">
                        <p>Goal achived: 
                        <input
                            name="IsGoalAchived"
                            type="checkbox"
                            checked={this.state.IsGoalAchived}
                                onChange={this.handleInputChange} />
                        </p>
                    </div>
                    <div className="col-xs-6">
                        <p>Stories completed: 
                        <input
                            name="IsStoriesCompleted"
                            type="checkbox"
                            checked={this.state.IsStoriesCompleted}
                                onChange={this.handleInputChange} />
                        </p>
                    </div>
                </div>
                <div>
                    <button className="login100-form-btn"
                        disabled={!this.userIsScrumMaster()}
                        data-toggle="modal"
                        data-target="#confirmDeleteModal">Save</button>
                </div>
            </form>
            {this.GetSaveConfirmModal()}
        </div>
    }

    private GetSaveConfirmModal() {
        return <div id="confirmDeleteModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                        <h4 className="modal-title">The review for "<i>{this.state.Sprint.name}</i>" was saved.</h4>
                    </div>
                    <div className="modal-body text-center">
                        <button className="btn btn-default" type="button" data-dismiss="modal">
                            Ok</button>
                    </div>
                </div>
            </div>
        </div>;
    }

    userIsScrumMaster() {
        if (this.state.Myself.role.name == "ScrumMaster") {
            return true;
        }
        return false;
    }

    handleInputChange(event: any) {
        
        const target = event.target;
        const value = target.checked;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    private handleSave(event: any) {
        event.preventDefault();
        var form = new FormData(event.target);
        var doneUpdate = {
            IsGoalAchived: this.state.IsGoalAchived,
            IsStoriesCompleted: this.state.IsStoriesCompleted
        };

        fetch(this.updateURL + this.id, {
            credentials: 'include',
            method: 'Patch',
            body: JSON.stringify({
                '@odata.type': 'DAL.Models.SprintReview',
                ...doneUpdate
            }
            ),
            headers: {
                'OData-Version': '4.0',
                'Content-Type': 'application/json;odata.metadata=minimal',
                'Accept': 'application/json'
            }
        })
    }

    private renderMember(user: User) {
        if (user.role.name !== "ScrumMaster")
            return <tr key={user.userId}>
                <td>
                    {user.login}
                </td>
            </tr >
        return <tr key={user.userId}>
            <td>
                {user.login} (<b>{user.role.name}</b>)
            </td>
        </tr>
            
    }

    private renderStory(story: Story) {
        return <tr key={story.id}>
            <td>{story.name}</td>
            {this.selectExpiredStories(story)}
        </tr>
    }

    private selectExpiredStories(story: Story) {
        if (story.status.toString() !== "Accepted")
            return<td style={{ color: "red" }}>{story.status}</td>
        return<td>{story.status}</td>
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

    private getSprintReview() {
        fetch(this.getSprintReviewURL + this.id, {
            credentials: 'include',
        })
            .then(response => response.json() as any)
            .then(data => {
                this.setSprintReview(data);
            })
    }

    private setSprintReview(data: any) {
        this.isLoading = false;
        var sprintReviewData = data['value'][0];
        var sprintReview = new SprintReview(sprintReviewData);
        this.setState(
            {
                IsGoalAchived: sprintReview.isGoalAchived,
                Sprint: sprintReview.sprint,
                SprintId: sprintReview.sprintId,
                IsStoriesCompleted: sprintReview.isStoriesCompleted
            });
    }
}