import { Component } from "react";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import * as Modal from 'react-modal';
import { Brand } from "react-bootstrap/lib/Navbar";

interface FileLoad {
    imagePreviewUrl: 'api/User/ShowPhoto'
    file: ''
    password: ""
    repeatPassword: ""
    ConfirmModalPhoto: boolean,
    ConfirmModalPassword: boolean,
    PasswordUserMessage: string
}

export class EditUser extends Component<RouteComponentProps<any>, FileLoad> {
    constructor(props: any) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: 'api/User/ShowPhoto',
            password: "",
            repeatPassword: "",
            ConfirmModalPhoto: false,
            ConfirmModalPassword: false,
            PasswordUserMessage: ""
        };

        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    openCloseModelPhoto = () => {
        this.setState({
            ConfirmModalPhoto: !this.state.ConfirmModalPhoto
        })
    }

    openCloseModelPassword = () => {
        this.setState({
            ConfirmModalPassword: !this.state.ConfirmModalPassword
        })
    }

    _handleSubmit(event: any) {
        const formData = new FormData(event.target)
        fetch('api/User/EditPhoto', {
            credentials: 'include',
            method: 'POST',
            body: formData,
        })

    }

    _handleImageChange(e: any) {
        var type = ['image/bmp', 'image/gif', 'image/jpg', 'image/jpeg', 'image/png'];
        var width = 1024;
        var height = 768;
        var size = 500000;
        var file = e.target.files[0];
        if (file.size < size) {

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }
            reader.readAsDataURL(file)
        }
        if (file.size > size || type.indexOf(file.type) == -1) {
            this.openCloseModelPhoto();
            return false;
        }
    }

    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('api/User/EditPassword', {
            credentials: 'include',
            method: 'POST',
            body: data,
        }).then(response => response.json() as Promise<boolean>)
            .then(data => {
                data != false ? this.setState({ ConfirmModalPassword: true, PasswordUserMessage: "Password successfully changed" }) : this.setState({ ConfirmModalPassword: true, PasswordUserMessage: "Password not same" });;
            });
    }


    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img width="200px" height="200px" src={imagePreviewUrl} />);
        }

        return (
            <main className="page">

                <Modal isOpen={this.state.ConfirmModalPhoto}
                    onRequestClose={this.openCloseModelPhoto}
                    className="Modal">
                    <h3>Incorrect size or type</h3>
                    <button className="btn-primary scrum-btn" onClick={this.openCloseModelPhoto}>Ok</button>
                </Modal>

                <Modal isOpen={this.state.ConfirmModalPassword}
                    onRequestClose={this.openCloseModelPassword}
                    className="Modal">
                    <h3>{this.state.PasswordUserMessage}</h3>
                    <button className="scrum-btn btn-dark" onClick={this.openCloseModelPassword}>Ok</button>
                </Modal>

                <div className='myDiv'>{$imagePreview}</div>
                <form onSubmit={this._handleSubmit} asp-controller="UserEdit" asp-action="UploadFile" method="post">
                    <div className="file-upload siteColor">
                        <label className="chooseLabel">
                            <input type="file" className="fileInput" style={{ width: "35%" }} name="file" multiple accept="image/*" onChange={this._handleImageChange} />
                            <span>Choose</span>
                        </label>
                    </div>
                    <button type="submit" className="scrum-btn btn-dark">Upload Image</button>
                </form>

                <p>____________________________________________________________________________________________</p>

                <form onSubmit={this.handleSave} method="post">
                    <div className='fildsDiv' style={{ width: "35%" }}>
                        <div className="form-group row" >
                            <input type="hidden" name="employeeId" style={{ width: "35%" }} />
                        </div>
                        <div>
                            <label htmlFor="password" >New password</label>
                            <div >
                                <input className="form-control" type="password" name="password" id="password" defaultValue={this.state.password} required />
                            </div>
                        </div>
                        <div >
                            <label htmlFor="repeatpassword" >Repeat password</label>
                            <div>
                                <input className="form-control"  type="password" name="repeatpassword" id="repeatpassword" defaultValue={this.state.repeatPassword} required />
                            </div>
                        </div>
                        <button type="submit" className="scrum-btn btn-dark">Change password</button>
                    </div>
                </form>
            </main>
        )
    }
}
