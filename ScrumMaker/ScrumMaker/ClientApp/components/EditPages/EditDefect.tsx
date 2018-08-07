import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Defect } from "../Models/Defect";
import { DefectStatus } from "../Models/DefectStatus";
import { DefectPriority } from "../Models/DefectPriority";
import { DefectState } from "../Models/DefectState";
import { User } from "../Models/User";
import { Team } from "../Models/Team";


interface IEditPageState {
    defect: Defect;
    id: string;
    nameValue: string;
    statusValue: DefectStatus;    
    priorityValue: DefectPriority;    
    stateValue: DefectState;    
    actualResultValue: string; 
    fixResultValue: string;
    textAreaValue: string;   
}

export class EditDefect extends React.Component<RouteComponentProps<any>, IEditPageState> {
    constructor(props: any) {
        super(props);
        this.state = (({
            id: this.props.location.pathname.substring((this.props.location.pathname.lastIndexOf('/') + 1)),
            defect: Defect,
            statusValue: "",
            nameValue: "",
            textAreaValue: "",
            priorityValue: "",
            stateValue: "",
            actualResultValue: "",
            fixResultValue:  ""    
        }) as any);

        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.handleStatusSelect = this.handleStatusSelect.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
        this.handlePrioritySelect = this.handlePrioritySelect.bind(this);
        this.handleStateSelect = this.handleStateSelect.bind(this);
        this.handleChangeInputActualResult = this.handleChangeInputActualResult.bind(this);
        this.handleChangeInputFixResult = this.handleChangeInputFixResult.bind(this);
        this.handleOK = this.handleOK.bind(this);
         
        fetch("odata/Defects?expand=()&$filter=DefectId eq " + this.state.id)
            .then(response => response.json() as Promise<any>)
            .then(data => {
                let defect1 = new Defect(data["value"][0]);
               
                this.setState({
                    defect: defect1,
                    statusValue: defect1.status,
                    nameValue: defect1.name,
                    textAreaValue: defect1.description,
                    priorityValue: defect1.priority,
                    stateValue: defect1.state,
                    actualResultValue: defect1.actualResults,
                    fixResultValue: defect1.fixResults
                   
                }); 
            })
       
    }
      
    handleSaveButtonClick() {
        console.log(this.state.stateValue)
        fetch('odata/Defects(' + this.state.id + ')',
            {
                method: 'PATCH',
                headers: {
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;odata.metadata=minimal',
                },
                body: JSON.stringify({

                    '@odata.type': 'DAL.Models.Defect',
                    'DefectName': this.state.nameValue,
                    'Description': this.state.textAreaValue,
                    'Priority': this.state.priorityValue,
                    'State': this.state.stateValue,
                    'Status': this.state.statusValue,
                    'ActualResults': this.state.actualResultValue,
                    'FixResults': this.state.fixResultValue                  
                })
            });
    }

    private GetDeleteConfirmModal() {
        return <div id="confirmDeleteModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header  text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                        <h4 className="modal-title">The defect "{this.state.defect.name}" was updated.</h4>
                    </div>
                    <div className="modal-body text-center">
                        <button className="btn btn-default" type="button" onClick={this.handleOK} data-dismiss="modal">
                            Ok</button>
                    </div>
                </div>
            </div>
        </div>;
    }
    handleOK(event: any) {
        this.props.history.push('/defects');
    }
   
    handleStatusSelect(event: any) {
        this.setState({ statusValue: event.target.value });
    }
    handlePrioritySelect(event: any) {
        this.setState({ priorityValue: event.target.value });
    }
    handleStateSelect(event: any) {
        this.setState({ stateValue: event.target.value });
      //  console.log(event.target.value);
    }
    handleChangeInputActualResult(event: any) {
        this.setState({ actualResultValue: event.target.value });
    }
    handleChangeInputFixResult(event: any) {
        this.setState({ fixResultValue: event.target.value });
    }
    handleChangeInput(event: any) {
        this.setState({ nameValue: event.target.value });
    }

    handleChangeTextArea(event: any) {
        this.setState({ textAreaValue: event.target.value });
    }

    public render() {
        return <div className="text-left">
            <div className="text-center">
                <h2 style={{ margin: "10px", padding: "5px" }}>Editing defect by Id = {this.state.id}</h2>
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Defect name:</h3>
                <input className="input-lg" style={{ width: "35%" }}  onChange={this.handleChangeInput} type="text" value={this.state.nameValue} />
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Description:</h3>
                <textarea style={{ width: "35%", height: "300px", fontSize: 25, padding: "7px" }} className="fa-text-height" onChange={this.handleChangeTextArea} value={this.state.textAreaValue} />
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Status:</h3>
                <select className="form-control-static" style={{ width: "35%"}} value={this.state.statusValue} onChange={this.handleStatusSelect} >
                    <option value="Open">Open</option>
                    <option value="Close">Close</option>                   
                </select>
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>State:</h3>
                {this.renderStates()}
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>Priority:</h3>
                {this.renderPriority()}
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>ActualResult:</h3>
                <input className="input-lg" style={{ width: "35%" }} onChange={this.handleChangeInputActualResult} type="text" value={this.state.actualResultValue} />
            </div>
            <div>
                <h3 style={{ margin: "10px", padding: "5px", color: "green" }}>FixResult:</h3>
                <input className="input-lg" style={{ width: "35%" }}  onChange={this.handleChangeInputFixResult} type="text" value={this.state.fixResultValue} />
            </div>
           

            <div className="text-center">               

                <div role='button'
                    className='btn btn-primary'                    
                    data-toggle="modal"
                    data-target="#confirmDeleteModal"
                    onClick={this.handleSaveButtonClick}>
                    Update
                </div>
            </div>

           

            {this.GetDeleteConfirmModal()}
        </div>;
    }
    private renderStates() {
        let names: string[] = [];
        for (let iterator in DefectState) {
            if (!parseInt(iterator))
                names.push(iterator.toString());
        }

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++) {
            items.push(<option key={i} value={names[i]}>{names[i]}</option>);
        }

        return <select
            value={this.state.stateValue}
            className="form-control-static"
            name="State"
            style={{ width: "35%" }} 
            onChange={this.handleStateSelect}>
            {items}
        </select>
    }
    private renderPriority() {
        let names: string[] = [];
        for (let iterator in DefectPriority) {
            if (!parseInt(iterator))
                names.push(iterator.toString());
        }

        let items: JSX.Element[] = [];
        for (var i = 0; i < names.length; i++) {
            items.push(<option key={i } value={names[i]}>{names[i]}</option>);
        }

        return <select
            value={this.state.priorityValue}
            className="form-control-static"
            style={{ width: "35%" }} 
            name="Priority"
            onChange={this.handlePrioritySelect}>
            {items}
        </select>
    }
       
}