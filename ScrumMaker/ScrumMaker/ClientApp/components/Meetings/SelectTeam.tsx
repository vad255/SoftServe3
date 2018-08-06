import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Sprint } from '../Models/Sprint';
import { DailyStandUp } from "../Models/DailyStandUp";

interface ISelectSprintState {
    Sprints: Sprint[];
    DailyStandUps: DailyStandUp[];
    DailyStandUp: DailyStandUp;
}

export class SelectTeam extends React.Component<RouteComponentProps<any>, ISelectSprintState> {
    constructor() {
        super();
        this.getSprints();
        this.getDailyStandUps();
    }


    private isLoading: boolean = true;
    private sprintURL: string = "odata/sprints?$expand=history";
    private dailyStandUpURL: string = "odata/DailyStandUp?$expand=sprint";

    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return <div>{contents}</div>
    }


    public renderContent() {
        return <div>
            <h3>Choose sprint:</h3>
            {this.ShowSprints()}
        </div>
    }

    private getSprints() {
        fetch(this.sprintURL, { credentials: "include" })
            .then(response => response.json() as any)
            .then(data => {
                this.setSprints(data);
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
                Sprints: sprints
            });
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


    private ShowSprints() {
        return <div>
            <ul>
                {this.state.Sprints && this.state.DailyStandUps && this.state.Sprints.map(sprint => this.RenderSprint(sprint))}
            </ul>
        </div>
    }


    private RenderSprint(sprint: Sprint) {
        var dailyStandUpId = this.findDailyStandUp(sprint);
        return <li key={sprint.id}>
            <br />
            <b>{sprint.name}</b>
            {this.renderDailyStandUpButton(sprint, dailyStandUpId)}
        </li>
    }


    private findDailyStandUp(sprint: Sprint) {
        for (var i = 0; i < this.state.DailyStandUps.length; i++) {
            if (this.state.DailyStandUps[i].sprintId === sprint.id) {
                return this.state.DailyStandUps[i].id
            }
        }
    }


    private renderDailyStandUpButton(sprint: Sprint, dailyStandUpId: any) {
        if (dailyStandUpId) {
            return <button className="btn btn-default" onClick={() => this.props.history.push('/DailyStandUp/' + dailyStandUpId)}>
                Select
            </button >
        }

        return <button className="btn btn-default" onClick={() => this.createDailyStandUp(sprint.id)}>
            Create
        </button >
    }


    createDailyStandUp(sprintId: number) {
        console.log(sprintId)
        let newDailyStandUp = new DailyStandUp({ SprintId: sprintId, Description: "", Conducted: Date });
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
                console.log(data)
                this.props.history.push('/DailyStandUp/' + data.Id)
            });
    }



}










