import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="div-style">
            <img src="./img/4img.jpg" className="img-style next im-1" />
            <img src="./img/2img.jpg" className="img-style next im-2" />
            <img src="./img/3img.jpg" className="img-style next im-3" />
            <img src="./img/4img.jpg" className="img-style next im-4" />
        </div>;
    }
}
