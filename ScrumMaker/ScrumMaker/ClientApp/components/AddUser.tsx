﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

interface AddUserDataState {
    id: number;
    login: string;
    password: string;
    roleList: Array<any>;
}

export class AddUser extends React.Component<RouteComponentProps<any>, AddUserDataState> {
    constructor(props: any) {
        super(props);

        this.state = { id: 0, login: "", password: "", roleList: [] };

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.login
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.roleList);

        return <div>
            <h1>Registration</h1>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('api/User/Create', {
            method: 'POST',
            body: data,

        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.history.push("/");
            })
    }

    // This will handle Cancel button click event.
    private handleCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/");
    }

    private renderCreateForm(cityList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" value={this.state.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Login">Login</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="login" defaultValue={this.state.login} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="password" >Password</label>
                    <div className="col-md-4">
                        <input className="form-control" type="password" name="password" defaultValue={this.state.password} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="roleid">Role</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="roleid" defaultValue={this.state.roleList} required>
                            <option value="">-- Select Role --</option>
                            <option value="1">Admin</option>
                            <option value="0">User</option>
                        </select>
                    </div>
                </div >

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Register</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }

}