import { Component } from "react";
import * as React from "react";
import { RouteComponentProps } from "react-router";

interface FileLoad {
    imagePreviewUrl: 'api/User/ShowPhoto'
    //imagePreviewUrl: ''
    file: ''
    password: ""
    repeatPassword: ""
}

export class EditUser extends Component<RouteComponentProps<any>, FileLoad> {
    constructor(props: any) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: 'api/User/ShowPhoto',
            //imagePreviewUrl: '',
            password: "",
            repeatPassword: ""
        };

        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
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
        var size = 5000000; // bytes
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
            alert('Incorect Size or Type');
            return false;
        }
    }

    private handleSave(event: any) {
        const data = new FormData(event.target);
        var password = (document.getElementById('password') as any).value;
        var newpassword = (document.getElementById('repeatpassword') as any).value;
        if (password === newpassword) {
            fetch('api/User/EditPassword', {
                credentials: 'include',
                method: 'POST',
                body: data,
            })
            event.PreventDefault();
        }
        else {
            alert("Password not same");
            event.PreventDefault();
        }
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
                    <div className="file-upload siteColor">
                        <label className="chooseLabel">
                            <input type="file" className="fileInput" name="file" multiple accept="image/*" onChange={this._handleImageChange} />
                            <span>Choose</span>
                        </label>
                    </div>
                    <button type="submit" className="btn save siteColor" onClick={this._handleSubmit}>Upload Image</button>
                </form>

                <p>____________________________________________________________________________________________</p>

                <form onSubmit={this.handleSave} method="post">
                    <div className='fildsDiv'>
                        <div className="form-group row" >
                            <input type="hidden" name="employeeId" />
                        </div>
                        <div className="form-group row">
                            <label className="control-label col-md-12" htmlFor="password" >New password</label>
                            <div className="col-md-4">
                                <input className="form-control" type="password" name="password" id="password" defaultValue={this.state.password} required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="control-label col-md-12" htmlFor="repeatpassword" >Repeat password</label>
                            <div className="col-md-4">
                                <input className="form-control" type="password" name="repeatpassword" id="repeatpassword" defaultValue={this.state.repeatPassword} required />
                            </div>
                        </div>
                        <button type="submit" className="btn save siteColor">Change password</button>
                    </div>
                </form>
            </main>
        )
    }
}
   