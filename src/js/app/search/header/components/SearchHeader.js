import './SearchHeader.pcss';
import React from 'react';

import Logo from './Logo';
import SearchBox from './SearchBox';
import SearchVerticals from './SearchVerticals';
import AccountInfo from "./AccountInfo";



const Header = function ({query, vertical, provider, searchHandler, queryChangeHandler, verticalChangeHandler, timer, taskDescription, userId, groupId, showAccountInfo, hideSuggestionsHandler, showSuggestionsHandler, clickSuggestionHandler, showSuggestions}) {
    
    return (
        <div className="SearchHeader">
            <Logo/>
            <form action="/" method="GET" className="form" onSubmit={e => {
                e.preventDefault();
                searchHandler();
            }}>
                <SearchBox query={query} changeHandler={queryChangeHandler} showSuggestionsHandler={showSuggestionsHandler}/>

                <SearchVerticals query={query} activeVertical={vertical} changeHandler={verticalChangeHandler}
                                 provider={provider}/>
            </form>
            {showAccountInfo && <AccountInfo userId={userId} groupId={groupId}/>}
            {taskDescription} 
            <div className="TimerDiv">
                {timer}
            </div>
           
        </div>
    )
};

export default Header;