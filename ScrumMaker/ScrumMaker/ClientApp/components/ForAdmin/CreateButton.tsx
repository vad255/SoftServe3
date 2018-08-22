import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface ICreateBtnPros {
    URL: string;
}

export class CreateBtn extends React.Component<ICreateBtnPros, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return <NavLink to={this.props.URL}
            activeClassName='active'>
            <button className="btn-dark scrum-btn" type="button">
                Create</button>
        </NavLink>;
    }
}
