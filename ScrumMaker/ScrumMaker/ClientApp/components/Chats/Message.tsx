import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'

export class Message {

    public id: number = -1;
    public sent: Date;
    public text: string = "";
    public authorId: number = -1;
    public authorName: string = "";
    public chatId: number = -1;


    constructor(params: any) {
        this.id = params.Id;
        this.sent = new Date(params.Sent);
        this.text = params.Text;
        this.authorId = params.AuthorId;
        this.authorName = params.AuthorName;
        this.chatId = params.ChatId;
       

    }




    render() {
        return '(' + this.sent + ') ' + this.authorName + ': ' + this.text;
    }


}




