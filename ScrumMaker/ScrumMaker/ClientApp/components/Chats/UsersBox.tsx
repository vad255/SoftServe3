import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { User } from '../Models/User';

export class UserBox {
    
    protected URL_BASE: string = '/chat';
    public users: User[] = [];

    render() {
        if (this.users === null || this.users == undefined)
            return <ul id="usersDisplay" className="chatUsersList" />
        return <ul id="usersDisplay" className="chatUsersList">
            {this.users.map(u => <li>{u.login}</li>)}
        </ul>
    }
}




