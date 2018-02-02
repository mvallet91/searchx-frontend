import './App.css'

import React from 'react'
import {Route, Router} from 'react-router-dom'
import {flush} from '../utils/Logger';
import history from '../components/History';

import About from './Pages/About';
import Search from './Search/Search';
import Learning from './Survey/Learning';
import PreTest from './Survey/Form/PreTest';
import PostTest from './Survey/Form/PostTest';
import Register from './Survey/Form/Register';
import Welcome from './Survey/Welcome';
import MobileDetect from 'mobile-detect';

const config = require('../config');

////

export class App extends React.Component {
    componentWillMount(){
        setInterval(flush, config.logTimeInterval);
    };



    render() {
        var md = new MobileDetect(window.navigator.userAgent);

        if (md.mobile() !== null) {
            return (<div/>)
        }

        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={About}/>
                    <Route exact path="/about" component={About}/>
                    <Route path="/search" component={Search}/>

                    <Route exact path="/start" component={Welcome}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/pretest" component={PreTest}/>
                    <Route exact path="/posttest" component={PostTest}/>

                    <Route path="/learning" component={Learning}/>
                </div>
            </Router>
        );
    }
}

export default App