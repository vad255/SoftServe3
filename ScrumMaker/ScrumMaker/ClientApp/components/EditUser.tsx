import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

interface AddUserDataState {
    id: number;
    login: string;
    password: string;
    roleList: Array<any>;
}

export class EditUser extends React.Component<RouteComponentProps<any>, AddUserDataState> {
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
            <h1>Edit User</h1>
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
            <main className="page">
                <h2>Upload ,Crop and save.</h2>
                <div className="box">
                    <input type="file" id="file-input" />
                </div>
                <div className="box-2">
                    <div className="result"></div>
                </div>
                <div className="box-2 img-result hide">
                    <img className="cropped" src="" alt="" />
                </div>
                <div className="box">
                    <button className="btn save hide">Save</button>
                </div>
            </main>
        )
    }

}
    