import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';



export interface IModalState {
    title: string;
    id: string;
    onConfirmed: Function;
    onCanceled: Function;
}

export abstract class ConfirmMadal extends React.Component<IModalState, IModalState> {
    constructor(params: IModalState) {
        super();
        this.state = params;
    }

    public render() {
        return (
            <div id={this.state.id} className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center" ><button className="close" type="button" data-dismiss="modal">×</button>
                            <h4 className="modal-title">{this.state.title}</h4>
                        </div>
                        <div className="modal-body text-center">
                            <button className="btn-dark scrum-btn"
                                type="button" data-dismiss="modal"
                                onClick={(() => this.state.onConfirmed()).bind(this)}>
                                Yes</button>
                            <button className="btn-dark scrum-btn"
                                type="button" data-dismiss="modal"
                                onClick={(() => this.state.onCanceled()).bind(this)}>
                                No</button>
                        </div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        );
    }
}
