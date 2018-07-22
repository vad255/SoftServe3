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
}

export class SprintReviewEdit extends React.Component<RouteComponentProps<{}>, ISprintReviewFetchingState> {

    constructor() {
        super();
        this.getSprintReview();
        this.handleSave = this.handleSave.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    private link: string = (window.location.href);
    readonly id: string = this.link.substr(this.link.lastIndexOf('/') + 1);
    private getSprintReviewURL: string = "odata/SprintReview?$expand=sprint($expand=backlog,team($expand=members($expand=role)))&$filter=id eq ";
    private isLoading: boolean = true;
    private updateURL: string = "odata/SprintReview/"
    
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
            <h1 className="text-center">Sprint "{this.state.Sprint.name}" review</h1>
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
                <p>Done goal:</p>
                <input
                    name="IsGoalAchived"
                    type="checkbox"
                    checked={this.state.IsGoalAchived}
                    onChange={this.handleInputChange} />
                <p>Done stories:</p>
                <input
                    name="IsStoriesCompleted"
                    type="checkbox"
                    checked={this.state.IsStoriesCompleted}
                    onChange={this.handleInputChange} />
                <div>
                    <button className="login100-form-btn">Save goal</button>
                </div>
            </form>
        </div>
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
        if (story.status.toString() !== "DevComplete")
            return<td style={{ color: "red" }}>{story.status}</td>
        return<td>{story.status}</td>
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