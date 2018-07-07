import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Story } from "../Models/Story";
import { StoryStatus } from "../Models/Story";

interface IEditPageState {
    story: Story;
    id: string;
    statusValue: string;
    inputValue: string;
    textAreaValue: string;
}

export class EditStory extends React.Component<RouteComponentProps<any>, IEditPageState> {
    constructor(props: any) {
        super(props);
        this.state = (({ id: this.props.location.pathname.substring((this.props.location.pathname.indexOf('/') + 11)), story: Story, statusValue: "", inputValue: "", textAreaValue: "" }) as any);

        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.handleStatusSelect = this.handleStatusSelect.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);

        fetch("odata/Stories?$filter=Id eq " + this.state.id)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let story1 = new Story(data["value"][0]);
                this.setState({ story: story1, statusValue: story1.status.toString(), inputValue: story1.name, textAreaValue: story1.description });
            });
    }

    handleSaveButtonClick() {
        fetch('odata/Stories(' + this.state.id + ')',
            {
                method: 'PATCH',
                headers: {
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;odata.metadata=minimal',
                },
                body: JSON.stringify({

                    '@odata.type': 'DAL.Models.Story',
                    'Name': this.state.inputValue,
                    'Description': this.state.textAreaValue,
                    'Status': this.state.statusValue,
                })
            });

        alert("Data was updated!");
    }

    handleStatusSelect(event: any) {
        this.setState({ statusValue: event.target.value });
    }

    handleChangeInput(event: any) {
        this.setState({ inputValue: event.target.value });
    }

    handleChangeTextArea(event: any) {
        this.setState({ textAreaValue: event.target.value });
    }

    public render() {
        return <div className="text-left">
            <div className="text-center">
                <h2 style={{ margin: "10px", padding: "5px" }}>Editing story by Id = {this.state.id}</h2>
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green"}}>Name:</h3>
                <input className="input-lg" onChange={this.handleChangeInput} type="text" value={this.state.inputValue} />
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Description:</h3>
                <textarea style={{ width: "400px", height: "300px", fontSize: 25, padding: "7px"}} className="fa-text-height" onChange={this.handleChangeTextArea} value={this.state.textAreaValue} />
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green"}}>Status:</h3>
                <select className="form-control-static" onChange={this.handleStatusSelect} >
                    <option value="0">Pending approval</option>
                    <option value="1">Ready to start</option>
                    <option value="2">In progress</option>
                    <option value="3">Developing сomplete</option>
                    <option value="4">Test сomplete</option>
                    <option value="5">Accepted</option>
                </select>
            </div>
            <div className="text-center">
                <button style={{ margin: "10px"}} className="btn-success" onClick={this.handleSaveButtonClick}>Update</button>
            </div>

        </div>;
    }
}