import React from 'react';
import SearchHeader from './Header/SearchHeader';
import ResultsPage from "./Results/ResultsPage";

import {log} from '../../utils/Logger';
import {LoggerEventTypes} from '../../utils/LoggerEventTypes';

export default class Template extends React.Component {

    componentDidMount(){
        document.addEventListener('visibilitychange', function() {
            log(LoggerEventTypes.WINDOW_CHANGE_VISIBILITY, {
                step : "search",
                hidden: document.hidden
            });

            if (document.hidden) {

                let switchTabs = 0;

            

                if (localStorage.getItem("switch-tabs-search") !== null) {
                    switchTabs = localStorage.getItem("switch-tabs-search");
                }

                switchTabs++;
                localStorage.setItem("switch-tabs-search", switchTabs);
                if (switchTabs >= 2) {
                    window.location.href = "posttest";
                }
                
                

            }
        })
    }

    render() {

        return (
            <div >
                <SearchHeader/>
                <ResultsPage/>
            </div>
        )
    }
};