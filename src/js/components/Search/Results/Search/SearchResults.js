import './SearchResults.css';

import React from 'react';
import SearchResult from "./SearchResult";
import {log} from '../../../../utils/Logger';
import {LoggerEventTypes} from '../../../../utils/LoggerEventTypes';
import $ from 'jquery'




export default class SearchResults extends React.Component {


    constructor(props) {
        super(props);

    }


    componentDidMount() {


    }



    render() {

        let results = this.props.results.map((result, index) => {
            const props = {
                result: result,
                query: this.props.query,
                vertical: this.props.vertical,
                page: this.props.page,
                serp_id: this.props.serp_id,
                bookmark: 0
            };

            return(<SearchResult {...props} key={index} onClick={this.props.handleClickedDocument}/>);
        });




        return (
            <div className={"row SearchResults"} id="intro-search-results">
            
            

                {results}
            </div>
        )
    }
};