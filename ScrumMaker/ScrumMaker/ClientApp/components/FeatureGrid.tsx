import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface FetchFeatures {
    feat: Feature[];
    loading: boolean;
}

export class FeatureGrid extends React.Component<RouteComponentProps<{}>, FetchFeatures> {
    constructor() {
        super();
        this.state = { feat: [], loading: true };

        fetch('api/Feature/FeatureGet')
            .then(response => response.json() as Promise<Feature[]>)
            .then(data => {
                this.setState({ feat: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FeatureGrid.featuresTable(this.state.feat);

        return <div>
            <h1>Feature screen</h1>
            <p>This component demonstrates Feature from the database.</p>
            { contents }
        </div>;
    }

    private static featuresTable(features: Feature[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>State</th>
                    <th>Blocked</th>
                    <th>Stories</th>

                </tr>
            </thead>
            <tbody>
                {features.map(feature =>
                    <tr key={feature.featureId}>
                        <td>{feature.featureId}</td>
                        <td>{feature.featureName}</td>
                        <td>{feature.description}</td>
                        <td>{feature.state}</td>
                        <td>{feature.blocked === true ? "true" : "false" }</td>
                        <td>{feature.stories}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

    interface Feature {
        featureId: number;
        featureName: string;
        state: string;
        description: string;
        blocked: boolean;
        stories: string;
}
