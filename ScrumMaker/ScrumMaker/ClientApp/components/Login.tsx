import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

interface LoginViewModel {
    login: string;
    password: string;
    grant_type: string;
}

export class Login extends React.Component<RouteComponentProps<any>, LoginViewModel> {
    constructor(props: any) {
        super(props);

        this.state = { login: "", password: "", grant_type: "password" };
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.login
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>Login Page</h1>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('/token', {
            method: 'POST',
            body: data
           
        }).then(res => res.json())
            .then(data => document.cookie = `Authorization=${data.access_token};expires=` + new Date(Date.now() + data.expires))
            .then(err => this.props.history.push('/'));
    }

    // This will handle Cancel button click event.
    private handleCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/");
    }

    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
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
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Login</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }

}