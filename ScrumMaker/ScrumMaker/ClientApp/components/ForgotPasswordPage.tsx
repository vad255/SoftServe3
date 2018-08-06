import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import * as Modal from 'react-modal';
import { ConfirmMadal } from "./ConfirmModal";

interface LoginViewModel {
    Login: string;
    ConfirmModal: boolean;
    id: string;
    title: string;
}

export class ForgotPasswordPage extends React.Component<RouteComponentProps<any>, LoginViewModel> {
    constructor(props: any) {
        super(props);

        this.state = { Login: "", ConfirmModal: false, id: "", title: "" };
        this.handleSave = this.handleSave.bind(this);
        this.RedirectToLoginPage = this.RedirectToLoginPage.bind(this);
    }

    public render() {
        let contents = this.state.Login
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>{contents}</div>;
    }

    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('/ResetUserPassword', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    this.setState({ title: "The password was sent to your email" });
                    this.openCloseModel();
                } else {
                    this.setState({ title: "You have enetered incorrect email" });
                    this.openCloseModel();
                }
            }).catch(e => this.props.history.push('/Error'));
    }

    openCloseModel = () => {
        this.setState({
            ConfirmModal: !this.state.ConfirmModal
        });
    }

    private RedirectToLoginPage() {
        if (this.state.title === "The password was sent to your email")
            this.props.history.push('/Login');
        this.openCloseModel();
    }

    private renderCreateForm() {
        return (
            <div onSubmit={this.handleSave}>
                <Modal isOpen={this.state.ConfirmModal}
                    onRequestClose={this.openCloseModel}
                    className="ChangeModal">
                    <h3>{this.state.title}</h3>
                    <button className="modalBtn" onClick={this.RedirectToLoginPage}>Ok</button>
                </Modal>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div className="login100-form-title">
                                <span className="login100-form-title-1">Enter your email, please!</span>
                            </div>
                            <form className="login100-form validate-form" >
                                <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                    <span className="label-input100">Your Email</span>
                                    <input className="input100" type="text" name="login" placeholder="Enter user Email" />
                                    <span className="focus-input100" />
                                </div>
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn" data-target={this.state.id} data-toggle="modal">Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}