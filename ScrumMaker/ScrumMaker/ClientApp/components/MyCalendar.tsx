import * as React from 'react';
import * as Modal from 'react-modal';
import Calendar, { YearView } from 'react-calendar/dist/entry.nostyle';
import { render } from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { Button } from 'react-bootstrap/lib/InputGroup';
import { Form, Label } from 'react-bootstrap';
import { ConfirmMadal, IModalState } from "./ConfirmModal";

interface Meetings {
    meetingId: number,
    meetingName: '',
    description: ''
}

interface DataCalendar {
    meetingId: number,
    calendarId: number,
    date: Date,
    hours: number, 
}

interface CalendarDataExampleState {
    calendar: DataCalendar[],
    meetings: Meetings[],
    curentDate: Date,
    displayLeft: boolean,
    displayRigth: boolean,
    confirmModal: boolean,
}

export class MyCalendar extends React.Component<RouteComponentProps<IModalState>, CalendarDataExampleState> {
    constructor(props: any) {
        super(props)
        this.state = { calendar: [], meetings: [], curentDate: new Date(), displayLeft: false, displayRigth: false, confirmModal: false };
        this.onChange = this.onChange.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
        this.handleSave = this.handleSave.bind(this);

        fetch('api/Calendar/GetMeetings')
            .then(response => response.json() as Promise<Meetings[]>)
            .then(data => {
                this.setState({ meetings: data, displayLeft: false, displayRigth: false });
            });
    }

    protected onActiveDataChange(e: any) {
        alert("Hello");
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
                        this.setState({ calendar: data, displayLeft: true, displayRigth: true, curentDate: date });
                        this.forceUpdate();
                    }
                    else {
                        this.setState({ displayLeft: false, displayRigth: true, curentDate: date });
                    }
                });
        }
    }

    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        data.append("date", this.state.curentDate.toLocaleDateString());

        fetch('api/Calendar/CreateNewEvent', {
            credentials: 'include',
            method: 'POST',
            body: data,

        })
            .then(response => response.json() as Promise<DataCalendar[]>)
            .then(data => {
                if (data.length != 0)
                    this.setState({ calendar: data, displayLeft: true, displayRigth: true, curentDate: this.state.curentDate });
                else
                    this.setState({ confirmModal: true });
            });
    }

    //private GetConfirmModal() {
    //    let title = "This tims is booked";

    //    return <ConfirmMadal
    //        onCanceled={this.onChange}
    //        onConfirmed={this.onChange}
    //        title={title}
    //        id={"ConfirmDeleteDialog"} />
    //}

    componentWillMount() {
        Modal.setAppElement('body');
    }

    openCloseModel = () => {
        this.setState({
            confirmModal: !this.state.confirmModal
        })
    }

    render() {
        return (
            <div>
                <div width="500px;" height="200px;">

                    <Modal isOpen={this.state.confirmModal}
                        onRequestClose={this.openCloseModel}
                        className="Modal">
                        This tims is booked
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
                <div className={this.state.displayLeft ? 'left-text-calendar-box' : "nodisplay"}>
                    <table className="text-calendar-box-color">
                        <thead>
                            <td>ID</td>
                            <td>Date</td>
                            <td>Meeting</td>
                            <td>Strat In</td>
                        </thead>
                        {this.state.calendar.map(c =>
                            <tbody>
                                <td>{c.calendarId}</td>
                                <td>{c.date}</td>
                                <td>{this.state.meetings.map(m => m.meetingId == c.meetingId ? m.meetingName : null)}</td>
                                <td>{c.hours}:00</td>
                            </tbody>
                        )}
                    </table>
                </div>
                <div className={this.state.displayRigth ? 'rigth-text-calendar-box' : "nodisplay"}>
                    <form onSubmit={this.handleSave} method="post">
                        <label className="selectLabel">Select hours</label>
                        <select htmlFor="hours" name="hours" id="hours" className="form-control selectEvent">
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
                        <select htmlFor="meeting" name="meeting" id="meeting" className="form-control selectEvent">
                            {this.state.meetings.map(m =>
                                <option value={m.meetingId}>{m.meetingName}</option>
                            )}
                        </select>
                        <button type="submit" className="btn save siteColor selectEventButton">
                            Add Event
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
