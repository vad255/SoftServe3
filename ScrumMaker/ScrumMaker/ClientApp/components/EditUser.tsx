import { Component } from "react";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";

interface FileLoad {
    imagePreviewUrl: './img/face.jpg'
    file: ''
    password: ""
    repeatPassword: ""
}

export class EditUser extends Component<RouteComponentProps<any>, FileLoad> {
    constructor(props: any) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: './img/face.jpg',
            password: "",
            repeatPassword: ""
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(event: any) {
        const formData = new FormData(event.target)
        //formData.append('File', this.state.file, 'some value user types')
        //axios.post('api/User/EditPhoto', formData, ).then(res => {
        //    console.log(res);
        //});
        fetch('api/User/EditPhoto', {
            method: 'POST',
            body: formData,
        })
    }

    _handleImageChange(e: any) {
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

    private handleSave(event: any) {
        const data = new FormData(event.target);
            fetch('api/User/EditPassword', {
                method: 'POST',
                body: data,
        })
    }


    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img width="200px" height="200px" src={imagePreviewUrl} />);
        }

        return (
            <main className="page">
                <div className='myDiv'>{$imagePreview}</div>
                <form onSubmit={this._handleSubmit} asp-controller="UserEdit" asp-action="UploadFile" method="post">
                    <div className="file-upload">
                        <label>
                            <input type="file" className="fileInput" name="file" onChange={this._handleImageChange} />
                            <span>Choose</span>
                        </label>
                    </div>
                    <button type="submit" className="btn save" onClick={this._handleSubmit}>Upload Image</button>
                </form>

                <p>____________________________________________________________________________________________</p>

                <form onSubmit={this.handleSave}>
                    <div className='fildsDiv'>
                        <div className="form-group row" >
                            <input type="hidden" name="employeeId" />
                        </div>
                        <div className="form-group row">
                            <label className="control-label col-md-12" htmlFor="password" >New password</label>
                            <div className="col-md-4">
                                <input className="form-control" type="password" name="password" defaultValue={this.state.password} required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="control-label col-md-12" htmlFor="repeatpassword" >Repeat password</label>
                            <div className="col-md-4">
                                <input className="form-control" type="password" name="repeatpassword" defaultValue={this.state.repeatPassword} required />
                            </div>
                        </div>
                        <button type="submit" className="btn save" onClick={this._handleSubmit}>Change password</button>
                    </div>
                </form>
            </main>
        )
    }
}
   