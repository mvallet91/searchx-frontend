import './ResultsPage.css';
import React from 'react';

import SearchResults from './Search/SearchResults';
import BookmarkResults from './Sidebar/BookmarkResults';

import SearchResultsPagination from './SearchResultsPagination';
import SearchResultsNotFound from './SearchResultsNotFound';

import SearchStore from '../../../stores/SearchStore'
import AccountStore from '../../../stores/AccountStore';
import SearchActions from '../../../actions/SearchActions';

import {log} from '../../../utils/Logger';
import {LoggerEventTypes} from '../../../utils/LoggerEventTypes';
import PreviousQueries from "./Sidebar/PreviousQueries";

const env = require('env');
const config = require('../../../config');
const Loader = require('react-loader');

////

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let getSearchState = () => {
    return {
        query: SearchStore.getQuery(),
        vertical: SearchStore.getVertical(),
        results: SearchStore.getResults(),
        serp_id : SearchStore.getSerpId(),
        matches: SearchStore.getMatches(),
        userId: AccountStore.getSessionId(),
        activePage: SearchStore.getPageNumber(),
        elapsedTime : ((SearchStore.getElapsedTime())/1000).toFixed(2).toString(),
        resultsNotFound : SearchStore.isResultsNotFound(),
        showPopup: false,
        clickedUrl: ""
    }
};

////

export default class ResultsPage extends React.Component {
    constructor() {
        super();
        this.state = getSearchState();
        this._onChange = this._onChange.bind(this);


        this.handleClickedDocument = this.handleClickedDocument.bind(this);
        this.handleCloseDocument = this.handleCloseDocument.bind(this);

    }

    componentWillMount() {
        SearchStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        SearchStore.removeChangeListener(this._onChange);
    }

    componentDidMount(){
        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = this.handleCloseDocument;
    }

    ////

    _onChange() {
        this.setState(getSearchState);
    }

    handlePageChange(pageNumber) {
        log(LoggerEventTypes.SEARCH_CHANGE_PAGE, {
            query: this.state.query,
            page: pageNumber,
            previous_page: this.state.activePage,
            vertical: this.state.vertical,
            serp_id: this.state.serp_id
        });

        SearchActions.changePage(this.state.query, this.state.vertical, pageNumber);

        this.setState({
            activePage: pageNumber,
            results: SearchStore.getResults()
        });
    }


    handleClickedDocument(url){
        const modal = document.getElementById('modal-container');
        modal.style.display = "block";

        this.setState({ clickedUrl: url});
    }


    handleCloseDocument(){
        const modal = document.getElementById('modal-container');
        modal.style.display = "none";

        let metaInfo = {
            url: this.state.clickedUrl,
            query: this.props.query,
            page: this.props.page,
            vertical: this.props.vertical,
            serp_id: this.props.serp_id,
        };

        log(LoggerEventTypes.DOCUMENT_CLOSE, metaInfo);
        this.setState({ clickedUrl: ""});
    }

    ////

    render() {
        let prefix = "About ";
        if (this.state.matches < config.aboutPrefixAt) {
            prefix = "";
        }

        const timeIndicator = prefix + numberWithCommas(this.state.matches) + " results (" + this.state.elapsedTime + " seconds)";

        ////

        let hoverEnterDocument = (e) => {

            let metaInfo = {
                url: this.state.clickedUrl,
                query: this.props.query,
                page: this.props.page,
                vertical: this.props.vertical,
                serp_id: this.props.serp_id,
            };

            log(LoggerEventTypes.DOCUMENT_HOVERENTER, metaInfo)
        };

        let hoverLeaveDocument = (e) => {
            let metaInfo = {
                url: this.state.clickedUrl,
                query: this.props.query,
                page: this.props.page,
                vertical: this.props.vertical,
                serp_id: this.props.serp_id,
            };
            log(LoggerEventTypes.DOCUMENT_HOVERLEAVE,metaInfo)
        };



        let mainPage = <SearchResultsNotFound/>;
        if (!SearchStore.isResultsNotFound()) {
            mainPage = (
                <div>
                    <div className="SearchResults">
                       

                        <SearchResults
                            results={this.state.results}
                            query={this.state.query}
                            vertical={this.state.vertical}
                            page={this.state.activePage}
                            serp_id={this.state.serp_id}
                            handleClickedDocument={this.handleClickedDocument}
                        />

                        {SearchStore.isQuerySubmitted() &&
                            <Loader loaded={SearchStore.isRefreshing() || this.state.results.length > 0 || SearchStore.isFinished()}/>
                        }
                    </div>

                </div>
            );
        }

        ////
        return (
            <div className="row ResultsPage" id="intro-collab-color">
                <div className="MainPage col-md-8 col-sm-12 col-xs-12">
                    {mainPage}
                </div>

                <div className="Sidebar col-md-4 col-sm-12 col-xs-12">
                    <PreviousQueries/>
                    <BookmarkResults handleClickedDocument={this.handleClickedDocument}/>
                </div>

                <div id="modal-container" className="modal">
                    <div className="modal-content" onMouseEnter={hoverEnterDocument} onMouseLeave={hoverLeaveDocument} >
                        <span className="title">{this.state.clickedUrl}</span>
                        <span className="close">&times;</span>
                        {this.state.clickedUrl !== "" &&
                            <iframe id="render-page"
                                    height="96%"
                                    width="100%"
                                    scrolling="yes"
                                    frameBorder="0"
                                    src={env.renderUrl + '/' + this.state.clickedUrl}>
                            </iframe>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
