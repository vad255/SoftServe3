import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { User } from '../Models/User';

export class UserBox extends React.Component<{ users: User[] }, User[]> {

    protected URL_BASE: string = '/chat';
    constructor() {
        super();
    }

    render() {
        let content = this.props.users.map(u => <li style={{width: "135px", wordWrap: "break-word"}} key={u.userId}>{u.login}</li>)

        return <div className="chatUsersBlock">
            <ul id="usersDisplay" className="chatUsersList">
                {content}
            </ul>
        </div>
    }
}




