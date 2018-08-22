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
            <h1>Registration</h1>
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

                <form onSubmit={this.handleSave} method="post">
                    <div className="form-group row" >
                        <input type="hidden" name="employeeId" value={this.state.id} />
                    </div>
                    <div className="form-group row" >
                        <label className=" control-label col-md-12" htmlFor="Login">Login</label>
                        <div className="col-md-4">
                            <input className="form-control" type="login" name="login" defaultValue={this.state.login} required />
                        </div>
                    </div >
                    <div className="form-group row" >
                        <label className=" control-label col-md-12" htmlFor="Email">Email</label>
                        <div className="col-md-4">
                            <input className="form-control" type="email" name="email" defaultValue={this.state.email} required />
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
                            <select className="form-control" data-val="true" name="roleid" required>
                                <option value="">-- Select Role --</option>
                                {this.state.roles.map(x => <option value={x.RoleId}>{x.Name}</option>)}
                            </select>
                        </div>
                    </div >

                    <div className="form-group">
                        <button type="submit" className="btn">Register</button>
                        <button className="btn" onClick={this.handleCancel}>Cancel</button>
                    </div >
                </form >
            </div>
        )
    }
}