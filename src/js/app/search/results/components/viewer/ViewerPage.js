import React from 'react';
import Loader from 'react-loader';
import isImage from 'is-image';
const ReactMarkdown = require('react-markdown')

export default class ViewerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            html: "",
        };
    }

    componentDidMount() {
        if (this.props.doctext) {
            this.props.loadHandler();
        }
        this.createHTML = this.createHTML.bind(this);
        this.cleanHTML = this.cleanHTML.bind(this);
        
        let text = this.props.doctext.split( "\r\n\r\n");
        if (text.length == 1) {
            text= text[0];
        }  else {
            text = text[1];
        }
        this.setState ({
            html: text,
        });



    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.doctext && nextProps.url !== this.props.url) {
            nextProps.loadHandler();
        }
    }

    cleanHTML() {

    }
    
    createHTML() {

        let text = this.props.doctext.split( "\r\n\r\n");
        if (text.length == 1) {
            text= text[0];
        }  else {
            text = text[1];
        }

        
        return {__html: text};
    }

    render() {
        return (
            <div className="page">
                {this.props.doctext ? (
                        <div className={"textBackground"}>
                            <ReactMarkdown source={this.props.doctext} />
                           
                            </div>
                        
                    ) :
                    [
                        <div id="viewer-content-loader">
                            <Loader/>
                        </div>,
                        isImage(this.props.url) ?
                            <img src={this.props.url} onLoad={this.props.loadHandler}/>
                            :
                            <iframe scrolling="yes"
                                    frameBorder="0"
                                    src={`${process.env.REACT_APP_RENDERER_URL}/${this.props.url}`}
                                    onLoad={this.props.loadHandler}>
                            </iframe>
                    ]
                }
            </div>
        )
    }
};