import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Sprint } from '../Models/Sprint';
import { NavLink } from 'react-router-dom';
import { SprintReview } from '../Models/SprintReview';
import { User } from '../Models/User';
import { RetrospectiveMeeting } from '../Chats/RetrospectiveMeeting';
import { DailyStandUp } from '../Models/DailyStandUp';
import { now, isDate } from 'moment';
import * as moment from '../../../node_modules/moment';


interface ISprintsFetchingState {
    Sprint: Sprint;
    Sprints: Sprint[];
    SprintId: number;
    SprintReviews: SprintReview[];
    SprintReview: SprintReview;
    DailyStandUps: DailyStandUp[];
    DailyStandUp: DailyStandUp;
    Myself: User;
    currentSprint: number;
}

export class SelectSprint extends React.Component<RouteComponentProps<{}>, ISprintsFetchingState> {
    constructor(props: any) {
        super(props);
        this.getMyself()
        this.getSprints();
        this.getSprintReviews();
        this.getDailyStandUps();
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.renderSprintReviewButtons = this.renderSprintReviewButtons.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.renderDailyStandUpButton = this.renderDailyStandUpButton.bind(this);
        //this.currentSprint = this.currentSprint.bind(this);
    }

    private isLoading: boolean = true;
    private sprintURL: string = "odata/sprints?$expand=history";
    private sprintReviewURL: string = "odata/SprintReview?$expand=sprint";
    private dailyStandUpURL: string = "odata/DailyStandUp?$expand=sprint";


    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return <div>{contents}</div>
    }

    public renderContent() {
        return <div>
            {this.showSprints()}
            <div className="col-md-3">
                {this.renderSprintPlaningButton()}
            </div>
                <div className="col-md-3">
                {this.renderSprintReviewButtons(this.state.SprintId)}
            </div>
                    <div className="col-md-3">
                {this.renderRetrospectiveButton()}
            </div>
            <div className="col-md-3">
                {this.renderDailyStandUpButton(this.state.SprintId)}
            </div>
        </div>
    }

    private getSprints() {
        fetch(this.sprintURL, { credentials: "include" })
            .then(response => {
                if (response.url.indexOf('login') !== -1) {
                    this.props.history.push('/login');
                } else {
                    let responseData = response.json() as Promise<any>;
                    responseData.then(data => {
                        this.setSprints(data);
                    })
                }
            })
    }

    private setSprints(data: any) {
        this.isLoading = false;
        var sprintsData = data['value'];
        let sprints: Sprint[] = [];
        for (var i = 0; i < sprintsData.length; i++) {
            var sprint = new Sprint(sprintsData[i])
            sprints.push(sprint);
        }
        this.setState(
            {
                Sprints: sprints,
                SprintId: sprintsData[0].Id
            });
    }

    public showSprints() {
        if (this.state.Sprints) {
            let spr: Sprint[] = this.state.Sprints;
            return <div className="text-center">
                <h2>Select sprint for meeting:</h2>
                <select className="form-control inline-block"
                    style={{ margin: "20px 0px 20px 0px" }}
                    onChange={this.handleSelectChange}>
                    {spr.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
            </div>
        }
    }

    handleSelectChange(event: any) {
        var id = event.target.value as number;
        this.setState(
            {
                SprintId: id
            });
    }

    renderSprintPlaningButton() {
        return <button onClick={() => this.props.history.push('/SprintPlaning/' + this.state.SprintId)}
            className="btn">Sprint planning</button>
    }

    private renderSprintReviewButtons(sprintId: number) {
        var sprintReviewId = this.findSprintReview();
        if (sprintReviewId) {
            return <button className="btn"
                onClick={() => this.props.history.push('/SprintReviewEdit/' + sprintReviewId)}>
                Review
            </button >
        }
        return <button className="btn btn-disabled"
                disabled={!this.userIsScrumMaster()}
                onClick={() => this.createSprintReview(this.state.SprintId)}>
            Create review
        </button >
    }

    private renderDailyStandUpButton(sprintId: number) {
        return <button className="btn"
            //disabled={!this.userIsScrumMaster()}
                onClick={() => this.createDailyStandUp(this.state.SprintId)}>
                Create Stand-Up
            </button >
    }

    renderRetrospectiveButton() {
        return <button onClick={this.handleButtonClick}
            className="btn">Retrospective</button>
    }

    handleButtonClick() {
        this.props.history.push({
            pathname: './RetrospectiveMeeting',
            state: { SprintId: this.state.SprintId }
        });
    }

    private findSprintReview() {
        if (this.state.SprintReviews) {
            for (var i = 0; i < this.state.SprintReviews.length; i++) {
                if (this.state.SprintReviews[i].sprintId == this.state.SprintId) {
                    return this.state.SprintReviews[i].id
                }
            }
        }
    }

    private getDailyStandUps() {
        fetch(this.dailyStandUpURL, {
            credentials: 'include'
        })
            .then(response => response.json() as any)
            .then(data => {
                this.setDailyStandUps(data);
            })
    }

    private setDailyStandUps(data: any) {
        this.isLoading = false;
        var dailyStandUpsData = data['value'];
        let dailyStandUps: DailyStandUp[] = [];
        for (var i = 0; i < dailyStandUpsData.length; i++) {
            var dailyStandUp = new DailyStandUp(dailyStandUpsData[i])
            dailyStandUps.push(dailyStandUp);
        }
        this.setState(
            {
                DailyStandUps: dailyStandUps
            });
    }

    createDailyStandUp(sprintId: number) {
        let newDailyStandUp = new DailyStandUp({ SprintId: sprintId, Description: "" });
            console.log(newDailyStandUp);
            fetch("DailyStandUp/CreateStandUp/", {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    '@odata.type': 'DAL.Models.DailyStandUp',
                    ...newDailyStandUp
                }),
                headers: {
                    'OData-Version': '4.0',
                    'Content-Type': 'application/json;odata.metadata=minimal',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.props.history.push('/DailyStandUpMeeting/' + data.Id) /*this.state.SprintId*/
                });
    }

    private getSprintReviews() {
        fetch(this.sprintReviewURL, {
            credentials: 'include'
        })
            .then(response => response.json() as any)
            .then(data => {
                this.setSprintReviews(data);
            })
    }

    private setSprintReviews(data: any) {
        this.isLoading = false;
        var sprintReviewsData = data['value'];
        let sprintReviews: SprintReview[] = [];
        for (var i = 0; i < sprintReviewsData.length; i++) {
            var sprintReview = new SprintReview(sprintReviewsData[i])
            sprintReviews.push(sprintReview);
        }
        this.setState(
            {
                SprintReviews: sprintReviews
            });
    }



    createSprintReview(sprintId: number) {
        let newSprintReview = new SprintReview({ SprintId: sprintId, IsGoalAchived: false, IsStoriesCompleted: false });
        fetch("SprintReview/CreateReview/", {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({
                '@odata.type': 'DAL.Models.SprintReview',
                ...newSprintReview
            }),
            headers: {
                'OData-Version': '4.0',
                'Content-Type': 'application/json;odata.metadata=minimal',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.props.history.push('/SprintReviewEdit/' + data.Id)
            });
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

    userIsScrumMaster() {
        if (this.state.Myself&&this.state.Myself.role.name == "ScrumMaster") {
            return true;
        }
        return false;
    }


}
