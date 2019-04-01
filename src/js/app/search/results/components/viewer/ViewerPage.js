import React from 'react';
import Loader from 'react-loader';
import isImage from 'is-image';
const ReactMarkdown = require('react-markdown')

export default class ViewerPage extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div className="page">
             
                        <div className={"textBackground"}>
                            <ReactMarkdown source={this.props.doctext} />
                           
                            </div> 
                
            </div>
        )
    }
};