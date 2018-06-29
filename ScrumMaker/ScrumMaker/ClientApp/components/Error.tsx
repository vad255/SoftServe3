import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

export class Error extends React.Component<RouteComponentProps<any>, {}> {

    public render() {
        return <div className="text-center">
                   <img src="img/something-went-wrong.gif" />
                   <h1>Go to <Link to="/">Home page</Link></h1>
               </div>;
    }
}