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

        return <div>{contents}</div>;
    }

    // This will handle the submit form event.
    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('/token', {
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then(data => {
                document.cookie = `Authorization=${data.access_token};max-age=` + data.expires + ';'
            }
            )
            .then(err => this.props.history.push('/'));
    }

    // This will handle Cancel button click event.
    private handleCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/");
    }

    private renderCreateForm() {
        return (
            <div onSubmit={this.handleSave}>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">

                            <div className="login100-form-title">
                                <span className="login100-form-title-1">Login Page</span>
                            </div>
                            <form className="login100-form validate-form">
                                <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                    <span className="label-input100">Username</span>
                                    <input className="input100" type="text" name="login" placeholder="Enter username" defaultValue={this.state.login} required />
                                    <span className="focus-input100" />
                                </div>
                                <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                                    <span className="label-input100">Password</span>
                                    <input className="input100" type="password" name="password" placeholder="Enter password" defaultValue={this.state.password} required />
                                    <span className="focus-input100" />
                                </div>
                                <div className="flex-sb-m w-full p-b-30">
                                    <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                        <label className="label-checkbox100" htmlFor="ckb1">Remember me</label>
                                    </div>
                                    <div>
                                        <a href="#" className="txt1">Forgot Password?</a>
                                    </div>
                                </div>
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}