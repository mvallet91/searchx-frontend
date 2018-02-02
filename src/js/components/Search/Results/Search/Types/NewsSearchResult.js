import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import {log} from '../../../../../utils/Logger';
import {LoggerEventTypes} from '../../../../../utils/LoggerEventTypes';

////

export default class NewsSearchResult extends React.Component {
    render(){
        let metaInfo = {
            url: this.props.result.url,
            query: this.props.query,
            page: this.props.page,
            vertical: 'news',
            serp_id: this.props.serp_id,
        };

        let clickUrlLog = (e) => {
            this.props.onClick(this.props.result.url);
            log(LoggerEventTypes.SEARCHRESULT_CLICK_URL,metaInfo);
        };

        let viewUrlLog = (isVisible) => {
            const metaInfoView = {metaInfo, isVisible: isVisible};
            log(LoggerEventTypes.SEARCHRESULT_VIEW_URL, metaInfoView);
        };

        let contextUrlLog = (e) => {
            e.preventDefault();
            //log(LoggerEventTypes.SEARCHRESULT_CONTEXT_URL, metaInfo);
        };

        let hoverEnterSummary = (e) => {
            log(LoggerEventTypes.SEARCHRESULT_HOVERENTER, metaInfo);
        };

        let hoverLeaveSummary = (e) => {
            log(LoggerEventTypes.SEARCHRESULT_HOVERLEAVE, metaInfo);
        };

        ////

        const cts = this.props.result.datePublished;
        const cdate = (new Date(cts));
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        ////

        return (
            <div className="row SearchResults-news">
                <VisibilitySensor onChange={viewUrlLog} 
                    scrollCheck
                    delayedCall={true}
                    scrollThrottle={50}
                    intervalDelay={2000}
                />
                
                <div className="newsContainer" onMouseEnter={hoverEnterSummary} onMouseLeave={hoverLeaveSummary}>
                    <div className="newsImage">
                        {this.props.result.image ?
                            <div> <img src={this.props.result.image.thumbnail.contentUrl} /></div> :
                            <div> <img src='/img/image_placeholder.png'/> </div>
                        }
                    </div>

                    <div className="newsInfo">
                        {this.props.bookmarkButton}

                        <h2>
                            <a  title={this.props.result.name}  onClick={clickUrlLog} onContextMenu={contextUrlLog}>
                                {this.props.result.name}
                            </a>
                        </h2>

                        <span className="source">
                            { this.props.result.provider[0].name + " - " + cdate.getDate().toString() + " "  + monthNames[cdate.getMonth()] + " " + cdate.getFullYear().toString() }
                        </span>

                        <p>
                            {this.props.result.description}
                        </p>

                        {this.props.bookmarkInfo}
                    </div>
                </div>
            </div>
        )
    }
}
