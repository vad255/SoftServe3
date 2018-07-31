import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Sprint } from "../../Models/Sprint";
import { RetrospectiveMeeting } from '../RetrospectiveMeeting';

interface ISelectSprintState {
    sprints: Sprint[];
    sprintId: number;
}

export class SelectSprintPage extends React.Component<RouteComponentProps<any>, ISelectSprintState> {
    constructor(props: any) {
        super(props);
        this.state = { sprints: [], sprintId: -1 };
        fetch('odata/sprints', { credentials: 'include' }).then(response => response.json() as Promise<any>)
            .then(data => {
                var sprintsData = [] as Sprint[];
                console.log(data);
                for (var i = 0; i < data["value"].length; i++) {
                    sprintsData[i] = new Sprint(data["value"][i]);
                }
                this.setState({ sprints: sprintsData, sprintId: sprintsData[0].id });
            }).catch(e => console.log(e));

        this.handleButtinClick = this.handleButtinClick.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleButtinClick() {
        this.props.history.push({
            pathname: '/RetrospectiveMeeting',
            state: { sprintId: this.state.sprintId }
        });
    }

    handleSelectChange(event: any) {
        let id = event.target.value as number;
        this.setState({ sprintId: id });
    }

    public render() {
        return <div style={{ marginTop: "10px" }} className="text-center">
            <h1 style={{ marginTop: "10px" }}>Select sprint to make a retrospective</h1>
            <select style={{ marginTop: "10px" }} className="form-control inline-block" onChange={this.handleSelectChange}>
                {this.state.sprints.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <div>
                <button style={{ marginTop: "10px" }}
                    onClick={this.handleButtinClick}
                    className="btn">Go to meeting</button>
            </div>
        </div>;
    }
}