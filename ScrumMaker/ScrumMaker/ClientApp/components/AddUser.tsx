import * as React from 'react';
import * as Modal from 'react-modal';
import { RouteComponentProps } from 'react-router';
import { Link, Redirect } from 'react-router-dom';

interface AddUserDataState {
    id: number;
    login: string;
    email: string;
    password: string;
    roles: Role[];
    ConfirmModal: boolean;
    modalMessage: string;
}
interface Role {
    RoleId: number;
    Name: string;
}

export class AddUser extends React.Component<RouteComponentProps<any>, AddUserDataState> {
    constructor(props: any) {
        super(props);
        this.state = { id: 0, login: "", email: "", password: "", roles: [], ConfirmModal: false, modalMessage: "" };
        fetch('odata/roles')
            .then(response => response.json() as any)
            .then(data => {
                this.setState({ roles: data['value'] });
            });
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public SendItem() {
        fetch('api/sprints/create',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify(this.props)
            });
    }

    public render() {
        let contents = this.state.login
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.roles);

        return <div>
            {contents}
        </div>;
    }

    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('api/User/Create', {
            method: 'POST',
            body: data,

        }).then(response => response.json() as Promise<boolean>)
            .then(data => {
                data != false ? this.setState({ modalMessage: "User successfully created", ConfirmModal: true }) : this.setState({ modalMessage: "The current user's login already exists", ConfirmModal: true });
            });
    }

    // This will handle Cancel button click event.
    private handleCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/");
    }

    openCloseModel = () => {
        this.setState({
            ConfirmModal: !this.state.ConfirmModal
        })
    }

    private renderCreateForm(cityList: Array<any>) {
        return (
            <div>
                <Modal isOpen={this.state.ConfirmModal}
                    onRequestClose={this.openCloseModel}
                    className="Modal">
                    <h3>{this.state.modalMessage}</h3>
                    <button className="modalBtn" onClick={this.openCloseModel}>Ok</button>
                </Modal>

                <form className="container" onSubmit={this.handleSave} method="post">
                    <div className="form-group row" >

                        <input type="hidden" name="employeeId" value={this.state.id} />
                    </div>
                    <header className="heading"> Registration</header><hr></hr>
                    <div className="row ">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-xs-4">
                                    <label className="login" htmlFor="Login">Login<span style={{ color: "red" }}>*</span></label></div>
                                <div className="col-xs-8">
                                    <input className="form-control" type="login" name="login" id="login" defaultValue={this.state.login} required maxLength={50} />
                                </div>
                            </div >
                        </div >
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-xs-4">
                                    <label className="mail" htmlFor="Email">Email<span style={{ color: "red" }}>*</span></label></div>
                                <div className="col-xs-8">
                                    <input className="form-control" type="email" name="email" id="email" defaultValue={this.state.email} required maxLength={100} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-xs-4">
                                    <label className="pass" htmlFor="password" >Password<span style={{ color: "red" }}>*</span></label></div>
                                <div className="col-xs-8">
                                    <input className="form-control" type="password" name="password" id="password" defaultValue={this.state.password} required maxLength={100} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-xs-4">
                                    <label className="role" htmlFor="roleid">Role</label></div>
                                <div className="col-xs-8">
                                    <select className="form-control" data-val="true" id="role" name="roleid" required>
                                        <option value="">-- Select Role --</option>
                                        {this.state.roles.map(x => <option value={x.RoleId}>{x.Name}</option>)}
                                    </select>
                                </div>
                            </div >
                        </div>
                        <div className="col-sm-12">
                            <button type="submit" className="userbtnreg">Register</button>
                            <button className="userbtnreg" onClick={this.handleCancel}>Cancel</button>
                        </div >
                    </div>
                </form>
            </div>
        )
    }
}