import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'
import { User } from "../Models/User";

export class RetrospectiveMessage {

    public id: number = -1;
    public sendingDate: Date = new Date();
    public wentWell: string = "";
    public couldBeImproved: string = "";
    public commitToDoing: string = "";
    public userId: number = -1;
    public userName: string = "";
    public chatId: number = -1;
    public meetingId: number = -1;

    constructor(params: any) {
        this.id = params.Id;
        this.wentWell = params.WentWell;
        this.couldBeImproved = params.CouldBeImproved;
        this.commitToDoing = params.CommitToDoing;
        this.userId = params.UserId;
        this.userName = params.UserName;
        this.chatId = params.ChatId;
        this.meetingId = params.MeetingId;
    }
}




