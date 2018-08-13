import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { User } from '../Models/User';

interface Photo {
    Login: string,
}

export class PokerTable extends React.Component<RouteComponentProps<any>, Photo> {

    constructor() {
        super();
        this.state = {
            Login: '',
        };

        fetch('/getUser', {
            credentials: 'include',
            method: 'GET',
        }).then(response => response.json() as Promise<any>)
            .then(data => {
                this.setState({ Login: data.Login });
            });
    }

    public users: User[] = [];

    render() {
        if (this.users === null || this.users === undefined)
            return <ul id="list" className="text-center" />;
        return <ul id="list" className="text-center" width="100%;">
            {this.users.map(u => <li key={u.userId} className="list-item">
                <div>
                    <img src={"/api/userphoto/" + u.userId} className="PokerUserImage" />
                    <br/>
                    {u.login.split('@')[0]}
                </div>
            </li>)}
        </ul>;
    }

    updateLayout(listItems: HTMLCollection) {

        for (var i = 0; i < listItems.length; i++) {
            var offsetAngle = 360 / listItems.length;
            var rotateAngle = offsetAngle * i;
            let css = "transform: rotate(" + rotateAngle + "deg) translate(19em) rotate(-" + rotateAngle + "deg);";
            listItems[i].setAttribute("style", css);
        };
    }


    getListitems() {
        let list = document.getElementById("list") as any;
        var listItems = list.getElementsByTagName("li") as HTMLCollection;
        return listItems;
    }

    addUser(user: User) {
        this.users.push(user);
    }

    removeUser(user: User) {
        var listItems = this.users.filter(u => u.login !== user.login);
        this.users = listItems;
    }
}