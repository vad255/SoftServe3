import * as React from 'react';
import * as Modal from 'react-modal';
import Calendar, { YearView } from 'react-calendar/dist/entry.nostyle';
import { render } from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { Button } from 'react-bootstrap/lib/InputGroup';
import { User } from './Models/User';
import { Role } from './Models/Role';

interface Meetings {
    MeetingId: number,
    MeetingName: '',
    Description: ''
}

interface DataCalendar {
    MeetingId: number,
    CalendarId: number,
    Date: Date,
    Hours: number,
}

interface CalendarDataExampleState {
    ForAllTeam: boolean
    Role: string
    Calendar: DataCalendar[],
    Meetings: Meetings[],
    CurentDate: Date,
    DisplayLeft: boolean,
    DisplayRigth: boolean,
    ConfirmModal: boolean,
}

export class MyCalendar extends React.Component<RouteComponentProps<any>, CalendarDataExampleState> {
    constructor(props: any) {
        super(props)
        this.state = { ForAllTeam: false, Role: '', Calendar: [], Meetings: [], CurentDate: new Date(), DisplayLeft: false, DisplayRigth: false, ConfirmModal: false };
        this.onChange = this.onChange.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
        this.handleSave = this.handleSave.bind(this);


        fetch('api/Calendar/GetMeetings', { credentials: 'include' })
            .then(response => response.json() as Promise<Meetings[]>)
            .then(data => {
                this.setState({ Meetings: data, DisplayLeft: false, DisplayRigth: false });
            });

        fetch('/getrole', { credentials: 'include' })
            .then(responce => responce.text() as Promise<any>)
            .then(data => {
                let temp = data;
                this.setState({ Role: temp });
            })
    }

    protected onChange(date: any) {
        {
            const formData = new FormData();
            formData.append("date", date.toLocaleDateString());
            fetch('api/Calendar/GetThisCalendar', {
                credentials: 'include',
                method: 'POST',
                body: formData,
            })
                .then(response => response.json() as Promise<DataCalendar[]>)
                .then(data => {
                    if (data.length != 0) {
                        this.setState({ Calendar: data, DisplayLeft: true, DisplayRigth: true, CurentDate: date });
                        this.forceUpdate();
                    }
                    else {
                        this.setState({ DisplayLeft: false, DisplayRigth: true, CurentDate: date });
                    }
                });
        }
    }

    private handleSave(event: any) {
        if (this.state.ForAllTeam == false) {
            event.preventDefault();
            const data = new FormData(event.target);
            data.append("date", this.state.CurentDate.toLocaleDateString());

            fetch('api/Calendar/CreateNewEvent', {
                credentials: 'include',
                method: 'POST',
                body: data,

            })
                .then(response => response.json() as Promise<DataCalendar[]>)
                .then(data => {
                    if (data.length != 0)
                        this.setState({ Calendar: data, DisplayLeft: true, DisplayRigth: true, CurentDate: this.state.CurentDate });
                    else
                        this.setState({ ConfirmModal: true });
                });
        }
        else {
            event.preventDefault();
            const data = new FormData(event.target);
            data.append("date", this.state.CurentDate.toLocaleDateString());

            fetch('api/Calendar/CreateNewEventFotAllTeam', {
                credentials: 'include',
                method: 'POST',
                body: data,

            })
                .then(response => response.json() as Promise<DataCalendar[]>)
                .then(data => {
                    if (data.length != 0)
                        this.setState({ Calendar: data, DisplayLeft: true, DisplayRigth: true, CurentDate: this.state.CurentDate });
                });
        }
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    openCloseModel = () => {
        this.setState({
            ConfirmModal: !this.state.ConfirmModal
        })
    }

    render() {

        var buttonForScrumMaster;
        if (this.state.Role === "\"ScrumMaster\"") {
            buttonForScrumMaster = <button type="submit" onClick={() => this.setState({ ForAllTeam: true })}
                className="btn-primary selectEvent selectEventButton">Add event for all team</button>;
        }

        return (
            <div>
                <div width="500px;" height="200px;">

                    <Modal isOpen={this.state.ConfirmModal}
                        onRequestClose={this.openCloseModel}
                        className="Modal">
                        <h3>This time is booked</h3>
                        <button className="modalBtn" onClick={this.openCloseModel}>Ok</button>
                    </Modal>

                </div>
                <Calendar
                    minDate={new Date(2010, 0, 1)}
                    minDetail={"year"}
                    maxDetail={"month"}
                    maxDate={new Date(2030, 0, 1)}
                    calendarType={"ISO 8601"}
                    onChange={this.onChange}
                />
                <div className={this.state.DisplayLeft ? 'left-text-calendar-box' : "nodisplay"}>
                    <table className="text-calendar-box-color">
                        <thead>
                            <td>ID</td>
                            <td>Date</td>
                            <td>Meeting</td>
                            <td>Strat In</td>
                        </thead>
                        {this.state.Calendar.map(c =>
                            <tbody>
                                <td>{c.CalendarId}</td>
                                <td>{c.Date.toString().substr(0, 10)}</td>
                                <td>{this.state.Meetings.map(m => m.MeetingId == c.MeetingId ? m.MeetingName : null)}</td>
                                <td>{c.Hours}:00</td>
                            </tbody>
                        )}
                    </table>
                </div>
                <div className={this.state.DisplayRigth ? 'rigth-text-calendar-box' : "nodisplay"}>
                    <form onSubmit={this.handleSave} method="post">
                        <div>
                            <label className="selectLabel">Select hours</label>
                            <select htmlFor="hours" name="hours" id="hours" className="form-control selectEvent" style={{width: "200px"}}>
                                <option value={10}>10:00</option>
                                <option value={11}>11:00</option>
                                <option value={12}>12:00</option>
                                <option value={13}>13:00</option>
                                <option value={14}>14:00</option>
                                <option value={15}>15:00</option>
                                <option value={16}>16:00</option>
                                <option value={17}>17:00</option>
                                <option value={18}>18:00</option>
                                <option value={19}>19:00</option>
                            </select>
                            <label className="selectLabel">Select meetings</label>
                            <select htmlFor="meeting" name="meeting" id="meeting" className="form-control selectEvent" style={{width: "200px"}}>
                                {this.state.Meetings.map(m =>
                                    <option value={m.MeetingId}>{m.MeetingName}</option>
                                )}
                            </select>
                            <button type="submit" id="addEventButton" className="btn-primary selectEvent selectEventButton" >
                                Add Event
                        </button>
                            {buttonForScrumMaster}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
