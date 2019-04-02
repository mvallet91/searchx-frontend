import React from 'react'
import {Route, Router} from 'react-router-dom'
import MobileDetect from 'mobile-detect';

import history from './History';
import {flush} from '../utils/Logger';
import config from '../config';

import About from './pages/About';
import Search from './search/Search';

import SimpleRegister from './tasks/example-simple/Register';
import SimpleSubmit from './tasks/example-simple/Submit';
import SimpleSession from './tasks/example-simple/Session';
import SyncRegister from './tasks/example-group-sync/Register';
import SyncPreTest from './tasks/example-group-sync/PreTest';
import SyncPostTest from './tasks/example-group-sync/PostTest';
import SyncSession from './tasks/example-group-sync/Session';
import AsyncRegister from './tasks/example-group-async/Register';
import AsyncFeedback from './tasks/example-group-async/Feedback';
import AsyncSession from './tasks/example-group-async/Session';

import CollabWorkspaceRegister from './tasks/collab-workspace/Register';
import CollabWorkspaceWait from './tasks/collab-workspace/Wait';
import CollabWorkspaceSession from './tasks/collab-workspace/Session';
import CollabWorkspaceDescription from './tasks/collab-workspace/TaskDescription';
import CollabWorkspacePostTest from './tasks/collab-workspace/PostTest';

export class App extends React.Component {
    componentWillMount(){
        setInterval(flush, config.logTimeInterval);
    };

    render() {
        const md = new MobileDetect(window.navigator.userAgent);
        if (md.mobile() !== null) {
            return (<div/>)
        }

        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={About}/>
                    <Route exact path="/about" component={About}/>
                    <Route path="/search" component={Search}/>

                    <Route exact path="/simple" component={SimpleRegister}/>
                    <Route exact path="/simple/submit" component={SimpleSubmit}/>
                    <Route path="/simple/session" component={SimpleSession}/>

                    <Route exact path="/sync" component={SyncRegister}/>
                    <Route exact path="/sync/pretest" component={SyncPreTest}/>
                    <Route exact path="/sync/posttest" component={SyncPostTest}/>
                    <Route path="/sync/session" component={SyncSession}/>

                    <Route exact path="/async" component={AsyncRegister}/>
                    <Route exact path="/async/feedback" component={AsyncFeedback}/>
                    <Route path="/async/session" component={AsyncSession}/>

                    <Route exact path="/collab-workspace" component={CollabWorkspaceRegister}/>
                    <Route exact path="/collab-workspace/wait" component={CollabWorkspaceWait}/>
                    <Route path="/collab-workspace/session" component={CollabWorkspaceSession}/>
                    <Route path="/collab-workspace/description" component={CollabWorkspaceDescription}/>
                    <Route exact path="/collab-workspace/posttest" component={CollabWorkspacePostTest}/>
                </div>
            </Router>
        );
    }
}

export default App