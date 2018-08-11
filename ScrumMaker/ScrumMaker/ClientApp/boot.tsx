import '../wwwroot/assets/css/Buttons.css'
import '../wwwroot/assets/css/Calendar.css'
import '../wwwroot/assets/css/Chat.css';
import '../wwwroot/assets/css/EditPage.css'
import '../wwwroot/assets/css/EditUser.css';
import '../wwwroot/assets/css/GridTable.css';
import '../wwwroot/assets/css/Site.css';
import '../wwwroot/assets/css/NavMenu.css';
import '../wwwroot/assets/css/TreeSubMenu.css';
import '../wwwroot/assets/css/SiteStyle.css';
import '../wwwroot/assets/css/SwitchImg.css';
import '../wwwroot/assets/css/SelectStyle.css';
import '../wwwroot/assets/css/Login.css';
import '../wwwroot/assets/css/Tooltips.css';
import '../wwwroot/assets/css/modalWindow.css';
import '../wwwroot/assets/css/multiselect.css';
import '../wwwroot/assets/css/backlog.css';
import '../wwwroot/assets/css/poker.css';

import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './routes';
let routes = RoutesModule.routes;

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter children={ routes } basename={ baseUrl } />
        </AppContainer>,
        document.getElementById('react-app')
    );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}
