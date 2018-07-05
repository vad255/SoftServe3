import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Feature } from '../Models/Feature';
import { FeatureGrid } from '../Grids/FeatureGrid';
import { State } from '../Models/FeatureState';
import { Login } from '../Login';


export class FeatureEdit extends React.Component<RouteComponentProps<{}>> {
    
    constructor() {
        super();
        this.LoadData();
    }

    private feature: Feature;
    private isLoading: boolean = true;
    private link: string = (window.location.href);
    readonly id: string = this.link.substr(this.link.lastIndexOf('/') + 1);
    private URL: string = "odata/feature?$expand=stories($expand=team)&$filter=id eq " + this.id;

    public render() {
        let contents = this.isLoading
            ? <p><em>Loading...</em></p>
            : this.renderContent();

        return <div>
            <h1>Page for editing</h1>
            {contents}
        </div>
    }

    public renderContent() {
        return <div><h4>{this.EditName(this.feature)}</h4>
            <h4>{this.OnDataReceived.bind(this)}</h4>
            
        </div>
    }

    public LoadData() {
        fetch(this.URL)
            .then(response => response.json() as any)
            .then(data => {
                this.OnDataReceived(data);
            })
    }

    public OnDataReceived(data: any) {
        this.isLoading = false;
        console.log(data);
        let curentFeature = new Feature(data['value'][0]);
        this.feature = curentFeature;
        console.log(this.feature.state)
    }

    public EditName(feature: Feature) {
        return <form>
            <div className="col-md-6" >
                <h5>Name:</h5>
                <input type="text" value="g" />

            </div>
        </form>

    }


}