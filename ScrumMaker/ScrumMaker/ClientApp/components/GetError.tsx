import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

export class GetError extends React.Component<RouteComponentProps<any>, {}> {
    constructor(props: any) {
        super(props);
        fetch('/getErrorPage').then(response => response.json() as Promise<any>).catch(e => this.props.history.push("/Error"));
    }
}