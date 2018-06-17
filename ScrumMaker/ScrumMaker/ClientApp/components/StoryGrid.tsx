import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface StoryDataExampleState {
    stories: Story[];
    loading: boolean;
}

export class StoryGrid extends React.Component<RouteComponentProps<{}>, StoryDataExampleState> {
    constructor() {
        super();
        this.state = { stories: [], loading: true };

        fetch('api/SampleData/GetStories')
            .then(response => response.json() as Promise<Story[]>)
            .then(data => {
                this.setState({ stories: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : StoryGrid.renderStoriesTable(this.state.stories);

        return <div>
            <h1>Stories</h1>
            <p>This component demonstrates Stories from the server.</p>
            {contents}
        </div>;
    }

    private static renderStoriesTable(stories: Story[]) {
        return <table className="table">
            <thead className="thead-dark">
                <tr className="d-table-row">
                    <th >Id</th>
                    <th >Name</th>
                    <th >Descrition</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {stories.map(story =>
                    <tr className="d-table-row">
                        <td className="d-table-cell">{story.id}</td>
                        <td className="d-table-cell">{story.name}</td>
                        <td className="d-table-cell">{story.description}</td>
                        <td className="d-table-cell">{story.status}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

interface Story {
    name: string;
    id: number;
    description: string;
    status: number;
}
