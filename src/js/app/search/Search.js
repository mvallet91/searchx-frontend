import './Search.pcss';
import React from 'react';

import {log} from '../../utils/Logger';
import {LoggerEventTypes} from '../../utils/LoggerEventTypes';

import SearchHeaderContainer from './header/SearchHeaderContainer';
import SearchResultsContainer from "./results/SearchResultsContainer";
import QueryHistoryContainer from "./features/queryhistory/QueryHistoryContainer";
import BookmarkContainer from "./features/bookmark/BookmarkContainer";
import AccountStore from "./../../stores/AccountStore"
import SessionStore from "./../../stores/SessionStore";
import Chat from "./features/chat/Chat";
import config from "../../config";



class Search extends React.Component {
    
   

    componentDidMount() {
        if (this.props.firstSession && config.interface.chat && this.props.collaborative) {
            sessionStorage.clear();
            Chat();
        }
    }

    componentWillUnmount() {
        if (this.props.lastSession && config.interface.chat && this.props.collaborative) {
            const messages = document.querySelector(".chat-content").innerHTML;
            log(LoggerEventTypes.CHAT_ARCHIVE, {
                messages: messages
            });

            const element = document.querySelector("#conversejs");
            element.parentElement.removeChild(element);
        }
    }
    

    render() {
        const etherpad_url = 'http://csal.ewi.tudelft.nl/p/' + AccountStore.getGroupId() + "?userColor=" + SessionStore.getMemberColor(AccountStore.getUserId() )
            + '&userName=' + SessionStore.getUserName(AccountStore.getUserId()) +  '&showLineNumbers=false&showControls=false';
        return (
            <div className="Search">
                <SearchHeaderContainer timer={this.props.timer} showAccountInfo={this.props.showAccountInfo}/>

                <div className="Content">
                    <div className="Main">
                        <div className="SearchResultsContainer">
                            <SearchResultsContainer/>
                        </div>
                    </div>

                    <div className="Side">
                    <QueryHistoryContainer></QueryHistoryContainer>
                    <BookmarkContainer></BookmarkContainer>
                   
                    </div>

                    
                    <div className="Workspace"><iframe src={etherpad_url} width="100%" height="600px" frameBorder="1" ></iframe></div>
                    
                    

                    {this.props.taskDescription && (
                        <div className="Side">
                            {this.props.taskDescription}
                        </div>
                    )}
                </div>

                <div className="text-center">
                    <p className="Footer">
                        About <a href="/about" target="_blank">SearchX</a>.
                    </p>
                </div>
            </div>
        )
    }
}

Search.defaultProps = {
    collaborative: true,
    showAccountInfo: true,
    firstSession: true,
    lastSession: true
};

export default Search;