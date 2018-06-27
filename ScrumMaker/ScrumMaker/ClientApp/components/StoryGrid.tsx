import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface StoryDataExampleState {
    stories: Story[];
    loading: boolean;
    storiesMap: Story[];
    searchBy: string;
}

export class StoryGrid extends React.Component<RouteComponentProps<{}>, StoryDataExampleState> {
    constructor() {
        super();
        this.state = { stories: [], loading: true, storiesMap: [], searchBy: "Name" };
        this.handleSesarch = this.handleSesarch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        fetch('odata/Stories')
            .then(response => response.json() as Promise<Story[]>)
            .then(data => {
                this.setState({ stories: data, loading: false, storiesMap: data });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : StoryGrid.renderStoriesTable(this.state.stories);

        return <div>
            <h1>Stories</h1>
            <p>This component demonstrates Stories from the server.</p>
            <div>
                <p>Find by</p>
                <input type="text" placeholder={this.state.searchBy} className="input-sm" onChange={this.handleSesarch}></input>
                <select className="selectScrum" onChange={this.handleSelect}> 
                    <option value="Name">Name</option>
                    <option value="Description">Descriptopn</option>
                 </select>
            </div>
            {contents}
        </div>;
    }

    handleSelect(event: any) {
        this.setState({ searchBy: event.target.value });
    }


    handleSesarch(event: any) {
        var searchQuery = event.target.value;
        var searchBy = this.state.searchBy;
        fetch("odata/stories()?$filter=contains(" + searchBy + ", '" + searchQuery + "')")
            .then(response => response.json() as Promise<Story[]>)
            .then(data => {
                if (searchQuery === "" || searchQuery === null || searchQuery === " ") {
                    this.setState({ stories: this.state.storiesMap });
                } else {
                    this.setState({ stories: data });
                }

            });


    }


    private static renderStoriesTable(stories: Story[]) {
        return <table className="table table-scrum table-hover td-scrum">
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
