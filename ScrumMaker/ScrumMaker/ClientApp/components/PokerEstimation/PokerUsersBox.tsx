import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { PokerUser } from '../Models/PokerUser';

export class PokerUsersBox extends React.Component<{ users: PokerUser[], currentUserId: PokerUser, startOrFinish: boolean, confirmMadal: boolean }, PokerUser[]> {

    protected URL_BASE: string = '/chat';
    constructor() {
        super();
    }

    render() {
        let content;
        if (this.props.startOrFinish) {
            content = this.props.users.map(u => <li key={u.userId}>Name: {u.login} Mark: {u.userMark != null ? u.userMark != -1 ? (u.userId == this.props.currentUserId.userId ? u.userMark : "✓") : "?" : "?"}</li>)
        }
        if (!this.props.startOrFinish) {
            content = this.props.users.map(u => <li key={u.userId}>Name: {u.login}</li>)
        }
        if (this.props.confirmMadal) {
            content = this.props.users.map(u => <li key={u.userId}>Name: {u.login} Mark: {u.userMark != null ? u.userMark != -1 ? (u.userId == this.props.currentUserId.userId ? u.userMark : u.userMark) : "×" : "×"}</li>)
        }

        return <div>
            <ul id="usersDisplay" className="pokerChatUsersList">
                {content}
            </ul>
        </div>
    }
}




