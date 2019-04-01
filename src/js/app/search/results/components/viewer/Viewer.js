import './Viewer.pcss';
import React from 'react';

import {log} from '../../../../../utils/Logger';
import {LoggerEventTypes} from '../../../../../utils/LoggerEventTypes';

import ViewerPage from "./ViewerPage";
import AnnotationContainer from "../../../features/annotation/AnnotationContainer";
import RatingContainer from "../../../features/rating/RatingContainer";
import Modal from "../../../../common/Modal";

import config from '../../../../../config';


export default class Viewer extends React.Component  {
    constructor(props) {
        super(props);
    }

    render() {
        
        if (this.props.url === "") {
            return <div/>
        }
    
        ////
    
        const metaInfo = {
            url: this.props.url,
            query: this.props.searchState.query,
            page: this.props.searchState.page,
            vertical: this.props.searchState.vertical
        };
    
        let hoverEnterDocument = () => {
            log(LoggerEventTypes.DOCUMENT_HOVERENTER, metaInfo)
        };
        let hoverLeaveDocument = () => {
            log(LoggerEventTypes.DOCUMENT_HOVERLEAVE, metaInfo)
        };
        let closeDocument = () => {
            this.props.documentCloseHandler();
            log(LoggerEventTypes.DOCUMENT_CLOSE, metaInfo);
        };
        let loadDocument = () => {
            log(LoggerEventTypes.DOCUMENT_LOAD, metaInfo);
            if (!this.props.doctext) {
                document.getElementById("viewer-content-loader").style.display = "none";
            }
        };
    
        let scrollDocument = () => {
            log(LoggerEventTypes.DOCUMENT_SCROLL, metaInfo);
        };

        return (
            
            <Modal width="75%" height="80%">
                <div className="viewer" onMouseEnter={hoverEnterDocument} onMouseLeave={hoverLeaveDocument}
                     onScroll={scrollDocument}>
                    <div className="header">
    
    
                        <div className="pull-right">
                            {!this.props.doctext && [
                                
                                <span className="divider"/>
                            ]}
                            {config.interface.ratings && [
                                <RatingContainer url={this.props.url}/>,
                                <span className="divider"/>
                            ]}
                            <span className="close" onClick={closeDocument}><i className="fa fa-times"/></span>
                        </div>
                    </div>
    
                    <div className="body">
                        {config.interface.annotations && (
                            <div className="sidebar">
                                <AnnotationContainer url={this.props.url}/>
                            </div>
                        )}
    
                        <ViewerPage url={this.props.url} loadHandler={loadDocument} doctext={this.props.doctext}/>
                    </div>
                </div>
            </Modal>
        );


    }

}
