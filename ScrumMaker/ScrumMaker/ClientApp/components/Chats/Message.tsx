import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'

export class Message{

    public author: string;
    public post: Date;
    public text: string;

    constructor(params: any) {
        this.author = params.sender;
        this.post = new Date(params.post);
        this.text = params.text;
    }




    render() {
        return '(' + this.post + ') ' + this.author + ': ' + this.text;
    }


}




