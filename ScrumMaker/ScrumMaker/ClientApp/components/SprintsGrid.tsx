﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import axios from 'axios'

class SprintHistory extends React.Component {

    public empty: boolean = true;

    public id: number = -1;
    initiated: Date;
    planned: Date;
    begined: Date;
    reviewDone: Date;
    retrospectiveDone: Date;

    constructor(params: any) {
        super(params);
        if (params === null || params === undefined) {
            return;
        }
        this.empty = false;
        this.id = params.id;

        this.initiated = new Date(params.initiated);
        this.planned = new Date(params.planned);
        this.begined = new Date(params.begined);
        this.reviewDone = new Date(params.reviewDone);
        this.retrospectiveDone = new Date(params.retrospectiveDone);
    }

    public renderAsMenu() {
        if (this.empty)
            return  <div id="{this.id}" role="button" data-toggle="dropdown" className="btn btn-default"> No Data </div>
        else
            return <div className="dropdown">
                <div id="{this.id}" role="button" data-toggle="dropdown" className="btn btn-primary" >
                    History <span className="caret"></span>
                </div>
                <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                    <li className="list-group-item"><pre>Initiated:     {this.initiated.toLocaleDateString()}</pre></li>
                    <li className="list-group-item"><pre>Planned:       {this.planned.toLocaleDateString()}</pre></li>
                    <li className="list-group-item"><pre>Beginned:      {this.begined.toLocaleDateString()}</pre></li>
                    <li className="list-group-item"><pre>Review:        {this.reviewDone.toLocaleDateString()}</pre></li>
                    <li className="list-group-item"><pre>Retrospective: {this.retrospectiveDone.toLocaleDateString()}</pre></li>
                </ul>
            </div>
    }
}

class User {

    empty: boolean = true;
    constructor(params: any) {
        if (params === null || params === undefined) {
            return;
        }

        this.activity = params.activity;
        this.login = params.login;
        this.password = params.password;
        this.roleId = params.roleId;
        this.userId = params.userId;
        this.empty = false;
    }

    activity: boolean = false;
    login: string = "";
    password: string = "";
    roleId: number = -1;
    userId: number = -1;

    render() {
        if (this.empty)
            return "NoData";
        return <li className="dropdown-submenu">
            <div > {this.login} </div>
            <ul className="dropdown-menu">
                <li className="dropdown-item"><b><pre>UserID:  {this.userId}</pre></b>  </li>
                <li className="dropdown-item"><b><pre>Login:   {this.login}</pre></b> </li>
                <li className="dropdown-item"><b><pre>Password:{this.password}</pre></b> </li>
                <li className="dropdown-item"><b><pre>Activity:{this.activity ? "true" : "false"}</pre></b> </li>
                <li className="dropdown-item"><b><pre>RoleId:  {this.roleId}</pre></b> </li>
            </ul>
        </li>
    }
}

class Team {

    empty: boolean = true;
    name: string = "";
    id: number = -1;
    members: User[] = [];

    constructor(params: any) {
        if (params === null || params === undefined) {
            return;
        }
        this.name = params.name;
        this.id = params.id;
        this.empty = false;

        //var members = params.members.map( u => new User(u));
        var members = [];
        for (var i = 0; i < params.members.length; i++) {
            members[i] = new User(params.members[i]);

        }

        this.members = members;
    }



    renderAsMenu() {
        if (this.empty)
            return <div id="{this.id}" role="button" data-toggle="dropdown" className="btn btn-default"> No Data </div>
        return <div className="dropdown">
            <div id="{this.id}" role="button" data-toggle="dropdown" className="btn btn-primary" >
                {this.name} <span className="caret"></span>
            </div>
            <ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                {this.members.map(u => u.render())}
            </ul>
        </div>
    }
}

class Sprint extends React.Component{
    id: number;
    stage: string;
    history: SprintHistory
    backlog: string;
    defects: string;
    dailyScrums: string;
    review: string;
    retrospective: string;
    team: Team;
    
    empty: boolean = true;

    public constructor(params: any) {

        super(params);

        if(params === null || params === undefined)
        {
            return;
        }

        this.id = params.id;
        this.stage = params.stage;
        this.history = new SprintHistory(params.history);
        this.backlog = params.backlog;
        this.defects = params.defects;
        this.dailyScrums = params.dailyScrums;
        this.review = params.review;
        this.retrospective = params.retrospective;
        this.team = new Team(params.team);

        this.empty = false;
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

      
    // public SentdItem() {
    //     fetch('api/sprints/post',
    //     {
    //         method:'POST',
    //         body: this
    //     }).then((r) => alert("sended"));
    // }

    public SentdItem() {
        var data = {hello:'test',world:'test'}
        fetch('api/sprints/create',
        {
            method:'POST',
            body: JSON.stringify(this.props) 
         }).then((r) => alert('sended'));
    }  

    // public render()
    // {
    //     return <form><text>Hello</text><button>Submit</button></form>

    // }

    public renderAsTableRow() {
        return <tr key={this.id}>
            <td>{this.id}</td>
            <td>{this.team.renderAsMenu()}</td>
            <td>{this.stage}</td>
            <td>{this.review}</td>
            <td>{this.history.renderAsMenu()}</td>
            <td>{this.retrospective}</td>
            <td><div>
            <div id={this.id.toString()} role="button" data-toggle="dropdown" className="btn btn-default" onClick={this.SentdItem.bind(this)}> 
            Sending test </div>
            </div></td>
        </tr>;
    }

}


interface SprintDataFetchingState {
    sprints: Sprint[];
    loading: boolean;
}

export class SprintsGrid extends React.Component<RouteComponentProps<{}>, SprintDataFetchingState> {
    constructor() {
        super();
        this.state = { sprints: [], loading: true };

        fetch('api/Sprints/Get')
            .then(response => response.json() as Promise<Sprint[]>)
            .then(data => {
                var sprints = data.map(s => new Sprint(s));
                sprints.sort((a, b) => (a.id - b.id));
                this.setState({ sprints: sprints, loading: false });
            });
    } 

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SprintsGrid.renderSprintsTable(this.state.sprints);

        return <div>
            <h1>Sprints</h1>
            <p>Here represented all sprints from the database.</p>
            {contents}
            </div>
    }

    private static renderSprintsTable(sprints: Sprint[]) {
        //var table = "";
        //for (var i = 0; i < sprints.length; i++) {
        //    table += sprints[i].renderAsTableRow()
        //    //table += + "<td>hello</td>";
        //}

        return <table className='table'>
            <thead>
                <tr>
                    <th>Database ID</th>
                    <th>Team</th>
                    <th>Stage</th>
                    <th>Review</th>
                    <th>History</th>
                    <th>Retrospective</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {sprints.map(s => s.renderAsTableRow())}
            </tbody>
        </table>;
    }
}




