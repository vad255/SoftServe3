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

        fetch('api/StoryGrid/GetStories')
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
            {contents}
        </div>;
    }

    private static renderStoriesTable(stories: Story[]) {
        return <table className="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Descrition</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {stories.map(story =>
                    <tr>
                        <td>{story.id}</td>
                        <td>{story.name}</td>
                        <td>{story.description}</td>
                        <td>{story.status}</td>
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
