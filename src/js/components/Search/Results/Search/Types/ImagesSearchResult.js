import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import {log} from '../../../../../utils/Logger';
import {LoggerEventTypes} from '../../../../../utils/LoggerEventTypes';

////

export default class ImagesSearchResult extends React.Component {
    render(){
        let metaInfo = {
            url: this.props.result.url,
            query: this.props.query,
            page: this.props.page,
            vertical: 'images',
            serp_id: this.props.serp_id,
        };

        let clickUrlLog = (e) => {
            this.props.onClick(this.props.result.url);
            log(LoggerEventTypes.SEARCHRESULT_CLICK_URL, metaInfo);
        };

        let viewUrlLog = (isVisible) => {
            const metaInfoView = {metaInfo, isVisible: isVisible};
            log(LoggerEventTypes.SEARCHRESULT_VIEW_URL, metaInfoView)
        };

        let contextUrlLog = (e) => {
            e.preventDefault();
        };

        let hoverEnter = (e) => {
            log(LoggerEventTypes.SEARCHRESULT_HOVERENTER, metaInfo);
        };

        let hoverLeave = (e) => {
            log(LoggerEventTypes.SEARCHRESULT_HOVERLEAVE, metaInfo);
        };

        ////
        
        return (
            <div className="SearchResults-image">
                <VisibilitySensor onChange={viewUrlLog}
                        scrollCheck
                        delayedCall={true}
                        scrollThrottle={50}
                        intervalDelay={2000}
                />

                <a  
                    title={this.props.result.name}
              
                    onClick={clickUrlLog}
                    onContextMenu={contextUrlLog}
                    onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
                    <div className="image" style={{backgroundImage: `url(${this.props.result.thumbnailUrl})`}}/>
                </a>

                {this.props.bookmarkButton}
                {this.props.bookmarkInfo}
            </div>
        )
    }
}